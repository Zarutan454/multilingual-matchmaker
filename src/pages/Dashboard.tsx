import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Profile, castToProfile } from "@/types/profile";
import { DashboardLayout } from "@/components/dashboard/sections/DashboardLayout";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { GallerySection } from "@/components/dashboard/sections/GallerySection";
import { SidebarSection } from "@/components/dashboard/sections/SidebarSection";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  console.log("Dashboard component rendering");
  const { t } = useLanguage();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("fetchProfile starting, user:", user);
        if (!user) {
          console.log("No user found, redirecting to login");
          navigate('/login');
          return;
        }
        
        console.log("Fetching profile for user:", user.id);
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          throw profileError;
        }

        if (!profileData) {
          console.log("No profile data found");
          setError("Profile not found");
          return;
        }

        console.log("Profile data received:", profileData);
        const typedProfile = castToProfile(profileData);
        console.log("Typed profile:", typedProfile);

        if (typedProfile.user_type === 'provider') {
          console.log("User is a provider, redirecting to provider dashboard");
          navigate('/provider-dashboard');
          return;
        }

        setProfile(typedProfile);
      } catch (error) {
        console.error('Error in fetchProfile:', error);
        setError(t("errorLoadingProfile"));
        toast.error(t("errorLoadingProfile"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate, t]);

  const handleProfileUpdate = async (updatedProfile: Profile) => {
    console.log("Updating profile:", updatedProfile);
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleAvatarUpdate = async (url: string) => {
    try {
      console.log("Updating avatar URL:", url);
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: url })
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, avatar_url: url } : null);
      toast.success(t("profileImageUpdated"));
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error(t("errorUpdatingProfileImage"));
    }
  };

  const handleGalleryUpdate = async (url: string) => {
    try {
      console.log("Adding image to gallery:", url);
      const newGallery = [...(profile?.gallery || []), url];
      
      const { error } = await supabase
        .from('profiles')
        .update({ gallery: newGallery })
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, gallery: newGallery } : null);
      toast.success(t("imageAddedToGallery"));
    } catch (error) {
      console.error('Error updating gallery:', error);
      toast.error(t("errorUpdatingGallery"));
    }
  };

  const handleGalleryDelete = async (imageUrl: string) => {
    try {
      console.log("Deleting image from gallery:", imageUrl);
      const newGallery = profile?.gallery?.filter(url => url !== imageUrl) || [];
      
      const { error } = await supabase
        .from('profiles')
        .update({ gallery: newGallery })
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, gallery: newGallery } : null);
      toast.success(t("imageDeletedFromGallery"));
    } catch (error) {
      console.error('Error deleting from gallery:', error);
      toast.error(t("errorUpdatingGallery"));
    }
  };

  console.log("Current state - loading:", loading, "error:", error, "profile:", profile);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#9b87f5]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
        <div className="text-white text-xl mb-4">{error}</div>
        <button 
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/80 transition-colors"
        >
          {t("backToLogin")}
        </button>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <DashboardLayout userId={user?.id || ""} bannerUrl={profile?.banner_url}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileSection
            profile={profile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleAvatarUpdate={handleAvatarUpdate}
            handleProfileUpdate={handleProfileUpdate}
            userId={user?.id || ""}
          />

          <GallerySection
            userId={user?.id || ""}
            gallery={profile?.gallery}
            onGalleryUpdate={handleGalleryUpdate}
            onGalleryDelete={handleGalleryDelete}
          />
        </div>

        <SidebarSection user={user} />
      </div>
    </DashboardLayout>
  );
}