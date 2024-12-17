import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and API Key must be defined in environment variables.');
}

// Create a single instance with proper configuration and timeout settings
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  db: {
    schema: 'public'
  },
  // Add reasonable timeouts
  queries: {
    timeout: 30000 // 30 seconds
  }
});

// Add error logging without custom properties
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  if (error.message?.includes('timeout')) {
    console.error('Database timeout - please try again');
  } else if (error.message === 'Failed to fetch') {
    console.error('Network error - please check your connection');
  }
  return error;
};