import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export const useFavorites = (user: User | null) => {
  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];

      try {
        const { data: favorites, error } = await supabase
          .from('favorites')
          .select(`
            id,
            profile_id,
            profiles:profile_id (
              id,
              full_name,
              avatar_url,
              location
            )
          `)
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching favorites:', error);
          toast.error("Fehler beim Laden der Favoriten");
          return [];
        }
        
        return favorites || [];
      } catch (error) {
        console.error('Error in useFavorites:', error);
        toast.error("Ein unerwarteter Fehler ist aufgetreten");
        return [];
      }
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2
  });
};