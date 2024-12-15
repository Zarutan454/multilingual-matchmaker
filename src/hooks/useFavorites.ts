import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { FavoriteData } from "@/types/favorites";

export const useFavorites = (user: User | null) => {
  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          profile:profiles!favorites_profile_id_fkey (
            id,
            full_name,
            avatar_url,
            location
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }

      // Transform the data to match FavoriteData type
      const favorites: FavoriteData[] = data?.map(item => ({
        id: item.id,
        profile: {
          id: item.profile.id,
          full_name: item.profile.full_name,
          avatar_url: item.profile.avatar_url,
          location: item.profile.location
        }
      })) || [];

      return favorites;
    },
    enabled: !!user
  });
};