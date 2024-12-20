import { Database } from '@/integrations/supabase/types';
import { Json } from '@/integrations/supabase/generated.types';

export type ProfileRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  location: string | null;
  category: string | null;
  availability_status: string | null;
  languages: string[] | null;
  service_categories: string[] | null;
  price_range: Json | null;
  availability: string[] | null;
  age: number | null;
  user_type: string;  // Changed from 'customer' | 'provider' to string to match Supabase
  contact_info: {
    phone?: string;
    email?: string;
  } | null;
  lat?: number;
  lng?: number;
  is_active?: boolean;
};

export interface SupabaseQueryResponse {
  data: ProfileRow[] | null;
  error: Error | null;
  count: number | null;
}