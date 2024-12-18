import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardLayout } from "@/components/dashboard/sections/DashboardLayout";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { ServicesSection } from "@/components/dashboard/sections/ServicesSection";
import { GallerySection } from "@/components/dashboard/sections/GallerySection";
import { SidebarSection } from "@/components/dashboard/sections/SidebarSection";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";
import { Profile } from "@/types/profile";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const checkUserType = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (profileData?.user_type !== 'provider') {
          toast.error(t("onlyProvidersAllowed"));
          navigate('/dashboard');
          return;
        }

        setProfile(profileData as Profile);
      } catch (error) {
        console.error('Error checking user type:', error);
        toast.error(t("errorCheckingUserType"));
      } finally {
        setLoading(false);
      }
    };

    checkUserType();
  }, [user, navigate, t]);

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleAvatarUpdate = async (url: string) => {
    try {
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
      const newGallery = profile?.gallery?.filter(url => url !== imageUrl) || [];
      
      setProfile(prev => prev ? { ...prev, gallery: newGallery } : null);
      toast.success(t("imageDeletedFromGallery"));
    } catch (error) {
      console.error('Error updating gallery:', error);
      toast.error(t("errorUpdatingGallery"));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#9b87f5]"></div>
      </div>
    );
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

          <ServicesSection />

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