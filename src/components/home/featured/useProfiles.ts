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

export interface ProfilesResponse {
  profiles: Profile[];
  total: number;
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

        const profiles: Profile[] = data?.map(profile => ({
          id: profile.id,
          name: profile.full_name || '',
          image: profile.avatar_url || '',
          avatar_url: profile.avatar_url,
          banner_url: profile.banner_url,
          category: profile.category || '',
          location: profile.location || '',
          coordinates: null,
          status: profile.availability_status || 'offline',
          rating: 0,
          reviews: 0,
          languages: profile.languages || [],
          age: profile.age || 0,
          service_categories: profile.service_categories || [],
          price_range: profile.price_range || null,
          last_seen: profile.last_seen,
          interests: profile.interests,
          occupation: profile.occupation,
          availability: profile.availability,
          availability_status: profile.availability_status || 'offline',
          gallery: profile.gallery,
          contact_info: {
            phone: profile.contact_info?.phone || null,
            email: profile.contact_info?.email || null,
          },
          service_info: {
            services: [],
            working_hours: {},
            rates: {},
          },
          user_type: profile.user_type || 'provider',
          is_verified: false,
          verification_status: 'pending',
        })) || [];

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