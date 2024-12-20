import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

// Singleton pattern für Supabase Client
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    const error = 'Supabase Anmeldedaten fehlen in der Umgebungskonfiguration';
    console.error(error);
    toast.error(error);
    throw new Error(error);
  }

  supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey, {
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
    // Füge Caching-Optionen hinzu
    global: {
      headers: { 'Cache-Control': 'max-age=300' }, // 5 Minuten Cache
    }
  });

  return supabaseInstance;
};

export const supabase = getSupabase();

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

// Type guard for Supabase errors
export const isSupabaseError = (error: unknown): error is { message: string } => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

// Helper function to safely cast database results
export function castDatabaseResult<T>(data: unknown): T {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data structure');
  }
  return data as T;
}