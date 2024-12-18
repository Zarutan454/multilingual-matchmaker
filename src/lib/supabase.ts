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
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 1
    }
  }
});

// Verbesserte Verbindungsprüfung mit Wiederholungslogik
export const checkConnection = async (retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Verbindungsversuch', i + 1, 'fehlgeschlagen:', error);
        if (i === retries - 1) {
          toast.error('Verbindung zur Datenbank fehlgeschlagen: ' + error.message);
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      console.log('Datenbankverbindung erfolgreich getestet');
      return true;
    } catch (error) {
      console.error('Verbindungstest fehlgeschlagen:', error);
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
if (typeof window !== 'undefined') {
  checkConnection().then(isConnected => {
    if (isConnected) {
      toast.success('Verbindung zur Datenbank hergestellt');
    }
  });
}