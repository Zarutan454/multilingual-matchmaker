import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Profile, ProfilesResponse } from '@/types/profile/types';

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
  return useQuery<ProfilesResponse>({
    queryKey: ['profiles', page, searchTerm, location, category, orientation, priceRange, availability],
    queryFn: async () => {
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

        const profiles: Profile[] = (data || []).map(profile => ({
          id: profile.id,
          full_name: profile.full_name || '',
          name: profile.full_name || '',
          image: profile.avatar_url || '',
          bio: profile.bio || '',
          avatar_url: profile.avatar_url || '',
          banner_url: profile.banner_url || '',
          category: profile.category || '',
          location: profile.location || '',
          coordinates: [0, 0],
          status: profile.availability_status || 'offline',
          rating: 0,
          reviews: 0,
          languages: profile.languages || [],
          spokenLanguages: profile.languages || [],
          serviceCategories: profile.service_categories || [],
          priceRange: {
            min: profile.price_range?.min || 0,
            max: profile.price_range?.max || 0
          },
          user_type: profile.user_type || 'provider',
          contact_info: {
            phone: profile.phone,
            email: profile.email
          },
          service_info: {
            categories: profile.service_categories || [],
            description: profile.bio || '',
            pricing: {
              hourly: profile.price_range?.min || 0,
            },
            availability: {
              days: profile.availability || [],
              hours: ''
            }
          },
          verification_status: 'pending',
          age: profile.age
        }));

        return {
          profiles,
          total: count || 0,
        };
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Error loading profiles');
        throw error;
      }
    },
  });
};