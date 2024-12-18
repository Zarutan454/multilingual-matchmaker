import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and API Key must be defined in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    flowType: 'pkce',
    debug: false, // Nur für Entwicklung aktivieren
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
      eventsPerSecond: 1, // Reduziert auf 1 pro Sekunde
      heartbeat: 60 // Erhöht das Heartbeat-Interval
    }
  }
});

// Verbesserte Fehlerbehandlung
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error.message === 'Failed to fetch') {
    console.error('Network error - please check your connection');
    toast.error('Netzwerkfehler - bitte überprüfen Sie Ihre Internetverbindung');
    return error;
  }

  if (error.status === 401) {
    console.error('Authentication error - please log in again');
    toast.error('Authentifizierungsfehler - bitte melden Sie sich erneut an');
    supabase.auth.signOut();
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
    return true;
  } catch (error) {
    console.error('Connection check failed:', error);
    return false;
  }
};

// Verbindungsprüfung mit Retry-Logik
const initializeConnection = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    const isHealthy = await checkConnection();
    if (isHealthy) return true;
    
    console.log(`Connection attempt ${i + 1} failed, retrying in ${delay}ms...`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  return false;
};

// Initialisierung mit verbesserter Fehlerbehandlung
if (typeof window !== 'undefined') {
  initializeConnection().then(isHealthy => {
    if (!isHealthy) {
      toast.error('Verbindungsprobleme mit der Datenbank. Bitte laden Sie die Seite neu.');
    }
  });
}