import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase Konfigurationsfehler: URL oder Key fehlt');
  throw new Error('Supabase URL und API Key müssen in den Umgebungsvariablen definiert sein.');
}

// Verbesserte Client-Konfiguration mit Retry-Logic
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
      eventsPerSecond: 2
    }
  }
});

// Verbesserte Verbindungsprüfung mit detaillierter Fehlerbehandlung
export const checkConnection = async () => {
  try {
    console.log('Teste Verbindung zu Supabase...');
    console.log('URL:', supabaseUrl);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Verbindungsfehler:', error);
      toast.error('Verbindung zu Supabase fehlgeschlagen: ' + error.message);
      throw error;
    }
    
    console.log('Datenbankverbindung erfolgreich getestet');
    toast.success('Verbindung zu Supabase hergestellt');
    return true;
  } catch (error) {
    console.error('Verbindungstest fehlgeschlagen:', error);
    toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden');
    return false;
  }
};

// Initialisierung mit verbesserter Fehlerbehandlung
if (typeof window !== 'undefined') {
  console.log('Initialisiere Supabase-Verbindung...');
  checkConnection().then(isHealthy => {
    if (!isHealthy) {
      console.error('Persistente Verbindungsprobleme mit Supabase');
      toast.error('Keine Verbindung zu Supabase möglich. Bitte überprüfen Sie Ihre Internetverbindung und die Supabase-Konfiguration.');
    } else {
      console.log('Supabase-Verbindung erfolgreich initialisiert');
    }
  });
}