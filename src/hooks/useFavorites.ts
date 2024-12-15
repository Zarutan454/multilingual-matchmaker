import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/favorites";

interface FavoriteData {
  id: string;
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
        return [];
      }

      return favorites.map(favorite => ({
        id: favorite.id,
        profile: favorite.profile as Profile
      }));
    },
    enabled: !!user
  });
};