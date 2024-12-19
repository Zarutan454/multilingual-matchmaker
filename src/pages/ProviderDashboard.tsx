import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Profile, castToProfile } from "@/types/profile";
import { DashboardLayout } from "@/components/dashboard/sections/DashboardLayout";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { GallerySection } from "@/components/dashboard/sections/GallerySection";
import { ServicesSection } from "@/components/dashboard/sections/ServicesSection";
import { SidebarSection } from "@/components/dashboard/sections/SidebarSection";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Calendar, Image, MessageSquare, Settings, Users } from "lucide-react";
import { AvailabilitySchedule } from "@/components/availability/AvailabilitySchedule";

export default function ProviderDashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }
        
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

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
  }, [user, navigate]);

  const handleProfileUpdate = async (updatedProfile: Profile) => {
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
    if (!profile) return;
    
    try {
      const newGallery = [...(profile.gallery || []), url];
      const { error } = await supabase
        .from('profiles')
        .update({ gallery: newGallery })
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, gallery: newGallery } : null);
      toast.success(t("galleryUpdated"));
    } catch (error) {
      console.error('Error updating gallery:', error);
      toast.error(t("errorUpdatingGallery"));
    }
  };

  const handleGalleryDelete = async (imageUrl: string) => {
    if (!profile) return;
    
    try {
      const newGallery = profile.gallery?.filter(url => url !== imageUrl) || [];
      const { error } = await supabase
        .from('profiles')
        .update({ gallery: newGallery })
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, gallery: newGallery } : null);
      toast.success(t("imageDeleted"));
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error(t("errorDeletingImage"));
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
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid grid-cols-5 gap-4 bg-black/20">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t("profile")}
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t("services")}
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              {t("gallery")}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t("availability")}
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {t("messages")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6">
              <ProfileSection
                profile={profile}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleAvatarUpdate={handleAvatarUpdate}
                handleProfileUpdate={handleProfileUpdate}
                userId={user?.id || ""}
              />
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <ServicesSection />
          </TabsContent>

          <TabsContent value="gallery">
            <Card className="p-6">
              <GallerySection
                userId={user?.id || ""}
                gallery={profile?.gallery}
                onGalleryUpdate={handleGalleryUpdate}
                onGalleryDelete={handleGalleryDelete}
              />
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="p-6">
              <AvailabilitySchedule isEditable={true} profileId={user?.id} />
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">{t("messages")}</h2>
              <div className="space-y-4">
                {/* Hier kommt der Chat-Bereich hin */}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}