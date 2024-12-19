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
    storage: window.localStorage,
    flowType: 'pkce',
    debug: import.meta.env.DEV
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Info': 'supabase-js-web'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Verbesserte Verbindungsprüfung mit Wiederholungslogik und Timeout
export const checkConnection = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
        .maybeSingle();

      clearTimeout(timeoutId);

      if (error) {
        console.error(`Verbindungsversuch ${i + 1} fehlgeschlagen:`, error);
        toast.error(`Verbindungsfehler: ${error.message}`);
        
        if (i === retries - 1) {
          toast.error('Verbindung zur Datenbank fehlgeschlagen');
          return false;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      console.log('Datenbankverbindung erfolgreich getestet');
      toast.success('Verbindung zur Datenbank hergestellt');
      return true;
    } catch (error) {
      console.error(`Verbindungstest ${i + 1} fehlgeschlagen:`, error);
      
      if (i === retries - 1) {
        toast.error('Keine Verbindung zur Datenbank möglich');
        return false;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return false;
};

// Initialisiere Verbindung mit Wiederholungslogik
let connectionInitialized = false;

if (typeof window !== 'undefined' && !connectionInitialized) {
  connectionInitialized = true;
  checkConnection().then(isConnected => {
    if (isConnected) {
      console.log('Supabase Verbindung hergestellt');
    } else {
      console.error('Supabase Verbindung fehlgeschlagen');
      toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden. Bitte laden Sie die Seite neu.');
    }
  });
}