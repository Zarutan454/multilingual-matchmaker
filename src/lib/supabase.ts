import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase Konfigurationsfehler: URL oder Key fehlt');
  toast.error('Datenbankverbindung konnte nicht hergestellt werden');
  throw new Error('Supabase URL und API Key müssen konfiguriert sein');
}

// Singleton-Pattern für den Supabase-Client
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
        'X-Client-Info': 'supabase-js-web'
      },
      fetch: (url, options = {}) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 Sekunden Timeout
        
        return fetch(url, {
          ...options,
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));
      }
    },
    db: {
      schema: 'public'
    },
    realtime: {
      params: {
        eventsPerSecond: 2
      }
    }
  });

  return supabaseInstance;
};

export const supabase = getSupabaseClient();

// Verbesserte Verbindungsprüfung mit Retry-Mechanismus und exponentieller Verzögerung
export const checkConnection = async (retries = 3, baseDelay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const client = getSupabaseClient();
      const { data, error } = await client.from('profiles')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      if (!error) {
        console.log('Supabase Verbindung erfolgreich (Versuch ' + (i + 1) + ')');
        return true;
      }

      console.warn(`Verbindungsversuch ${i + 1} fehlgeschlagen:`, error);
      
      // Exponentieller Backoff
      if (i < retries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error('Schwerwiegender Verbindungsfehler:', error);
      if (i === retries - 1) {
        toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden');
        return false;
      }
    }
  }
  return false;
};

// Verbindungsüberwachung initialisieren
let connectionInitialized = false;

if (typeof window !== 'undefined' && !connectionInitialized) {
  connectionInitialized = true;
  
  window.addEventListener('online', () => {
    checkConnection().then(isConnected => {
      if (isConnected) {
        toast.success('Verbindung wiederhergestellt');
      }
    });
  });

  window.addEventListener('offline', () => {
    toast.error('Keine Internetverbindung');
  });

  // Initiale Verbindungsprüfung
  checkConnection().then(isConnected => {
    if (isConnected) {
      console.log('Supabase Verbindung hergestellt');
    } else {
      console.error('Supabase Verbindung fehlgeschlagen');
      toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden');
    }
  });
}