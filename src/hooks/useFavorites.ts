import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/profile";

interface FavoriteProfile {
  id: string;
  profile_id: string;
  profile: Partial<Profile>;
}

export const useFavorites = (user: User | null) => {
  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async (): Promise<FavoriteProfile[]> => {
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
        profile_id: favorite.profile_id,
        profile: favorite.profile || {}
      }));
    },
    enabled: !!user
  });
};