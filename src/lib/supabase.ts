import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase Anmeldedaten fehlen in der Umgebungskonfiguration');
}

let supabaseInstance: SupabaseClient<Database> | null = null;
let isReconnecting = false;
let lastOnlineCheck = 0;

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
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

interface ConnectionCheckResult {
  data: unknown;
  error: Error | null;
}

export const checkConnection = async (retries = 3): Promise<boolean> => {
  if (isReconnecting) {
    console.log('Bereits dabei, die Verbindung wiederherzustellen...');
    return false;
  }

  isReconnecting = true;
  console.log('Überprüfe Supabase Verbindung...');

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Verbindungsversuch ${i + 1} von ${retries}...`);
      
      const result = await Promise.race([
        supabase.from('profiles').select('id').limit(1).single(),
        new Promise<ConnectionCheckResult>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 10000)
        )
      ]);

      if (result && !result.error) {
        console.log('Supabase Verbindung erfolgreich');
        isReconnecting = false;
        return true;
      }

      console.log('Verbindungsversuch fehlgeschlagen, versuche es erneut...');
      await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 10000)));
    } catch (error) {
      console.error('Fehler beim Verbindungsversuch:', error);
      
      if (i === retries - 1) {
        console.error('Maximale Anzahl an Verbindungsversuchen erreicht');
        toast.error('Verbindung zum Server konnte nicht hergestellt werden');
        isReconnecting = false;
        return false;
      }
    }
  }

  isReconnecting = false;
  return false;
};

const handleConnectionChange = async () => {
  const now = Date.now();
  if (now - lastOnlineCheck < 5000) return;
  lastOnlineCheck = now;

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
};

if (typeof window !== 'undefined') {
  window.addEventListener('online', handleConnectionChange);
  window.addEventListener('offline', handleConnectionChange);

  setTimeout(() => {
    checkConnection(3).then(isConnected => {
      if (!isConnected) {
        toast.error('Verbindung zum Server konnte nicht hergestellt werden');
      }
    });
  }, 1000);
}

export default supabase;