import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const useRecentContacts = (user: User | null) => {
  return useQuery({
    queryKey: ['recentContacts', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, location')
        .neq('id', user.id)
        .limit(5);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });
};