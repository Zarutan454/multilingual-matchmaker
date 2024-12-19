import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing');
  throw new Error('Supabase Anmeldedaten fehlen in der Umgebungskonfiguration');
}

// Singleton instance of Supabase client with improved error handling
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
    fetch: (url, options = {}) => {
      return fetch(url, {
        ...options,
        credentials: 'include',
      });
    }
  },
  db: {
    schema: 'public'
  }
});

// Connection check with retry mechanism and improved error handling
export const checkConnection = async (retries = 3): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Überprüfe Supabase Verbindung... Versuch ${i + 1}/${retries}`);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
        .single();

      if (error) {
        console.error('Verbindungsfehler:', error);
        if (i === retries - 1) {
          toast.error(`Datenbankverbindung fehlgeschlagen: ${error.message}`);
          return false;
        }
        
        // Exponential backoff with jitter
        const delay = Math.min(1000 * Math.pow(2, i) + Math.random() * 1000, 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      console.log('Supabase Verbindung erfolgreich');
      return true;
    } catch (error: any) {
      console.error('Fehler bei der Verbindungsprüfung:', error);
      
      if (i === retries - 1) {
        toast.error(`Verbindungsfehler: ${error.message}`);
        return false;
      }

      // Exponential backoff with jitter for caught errors
      const delay = Math.min(1000 * Math.pow(2, i) + Math.random() * 1000, 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return false;
};

// Connection monitoring
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
  
  // Initial connection check
  setTimeout(() => {
    checkConnection(3).then(isConnected => {
      if (!isConnected) {
        console.error('Initial connection check failed');
      }
    });
  }, 1000);
}

export const cleanup = () => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('online', handleConnectionChange);
    window.removeEventListener('offline', handleConnectionChange);
  }
};

export default supabase;