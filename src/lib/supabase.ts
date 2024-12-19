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
    }
  },
  db: {
    schema: 'public'
  }
});

// Verbesserte Verbindungsprüfung
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Verbindungsfehler:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Verbindungsfehler:', error);
    return false;
  }
};

// Initialisiere Verbindung
let connectionInitialized = false;

if (typeof window !== 'undefined' && !connectionInitialized) {
  connectionInitialized = true;
  checkConnection().then(isConnected => {
    if (isConnected) {
      console.log('Supabase Verbindung hergestellt');
    } else {
      console.error('Supabase Verbindung fehlgeschlagen');
      toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden');
    }
  });
}