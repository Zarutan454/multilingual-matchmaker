import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and API Key must be defined in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    flowType: 'pkce',
    debug: import.meta.env.DEV,
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  },
  // Add retry configuration
  fetch: (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    }).catch(error => {
      console.error('Fetch error:', error);
      toast.error('Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung.');
      throw error;
    });
  }
});

// Enhanced error handling utility
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  // Check if it's a network error
  if (error.message === 'Failed to fetch') {
    console.error('Network error - please check your connection');
    toast.error('Netzwerkfehler - bitte überprüfen Sie Ihre Internetverbindung');
    return error;
  }

  // Check if it's an authentication error
  if (error.status === 401) {
    console.error('Authentication error - please log in again');
    toast.error('Authentifizierungsfehler - bitte melden Sie sich erneut an');
    supabase.auth.signOut();
    return error;
  }

  // Generic error handling
  toast.error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
  return error;
};

// Helper function to check if we're running locally
export const isLocalDevelopment = () => {
  return import.meta.env.DEV;
};

// Add connection health check
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Connection check failed:', error);
    return false;
  }
};

// Initialize connection health check
if (typeof window !== 'undefined') {
  checkConnection().then(isHealthy => {
    if (!isHealthy) {
      toast.error('Verbindungsprobleme mit der Datenbank. Bitte laden Sie die Seite neu.');
    }
  });
}