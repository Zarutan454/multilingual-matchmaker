import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  const error = 'Supabase Anmeldedaten fehlen in der Umgebungskonfiguration';
  console.error(error);
  toast.error(error);
  throw new Error(error);
}

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;
let isInitializing = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const INITIAL_RETRY_DELAY = 1000; // 1 second

const createSupabaseClient = () => {
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    },
    realtime: {
      params: {
        eventsPerSecond: 1
      }
    }
  });
};

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;
  
  if (isInitializing) {
    console.warn('Supabase client wird bereits initialisiert');
    return null;
  }

  isInitializing = true;

  try {
    supabaseInstance = createSupabaseClient();
    isInitializing = false;
    reconnectAttempts = 0; // Reset reconnect attempts on successful connection
    return supabaseInstance;
  } catch (error) {
    console.error('Fehler bei der Supabase-Initialisierung:', error);
    isInitializing = false;
    handleConnectionError();
    return null;
  }
};

const handleConnectionError = async () => {
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error('Maximale Anzahl an Wiederverbindungsversuchen erreicht');
    toast.error('Verbindung konnte nicht hergestellt werden. Bitte laden Sie die Seite neu.');
    return;
  }

  const delay = INITIAL_RETRY_DELAY * Math.pow(2, reconnectAttempts);
  reconnectAttempts++;

  console.log(`Versuche Wiederverbindung in ${delay/1000} Sekunden... (Versuch ${reconnectAttempts})`);
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  try {
    supabaseInstance = createSupabaseClient();
    console.log('Wiederverbindung erfolgreich');
    toast.success('Verbindung wiederhergestellt');
  } catch (error) {
    console.error('Wiederverbindung fehlgeschlagen:', error);
    handleConnectionError(); // Retry with exponential backoff
  }
};

// Verbindungsüberwachung
let healthCheckInterval: NodeJS.Timeout | null = null;

const startHealthCheck = () => {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval);
  }

  healthCheckInterval = setInterval(async () => {
    try {
      const { error } = await supabaseInstance?.from('profiles').select('id').limit(1).single() || {};
      if (error) {
        console.warn('Verbindungsprüfung fehlgeschlagen:', error);
        handleConnectionError();
      }
    } catch (error) {
      console.error('Fehler bei der Verbindungsprüfung:', error);
      handleConnectionError();
    }
  }, 30000); // Prüfe alle 30 Sekunden
};

// Cleanup-Funktion
export const cleanup = () => {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval);
  }
  supabaseInstance = null;
  isInitializing = false;
  reconnectAttempts = 0;
};

// Initialisiere den Client und starte die Überwachung
export const supabase = getSupabaseClient();
if (supabase) {
  startHealthCheck();
}

export default supabase;