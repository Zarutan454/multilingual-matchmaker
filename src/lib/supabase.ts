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
    flowType: 'pkce',
    debug: false,
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
      eventsPerSecond: 1,
      heartbeat: 60
    }
  }
});

// Verbesserte Fehlerbehandlung
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error.message === 'Failed to fetch') {
    console.error('Netzwerkfehler - bitte überprüfen Sie Ihre Verbindung');
    toast.error('Netzwerkfehler - bitte überprüfen Sie Ihre Internetverbindung');
    return error;
  }

  if (error.status === 401) {
    console.error('Authentifizierungsfehler - bitte neu anmelden');
    toast.error('Authentifizierungsfehler - bitte melden Sie sich erneut an');
    supabase.auth.signOut();
    return error;
  }

  if (error.code === '23505') {
    console.error('Datenbank-Konflikt - Eintrag existiert bereits');
    toast.error('Dieser Eintrag existiert bereits');
    return error;
  }

  if (error.code === '23503') {
    console.error('Datenbank-Beziehungsfehler');
    toast.error('Beziehungsfehler in der Datenbank');
    return error;
  }

  toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
  return error;
};

// Verbesserte Verbindungsprüfung
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) throw error;
    console.log('Datenbankverbindung erfolgreich getestet');
    return true;
  } catch (error) {
    console.error('Verbindungstest fehlgeschlagen:', error);
    return false;
  }
};

// Verbindungsprüfung mit Retry-Logik
const initializeConnection = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    const isHealthy = await checkConnection();
    if (isHealthy) {
      console.log('Datenbankverbindung hergestellt');
      return true;
    }
    
    console.log(`Verbindungsversuch ${i + 1} fehlgeschlagen, erneuter Versuch in ${delay}ms...`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  return false;
};

// Initialisierung mit verbesserter Fehlerbehandlung
if (typeof window !== 'undefined') {
  initializeConnection().then(isHealthy => {
    if (!isHealthy) {
      console.error('Persistente Verbindungsprobleme mit der Datenbank');
      toast.error('Verbindungsprobleme mit der Datenbank. Bitte laden Sie die Seite neu.');
    }
  });
}