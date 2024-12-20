import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Profile } from '@/types/profile/types';

interface UseProfilesProps {
  page: number;
  searchTerm?: string;
  location?: string;
  category?: string;
  orientation?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: string;
  itemsPerPage?: number;
}

export const useProfiles = ({
  page = 0,
  searchTerm = '',
  location = '',
  category = '',
  orientation = '',
  priceRange = { min: 0, max: 1000 },
  availability,
  itemsPerPage = 12,
}: UseProfilesProps) => {
  return useQuery({
    queryKey: ['profiles', page, searchTerm, location, category, orientation, priceRange, availability],
    queryFn: async () => {
      console.log('Fetching profiles with params:', {
        page,
        searchTerm,
        location,
        category,
        orientation,
        priceRange,
        availability,
        itemsPerPage
      });

      try {
        let query = supabase
          .from('profiles')
          .select('*', { count: 'exact' })
          .eq('user_type', 'provider')
          .eq('is_active', true)
          .range(page * itemsPerPage, (page + 1) * itemsPerPage - 1);

        if (searchTerm) {
          query = query.ilike('full_name', `%${searchTerm}%`);
        }

        if (location) {
          query = query.ilike('location', `%${location}%`);
        }

        if (category) {
          query = query.contains('service_categories', [category]);
        }

        if (orientation) {
          query = query.contains('service_categories', [orientation]);
        }

        const { data, error, count } = await query;

        if (error) {
          throw error;
        }

        return {
          profiles: data as Profile[],
          total: count || 0,
        };
      } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,   // 30 minutes
    retry: 3,
    meta: {
      errorMessage: 'Fehler beim Laden der Profile'
    }
  });
};