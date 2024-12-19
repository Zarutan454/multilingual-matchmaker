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
  }
});

// Verbindungsprüfung
export const checkConnection = async (retries = 3): Promise<boolean> => {
  try {
    console.log('Überprüfe Supabase Verbindung...');
    
    for (let i = 0; i < retries; i++) {
      try {
        const result = await Promise.race([
          supabase.from('profiles').select('id').limit(1).single(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
        ]);

        if (result && !result.error) {
          console.log('Supabase Verbindung erfolgreich');
          return true;
        }

        if (i < retries - 1) {
          console.log('Verbindungsversuch fehlgeschlagen, versuche es erneut...');
          await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 10000)));
        }
      } catch (error) {
        if (i === retries - 1) {
          console.error('Maximale Anzahl an Verbindungsversuchen erreicht');
          toast.error('Verbindung zum Server konnte nicht hergestellt werden');
          return false;
        }
      }
    }
  } catch (error) {
    console.error('Fehler bei der Verbindungsprüfung:', error);
    return false;
  }
  return false;
};

// Verbindungsüberwachung
let lastOnlineCheck = 0;

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

  // Initiale Verbindungsprüfung
  setTimeout(() => {
    checkConnection(3).then(isConnected => {
      if (!isConnected) {
        toast.error('Verbindung zum Server konnte nicht hergestellt werden');
      }
    });
  }, 1000);
}

export default supabase;