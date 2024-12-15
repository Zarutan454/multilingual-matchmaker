import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const useRecentContacts = (user: User | null) => {
  return useQuery({
    queryKey: ['recentContacts'],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(5);

      if (error) {
        console.error('Error fetching contacts:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!user
  });
};