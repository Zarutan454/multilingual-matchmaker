import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

class SupabaseClientSingleton {
  private static instance: ReturnType<typeof createClient<Database>> | null = null;
  private static isInitializing = false;

  public static getInstance(): ReturnType<typeof createClient<Database>> {
    if (this.instance) return this.instance;
    
    if (this.isInitializing) {
      throw new Error('SupabaseClient is still initializing');
    }

    this.isInitializing = true;

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      const error = 'Supabase Anmeldedaten fehlen in der Umgebungskonfiguration';
      console.error(error);
      toast.error(error);
      throw new Error(error);
    }

    this.instance = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
        storageKey: 'supabase.auth.token',
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: { 'Cache-Control': 'max-age=300' },
      }
    });

    this.isInitializing = false;
    return this.instance;
  }
}

export const supabase = SupabaseClientSingleton.getInstance();

// Optimierte Verbindungsprüfung mit Caching
let lastConnectionCheck = 0;
const CONNECTION_CHECK_INTERVAL = 60000; // 1 Minute

export const checkConnection = async () => {
  const now = Date.now();
  if (now - lastConnectionCheck < CONNECTION_CHECK_INTERVAL) {
    return true; // Nutze gecachtes Ergebnis
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
      
    if (error) throw error;
    
    lastConnectionCheck = now;
    console.log('Verbindung erfolgreich getestet');
    return true;
  } catch (error) {
    console.error('Verbindungsversuch fehlgeschlagen:', error);
    return false;
  }
};

// Optimierte Retry-Funktion mit exponential backoff
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> => {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Verbindungsversuch ${i} fehlgeschlagen:`, error);
      
      if (i === maxRetries) throw error;
      
      const delay = baseDelay * Math.pow(2, i - 1) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Maximale Anzahl an Versuchen erreicht');
};