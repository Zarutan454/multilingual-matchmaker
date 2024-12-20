import { Database } from '@/integrations/supabase/types';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];

export interface SupabaseQueryResponse {
  data: ProfileRow[] | null;
  error: Error | null;
  count: number | null;
}