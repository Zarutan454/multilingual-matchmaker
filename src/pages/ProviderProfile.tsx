import { useParams } from "react-router-dom";
import { ExtendedProfileView } from "../components/profile/ExtendedProfileView";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['provider', id],
    queryFn: async () => {
      if (!id) throw new Error('No ID provided');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Profile not found');
      }

      return data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">{t("profileNotFound")}</p>
      </div>
    );
  }

  return <ExtendedProfileView profile={profile} />;
}