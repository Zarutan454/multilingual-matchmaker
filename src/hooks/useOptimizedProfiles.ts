import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Profile, ProfilesResponse } from '@/types/profile/types';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];

interface UseProfilesProps {
  page: number;
  pageSize: number;
  filters?: {
    searchTerm?: string;
    location?: string;
    category?: string;
    orientation?: string;
    membershipLevel?: string;
  };
  enabled?: boolean;
}

const CACHE_TIME = 1000 * 60 * 5; // 5 minutes
const STALE_TIME = 1000 * 30; // 30 seconds

export const useOptimizedProfiles = ({
  page,
  pageSize,
  filters,
  enabled = true
}: UseProfilesProps) => {
  return useQuery({
    queryKey: ['optimized-profiles', page, pageSize, filters],
    queryFn: async () => {
      try {
        let query = supabase
          .from('profiles')
          .select('*', { count: 'exact' })
          .eq('user_type', 'provider')
          .eq('is_active', true)
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (filters?.searchTerm) {
          query = query.ilike('full_name', `%${filters.searchTerm}%`);
        }

        if (filters?.location) {
          query = query.ilike('location', `%${filters.location}%`);
        }

        if (filters?.category) {
          query = query.contains('service_categories', [filters.category]);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        const profiles: Profile[] = (data || []).map((profile: ProfileRow) => {
          const priceRangeData = profile.price_range as { min: number; max: number } | null;

          return {
            id: profile.id,
            full_name: profile.full_name || '',
            name: profile.full_name || '',
            image: profile.avatar_url || '',
            bio: profile.bio || '',
            avatar_url: profile.avatar_url || '',
            banner_url: profile.banner_url || '',
            category: profile.category || '',
            location: profile.location || '',
            coordinates: {
              lat: 0,
              lng: 0
            },
            status: profile.availability_status || 'offline',
            rating: 0,
            reviews: 0,
            languages: profile.languages || [],
            spokenLanguages: profile.languages || [],
            serviceCategories: profile.service_categories || [],
            priceRange: {
              min: priceRangeData?.min || 0,
              max: priceRangeData?.max || 0
            },
            user_type: profile.user_type as 'customer' | 'provider',
            contact_info: {
              phone: (profile as any).phone || '',
              email: (profile as any).email || ''
            },
            service_info: {
              categories: profile.service_categories || [],
              description: profile.bio || '',
              pricing: {
                hourly: priceRangeData?.min || 0,
              },
              availability: {
                days: profile.availability || [],
                hours: ''
              }
            },
            verification_status: 'pending',
            age: profile.age || 0
          };
        });

        return {
          profiles,
          total: count || 0
        };
      } catch (error) {
        console.error('Error loading profiles:', error);
        toast.error('Error loading profiles');
        throw error;
      }
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled,
    meta: {
      errorMessage: 'Error loading profiles'
    }
  });
};