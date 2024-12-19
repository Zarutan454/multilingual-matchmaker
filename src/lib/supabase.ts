import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

// Umgebungsvariablen prüfen
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  const error = 'Supabase Anmeldedaten fehlen in der Umgebungskonfiguration';
  console.error(error);
  toast.error(error);
  throw new Error(error);
}

// Supabase Client mit optimierter Konfiguration
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
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
  }
});

// Verbindungstest mit Retry-Logik
const testConnection = async (retries = 3, delay = 1000): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      const { data, error } = await supabase
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
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
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
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
  return false;
};

// Verbindungsüberwachung
let isTestingConnection = false;

const handleConnectionChange = async () => {
  if (isTestingConnection) return;
  isTestingConnection = true;

  try {
    if (navigator.onLine) {
      console.log('Online-Status erkannt, prüfe Verbindung...');
      const isConnected = await testConnection();
      if (isConnected) {
        toast.success('Verbindung wiederhergestellt');
      }
    } else {
      console.log('Offline-Status erkannt');
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

  // Initiale Verbindungsprüfung
  setTimeout(() => {
    testConnection().then(isConnected => {
      if (!isConnected) {
        console.error('Initiale Verbindungsprüfung fehlgeschlagen');
      }
    });
  }, 1000);
}

// Cleanup Funktion
export const cleanup = () => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('online', handleConnectionChange);
    window.removeEventListener('offline', handleConnectionChange);
  }
};

export default supabase;