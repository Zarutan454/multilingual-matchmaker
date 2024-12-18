import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL und API Key müssen in den Umgebungsvariablen definiert sein.');
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
      'Content-Type': 'application/json'
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

// Verbesserte Fehlerbehandlung für Supabase-Operationen
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error.message === 'Failed to fetch') {
    toast.error('Verbindungsfehler - bitte überprüfen Sie Ihre Internetverbindung');
    return error;
  }

  if (error.status === 401) {
    toast.error('Authentifizierungsfehler - bitte melden Sie sich erneut an');
    supabase.auth.signOut();
    return error;
  }

  if (error.code === '23505') {
    toast.error('Dieser Eintrag existiert bereits');
    return error;
  }

  toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
  return error;
};

// Verbesserte Verbindungsprüfung
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (error) throw error;
    
    console.log('Datenbankverbindung erfolgreich getestet');
    return true;
  } catch (error) {
    console.error('Verbindungstest fehlgeschlagen:', error);
    toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden');
    return false;
  }
};

// Initialisierung mit verbesserter Fehlerbehandlung
if (typeof window !== 'undefined') {
  checkConnection().then(isHealthy => {
    if (!isHealthy) {
      console.error('Persistente Verbindungsprobleme mit der Datenbank');
    }
  });
}