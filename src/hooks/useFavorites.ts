import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { FavoriteData, Profile } from "@/types/favorites";

interface FavoriteResponse {
  id: string;
  profile_id: string;
  profile: Profile;
}

export const useFavorites = (user: User | null) => {
  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async (): Promise<FavoriteData[]> => {
      if (!user) return [];

      const { data: favorites, error } = await supabase
        .from('favorites')
        .select(`
          id,
          profile_id,
          profile:profiles (
            id,
            full_name,
            avatar_url,
            location
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
        return [];
      }

      return favorites.map(favorite => ({
        id: favorite.id,
        profile: {
          id: favorite.profile.id,
          full_name: favorite.profile.full_name,
          avatar_url: favorite.profile.avatar_url,
          location: favorite.profile.location
        }
      }));
    },
    enabled: !!user
  });
};