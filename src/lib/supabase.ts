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
let connectionCheckInterval: NodeJS.Timeout | null = null;

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;
  
  if (isInitializing) {
    // Warte, bis die Initialisierung abgeschlossen ist
    return new Promise(resolve => setTimeout(() => resolve(getSupabaseClient()), 100));
  }

  isInitializing = true;

  try {
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
      realtime: {
        params: {
          eventsPerSecond: 1
        }
      }
    });

    startConnectionCheck();

    return supabaseInstance;
  } catch (error) {
    console.error('Fehler bei der Supabase-Initialisierung:', error);
    isInitializing = false;
    throw error;
  }
};

const testConnection = async (retries = 3): Promise<boolean> => {
  const client = getSupabaseClient();
  for (let i = 0; i < retries; i++) {
    try {
      const { error } = await client
        .from('profiles')
        .select('id')
        .limit(1)
        .single();

      if (error) {
        if (i === retries - 1) {
          console.error('Verbindungstest fehlgeschlagen:', error);
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 10000)));
        continue;
      }

      return true;
    } catch (error) {
      if (i === retries - 1) {
        console.error('Unerwarteter Fehler beim Verbindungstest:', error);
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 10000)));
    }
  }
  return false;
};

const startConnectionCheck = () => {
  if (connectionCheckInterval) {
    clearInterval(connectionCheckInterval);
  }

  // Prüfe die Verbindung alle 30 Sekunden
  connectionCheckInterval = setInterval(async () => {
    const isConnected = await testConnection(1);
    if (!isConnected) {
      console.warn('Verbindung unterbrochen, versuche neu zu verbinden...');
      await reinitializeConnection();
    }
  }, 30000);
};

const reinitializeConnection = async () => {
  try {
    supabaseInstance = null;
    isInitializing = false;
    await getSupabaseClient();
  } catch (error) {
    console.error('Fehler bei der Neuinitialisierung:', error);
  }
};

// Cleanup-Funktion
export const cleanup = () => {
  if (connectionCheckInterval) {
    clearInterval(connectionCheckInterval);
    connectionCheckInterval = null;
  }
  supabaseInstance = null;
  isInitializing = false;
};

// Exportiere eine vorinitialisierte Instanz
export const supabase = getSupabaseClient();

export default supabase;