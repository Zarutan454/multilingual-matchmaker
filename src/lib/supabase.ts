import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase Konfigurationsfehler: URL oder Key fehlt');
  toast.error('Datenbankverbindung konnte nicht hergestellt werden');
  throw new Error('Supabase URL und API Key müssen konfiguriert sein');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Info': 'supabase-js-web'
    },
    // Add fetch options for better timeout handling
    fetch: (url, options) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
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

// Verbesserte Verbindungsprüfung mit Retry-Mechanismus
export const checkConnection = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const { data, error } = await supabase.from('profiles')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      if (!error) {
        console.log('Supabase Verbindung erfolgreich (Versuch ' + (i + 1) + ')');
        return true;
      }

      console.warn(`Verbindungsversuch ${i + 1} fehlgeschlagen:`, error);
      
      // Warte exponentiell länger zwischen den Versuchen
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    } catch (error) {
      console.error('Schwerwiegender Verbindungsfehler:', error);
      if (i === retries - 1) {
        toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden. Bitte überprüfen Sie Ihre Internetverbindung.');
        return false;
      }
    }
  }
  return false;
};

// Initialisiere Verbindung mit verbessertem Error Handling
let connectionInitialized = false;

if (typeof window !== 'undefined' && !connectionInitialized) {
  connectionInitialized = true;
  
  // Füge Event Listener für Online/Offline Status hinzu
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

  // Initial connection check
  checkConnection().then(isConnected => {
    if (isConnected) {
      console.log('Supabase Verbindung hergestellt');
    } else {
      console.error('Supabase Verbindung fehlgeschlagen');
      toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden. Bitte versuchen Sie es später erneut.');
    }
  });
}