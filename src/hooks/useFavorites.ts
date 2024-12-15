import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/types/profile";

interface FavoriteProfile {
  id: string;
  profile: {
    id: string;
    full_name: string;
    avatar_url: string;
    location: string;
  };
}

export const useFavorites = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: favorites, error } = await supabase
        .from("favorites")
        .select(`
          id,
          profile:profile_id (
            id,
            full_name,
            avatar_url,
            location
          )
        `)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
        throw error;
      }

      return favorites.map((favorite: FavoriteProfile) => ({
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