import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase configuration error: Missing URL or Key');
  toast.error('Database connection could not be established');
  throw new Error('Supabase URL and API Key must be configured');
}

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
      fetch: (url, options = {}) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        return fetch(url, {
          ...options,
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));
      }
    }
  });

  return supabaseInstance;
};

export const supabase = getSupabaseClient();

// Improved connection check with retry mechanism
export const checkConnection = async (retries = 3, baseDelay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
        .single();
      
      if (!error) {
        console.log('Supabase connection successful');
        return true;
      }

      console.warn(`Connection attempt ${i + 1} failed:`, error);
      
      if (i < retries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error('Connection error:', error);
      if (i === retries - 1) {
        toast.error('Database connection could not be established');
        return false;
      }
    }
  }
  return false;
};

// Initialize connection monitoring
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    checkConnection().then(isConnected => {
      if (isConnected) {
        toast.success('Connection restored');
      }
    });
  });

  window.addEventListener('offline', () => {
    toast.error('No internet connection');
  });

  // Initial connection check
  checkConnection().then(isConnected => {
    if (!isConnected) {
      console.error('Initial Supabase connection failed');
    }
  });
}