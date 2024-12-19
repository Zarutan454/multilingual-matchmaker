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

// Singleton-Pattern für den Supabase-Client
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey, {
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
      // Verbindungseinstellungen optimieren
      realtime: {
        params: {
          eventsPerSecond: 2
        }
      }
    });
  }
  return supabaseInstance;
};

export const supabase = getSupabaseClient();

// Optimierte Verbindungsprüfung mit exponential backoff
const testConnection = async (retries = 3): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      const { error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
        .single();

      if (error) {
        console.warn(`Verbindungsversuch ${i + 1}/${retries} fehlgeschlagen:`, error.message);
        if (i === retries - 1) {
          toast.error(`Datenbankverbindung fehlgeschlagen: ${error.message}`);
          return false;
        }
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 10000)));
        continue;
      }

      console.log('Supabase Verbindung erfolgreich hergestellt');
      return true;
    } catch (error: any) {
      console.error('Unerwarteter Fehler:', error);
      if (i === retries - 1) {
        toast.error(`Verbindungsfehler: ${error.message}`);
        return false;
      }
    }
  }
  return false;
};

// Verbindungsüberwachung optimieren
let isTestingConnection = false;
let reconnectTimeout: NodeJS.Timeout | null = null;

const handleConnectionChange = async () => {
  if (isTestingConnection) return;
  isTestingConnection = true;

  try {
    if (navigator.onLine) {
      const isConnected = await testConnection();
      if (isConnected) {
        toast.success('Verbindung wiederhergestellt');
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
          reconnectTimeout = null;
        }
      } else {
        // Verzögerte Wiederverbindung
        reconnectTimeout = setTimeout(() => {
          handleConnectionChange();
        }, 30000); // 30 Sekunden warten vor erneutem Versuch
      }
    } else {
      toast.error('Keine Internetverbindung');
    }
  } finally {
    isTestingConnection = false;
  }
};

// Event Listener für Online/Offline Status
if (typeof window !== 'undefined') {
  window.addEventListener('online', handleConnectionChange);
  window.addEventListener('offline', handleConnectionChange);

  // Initiale Verbindungsprüfung mit Verzögerung
  setTimeout(() => {
    testConnection().catch(console.error);
  }, 2000);
}

// Cleanup Funktion
export const cleanup = () => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('online', handleConnectionChange);
    window.removeEventListener('offline', handleConnectionChange);
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
  }
};

export default supabase;