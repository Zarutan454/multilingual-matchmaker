import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase Konfigurationsfehler: URL oder Key fehlt');
  toast.error('Datenbankverbindung konnte nicht hergestellt werden');
  throw new Error('Supabase URL und API Key müssen konfiguriert sein');
}

let supabaseInstance: ReturnType<typeof createClient> | null = null;
let isReconnecting = false;
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 1000;

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
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

  return supabaseInstance;
};

export const supabase = getSupabaseClient();

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const checkConnection = async (retries = MAX_RETRIES): Promise<boolean> => {
  if (isReconnecting) return false;
  isReconnecting = true;

  try {
    for (let i = 0; i < retries; i++) {
      try {
        console.log(`Verbindungsversuch ${i + 1} von ${retries}...`);
        
        const response = await Promise.race([
          supabase.from('profiles').select('id').limit(1).single(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 10000)
          )
        ]) as { data: any; error: any } | Error;

        if (!(response instanceof Error) && !response.error) {
          console.log('Supabase Verbindung erfolgreich');
          isReconnecting = false;
          return true;
        }

        const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, i);
        console.log(`Warte ${retryDelay}ms vor dem nächsten Versuch...`);
        await delay(retryDelay);
      } catch (error) {
        console.error('Verbindungsfehler:', error);
        if (i === retries - 1) {
          toast.error('Datenbankverbindung konnte nicht hergestellt werden');
          break;
        }
      }
    }
  } finally {
    isReconnecting = false;
  }
  
  return false;
};

if (typeof window !== 'undefined') {
  let reconnectTimeout: NodeJS.Timeout;
  let lastOnlineCheck = Date.now();

  const handleConnectionChange = async () => {
    const now = Date.now();
    if (now - lastOnlineCheck < 5000) return;
    lastOnlineCheck = now;

    if (navigator.onLine) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = setTimeout(async () => {
        const isConnected = await checkConnection(3);
        if (isConnected) {
          toast.success('Verbindung wiederhergestellt');
        }
      }, 2000);
    } else {
      clearTimeout(reconnectTimeout);
      toast.error('Keine Internetverbindung');
    }
  };

  window.addEventListener('online', handleConnectionChange);
  window.addEventListener('offline', handleConnectionChange);

  setTimeout(() => {
    checkConnection(3).then(isConnected => {
      if (!isConnected) {
        console.error('Initiale Supabase Verbindung fehlgeschlagen');
        toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden');
      }
    });
  }, 2000);
}