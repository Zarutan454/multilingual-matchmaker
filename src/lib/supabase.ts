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
const MAX_RETRY_DELAY = 32000; // 32 seconds
const INITIAL_RETRY_DELAY = 1000; // 1 second
const CONNECTION_TIMEOUT = 60000; // 60 seconds (increased from 30)

const createSupabaseClient = () => {
  try {
    return createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
        storageKey: 'supabase.auth.token',
      },
      global: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        fetch: (url, options = {}) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), CONNECTION_TIMEOUT);

          return fetch(url, {
            ...options,
            signal: controller.signal,
            keepalive: true, // Add keepalive flag
          }).finally(() => clearTimeout(timeoutId));
        }
      },
      realtime: {
        params: {
          eventsPerSecond: 1
        },
        timeout: CONNECTION_TIMEOUT
      },
      db: {
        schema: 'public'
      }
    });
  } catch (error) {
    console.error('Fehler beim Erstellen des Supabase-Clients:', error);
    throw error;
  }
};

const testConnection = async (retries = 5): Promise<boolean> => {
  if (!supabaseInstance) return false;
  
  for (let i = 0; i < retries; i++) {
    try {
      const { error } = await supabaseInstance
        .from('profiles')
        .select('id')
        .limit(1)
        .single();

      if (error) {
        console.warn(`Verbindungsversuch ${i + 1} fehlgeschlagen:`, error);
        if (i === retries - 1) {
          console.error('Verbindung fehlgeschlagen:', error);
          return false;
        }
        // Exponential backoff with jitter
        const delay = Math.min(Math.random() * Math.pow(2, i) * 1000, MAX_RETRY_DELAY);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      console.log('Verbindung erfolgreich getestet');
      return true;
    } catch (error) {
      console.warn(`Verbindungsversuch ${i + 1} fehlgeschlagen:`, error);
      if (i === retries - 1) {
        console.error('Fehler beim Verbindungstest:', error);
        return false;
      }
      const delay = Math.min(Math.random() * Math.pow(2, i) * 1000, MAX_RETRY_DELAY);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return false;
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
    console.log('Supabase Client erfolgreich initialisiert');
    isInitializing = false;
    reconnectAttempts = 0;
    startHealthCheck();
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

  const delay = Math.min(INITIAL_RETRY_DELAY * Math.pow(2, reconnectAttempts), MAX_RETRY_DELAY);
  reconnectAttempts++;

  console.log(`Versuche Wiederverbindung in ${delay/1000} Sekunden... (Versuch ${reconnectAttempts})`);
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  try {
    cleanup();
    supabaseInstance = createSupabaseClient();
    console.log('Wiederverbindung erfolgreich');
    toast.success('Verbindung wiederhergestellt');
    startHealthCheck();
  } catch (error) {
    console.error('Wiederverbindung fehlgeschlagen:', error);
    handleConnectionError();
  }
};

let healthCheckInterval: NodeJS.Timeout | null = null;

const startHealthCheck = () => {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval);
  }

  healthCheckInterval = setInterval(async () => {
    const isConnected = await testConnection(3);
    if (!isConnected && supabaseInstance) {
      console.warn('Verbindungsprüfung fehlgeschlagen');
      handleConnectionError();
    }
  }, 30000); // Check every 30 seconds
};

export const cleanup = () => {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval);
  }
  if (supabaseInstance) {
    const realtimeClient = supabaseInstance.realtime;
    if (realtimeClient) {
      realtimeClient.disconnect();
    }
  }
  supabaseInstance = null;
  isInitializing = false;
  reconnectAttempts = 0;
};

// Event Listener für Online/Offline Status
if (typeof window !== 'undefined') {
  window.addEventListener('online', async () => {
    console.log('Online status detected');
    const isConnected = await testConnection();
    if (!isConnected) {
      handleConnectionError();
    }
  });

  window.addEventListener('offline', () => {
    console.log('Offline status detected');
    cleanup();
  });
}

export const supabase = getSupabaseClient();
if (supabase) {
  startHealthCheck();
}

export default supabase;