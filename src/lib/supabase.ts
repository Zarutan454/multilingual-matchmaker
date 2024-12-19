import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase Anmeldedaten fehlen in der Umgebungskonfiguration');
}

// Singleton-Instanz des Supabase-Clients
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    },
    fetch: (url: RequestInfo | URL, options?: RequestInit) => {
      return fetch(url, options).catch(err => {
        console.error('Fetch error:', err);
        toast.error('Verbindungsfehler: Bitte überprüfen Sie Ihre Internetverbindung');
        throw err;
      });
    }
  }
});

// Verbindungsprüfung mit Retry-Mechanismus
export const checkConnection = async (retries = 3): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Überprüfe Supabase Verbindung... Versuch ${i + 1}/${retries}`);
      
      const { data, error: queryError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (queryError) {
        console.error('Verbindungsfehler:', queryError);
        if (i === retries - 1) {
          toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden');
          return false;
        }
        // Exponentielles Backoff für Wiederholungsversuche
        await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 10000)));
        continue;
      }

      console.log('Supabase Verbindung erfolgreich');
      return true;
    } catch (error) {
      console.error('Fehler bei der Verbindungsprüfung:', error);
      if (i === retries - 1) {
        toast.error('Verbindung zur Datenbank konnte nicht hergestellt werden');
        return false;
      }
    }
  }
  return false;
};

// Verbindungsüberwachung
let connectionCheckTimeout: NodeJS.Timeout | null = null;
let isCheckingConnection = false;

const handleConnectionChange = async () => {
  if (isCheckingConnection) return;
  isCheckingConnection = true;

  try {
    if (navigator.onLine) {
      console.log('Online status detected, checking connection...');
      const isConnected = await checkConnection(3);
      if (isConnected) {
        toast.success('Verbindung wiederhergestellt');
      }
    } else {
      console.log('Offline status detected');
      toast.error('Keine Internetverbindung');
    }
  } finally {
    isCheckingConnection = false;
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('online', handleConnectionChange);
  window.addEventListener('offline', handleConnectionChange);

  // Initiale Verbindungsprüfung mit Verzögerung
  connectionCheckTimeout = setTimeout(() => {
    checkConnection(3).then(isConnected => {
      if (!isConnected) {
        toast.error('Verbindung zum Server konnte nicht hergestellt werden');
      }
    });
  }, 1000);
}

// Cleanup-Funktion für Event-Listener
export const cleanup = () => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('online', handleConnectionChange);
    window.removeEventListener('offline', handleConnectionChange);
    if (connectionCheckTimeout) {
      clearTimeout(connectionCheckTimeout);
    }
  }
};

export default supabase;