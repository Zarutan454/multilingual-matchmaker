import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase Konfigurationsfehler: URL oder Key fehlt');
  toast.error('Datenbankverbindung konnte nicht hergestellt werden');
  throw new Error('Supabase URL und API Key müssen konfiguriert sein');
}

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
      // Erhöhen des Timeouts auf 30 Sekunden
      fetch: (url, options = {}) => {
        return fetch(url, {
          ...options,
          // Kein AbortController mehr, stattdessen längerer Timeout
          signal: AbortSignal.timeout(30000) // 30 Sekunden Timeout
        });
      }
    }
  });

  return supabaseInstance;
};

export const supabase = getSupabaseClient();

// Verbesserte Verbindungsprüfung mit Wiederholungsversuch
export const checkConnection = async (retries = 3, baseDelay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Verbindungsversuch ${i + 1} von ${retries}...`);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
        .single();
      
      if (!error) {
        console.log('Supabase Verbindung erfolgreich');
        return true;
      }

      console.warn(`Verbindungsversuch ${i + 1} fehlgeschlagen:`, error);
      
      if (i < retries - 1) {
        const delay = baseDelay * Math.pow(2, i); // Exponentielles Backoff
        console.log(`Warte ${delay}ms vor dem nächsten Versuch...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error('Verbindungsfehler:', error);
      if (i === retries - 1) {
        toast.error('Datenbankverbindung konnte nicht hergestellt werden');
        return false;
      }
    }
  }
  return false;
};

// Verbindungsüberwachung initialisieren
if (typeof window !== 'undefined') {
  let reconnectTimeout: NodeJS.Timeout;

  window.addEventListener('online', () => {
    // Verzögerung vor dem Wiederverbindungsversuch
    clearTimeout(reconnectTimeout);
    reconnectTimeout = setTimeout(() => {
      checkConnection().then(isConnected => {
        if (isConnected) {
          toast.success('Verbindung wiederhergestellt');
        }
      });
    }, 1000); // 1 Sekunde Verzögerung
  });

  window.addEventListener('offline', () => {
    clearTimeout(reconnectTimeout);
    toast.error('Keine Internetverbindung');
  });

  // Initiale Verbindungsprüfung mit Verzögerung
  setTimeout(() => {
    checkConnection().then(isConnected => {
      if (!isConnected) {
        console.error('Initiale Supabase Verbindung fehlgeschlagen');
      }
    });
  }, 1000);
}