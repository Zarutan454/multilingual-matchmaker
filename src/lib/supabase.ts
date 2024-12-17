import { createClient } from '@supabase/supabase-js';

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
    storage: window.localStorage
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    }
  },
  db: {
    schema: 'public'
  },
  // Add retry configuration
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Utility function for error handling
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  // Check if it's a network error
  if (error.message === 'Failed to fetch') {
    console.error('Network error - please check your connection');
    throw new Error('Netzwerkfehler - bitte überprüfen Sie Ihre Internetverbindung');
  }

  // Check if it's an authentication error
  if (error.status === 401) {
    console.error('Authentication error - please log in again');
    supabase.auth.signOut();
    throw new Error('Authentifizierungsfehler - bitte melden Sie sich erneut an');
  }

  return error;
};

// Helper function to check if we're running locally
export const isLocalDevelopment = () => {
  return import.meta.env.VITE_SUPABASE_URL.includes('localhost');
};