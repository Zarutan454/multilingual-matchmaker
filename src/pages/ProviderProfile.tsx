import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Profile, castToProfile } from "@/types/profile";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) return;

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        // Use the casting function here
        const typedProfile = castToProfile(profileData);
        setProfile(typedProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(t("errorLoadingProfile"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profile?.full_name}</h1>
      <p>{profile?.bio}</p>
      {/* Add more profile details as needed */}
    </div>
  );
}
