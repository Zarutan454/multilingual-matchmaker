import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Profile, ProfilesResponse } from '@/types/profile/types';
import { ProfileRow } from '@/types/profile/supabaseTypes';
import { toast } from 'sonner';
import { transformProfile } from '@/services/profileTransformer';

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
  return useQuery<ProfilesResponse>({
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
          query = query.ilike('location', "%"+filters.location+"%");
        }

        if (filters?.category) {
          query = query.contains('service_categories', [filters.category]);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        const rawProfiles = data as unknown as ProfileRow[];
        const profiles: Profile[] = (rawProfiles || []).map(profile => transformProfile(profile));

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