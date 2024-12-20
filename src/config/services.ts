import type { Database } from '@/integrations/supabase/types';

export const config: Partial<Database> = {
  public: {
    Tables: {
      profiles: {
        Row: {},
        Insert: {},
        Update: {}
      }
    }
  }
};