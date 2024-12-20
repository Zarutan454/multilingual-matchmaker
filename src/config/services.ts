import type { Database } from '@/integrations/supabase/types';

export const config: Partial<Database> = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: '',
          full_name: '',
          avatar_url: '',
          user_type: 'customer',
          age: 0,
          audit_log: [],
          availability: [],
          availability_status: '',
          banner_url: '',
          bio: '',
          body_type: '',
          bust_size: '',
          category: '',
          contact_info: null,
          created_at: '',
          dress_size: '',
          eye_color: '',
          gallery: [],
          gender: '',
          grooming: '',
          hair_color: '',
          hair_length: '',
          hair_type: '',
          height: '',
          interests: '',
          is_active: true,
          is_verified: false,
          languages: [],
          last_login: '',
          last_seen: '',
          likes_count: 0,
          location: '',
          measurements: null,
          occupation: '',
          price_range: null,
          rates: null,
          role: '',
          service_categories: [],
          services_offered: [],
          skin_tone: '',
          updated_at: '',
          verification_status: '',
          weight: '',
          working_hours: null
        },
        Insert: {
          id: ''
        },
        Update: {}
      }
    }
  }
};