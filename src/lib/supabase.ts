import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL und API Key müssen in den Umgebungsvariablen definiert sein.');
}

// Verbesserte Client-Konfiguration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    flowType: 'pkce',
    debug: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'x-client-info': 'lovable'
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
  
  if (error.message?.includes('Failed to fetch') || error.code === 'NETWORK_ERROR') {
    toast.error('Verbindungsfehler - bitte überprüfen Sie Ihre Internetverbindung');
    return error;
  }

  if (error.status === 401 || error.code === 'PGRST301') {
    toast.error('Authentifizierungsfehler - bitte melden Sie sich erneut an');
    supabase.auth.signOut();
    return error;
  }

  if (error.code === '23505') {
    toast.error('Dieser Eintrag existiert bereits');
    return error;
  }

  if (error.code === '23503') {
    toast.error('Beziehungsfehler in der Datenbank');
    return error;
  }

  if (error.code === '42P01') {
    toast.error('Tabelle nicht gefunden');
    return error;
  }

  toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
  return error;
};

// Verbesserte Verbindungsprüfung mit Timeout und Retry
export const checkConnection = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (error) throw error;
      
      console.log('Datenbankverbindung erfolgreich getestet');
      return true;
    } catch (error) {
      console.error(`Verbindungsversuch ${i + 1} fehlgeschlagen:`, error);
      if (i === retries - 1) {
        toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden');
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return false;
};

// Initialisierung mit verbesserter Fehlerbehandlung
if (typeof window !== 'undefined') {
  checkConnection().then(isHealthy => {
    if (!isHealthy) {
      console.error('Persistente Verbindungsprobleme mit der Datenbank');
    }
  });
}