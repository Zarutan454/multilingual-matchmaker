import { getSupabaseClient } from '@/lib/supabase';
import type { Database } from './types';

// Export the singleton instance
export const supabase = getSupabaseClient() as ReturnType<typeof getSupabaseClient> & Database;