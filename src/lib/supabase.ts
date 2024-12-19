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

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
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
  },
  db: {
    schema: 'public'
  },
  // Add retry configuration
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  // Add better error handling
  fetch: (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Cache-Control': 'no-cache',
      },
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        console.error('Supabase request failed:', error);
        throw new Error(error.message || 'An error occurred while fetching data');
      }
      return response;
    }).catch((error) => {
      console.error('Supabase request error:', error);
      toast.error('Verbindungsfehler: Bitte überprüfen Sie Ihre Internetverbindung');
      throw error;
    });
  }
});

// Add connection health check
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
      
    if (error) throw error;
    console.log('Verbindung erfolgreich getestet');
    return true;
  } catch (error) {
    console.error('Verbindungsversuch fehlgeschlagen:', error);
    return false;
  }
};

// Add retry mechanism for failed requests
export const retryOperation = async (
  operation: () => Promise<any>,
  maxRetries = 3,
  delay = 1000
) => {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Verbindungsversuch ${i} fehlgeschlagen:`, error);
      
      if (i === maxRetries) throw error;
      
      await new Promise(resolve => setTimeout(resolve, delay * i));
    }
  }
};

export default supabase;