import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Heart, Edit } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/profile/Gallery";
import { FavoritesCard } from "@/components/dashboard/FavoritesCard";
import { RecentChatsCard } from "@/components/dashboard/RecentChatsCard";
import { Profile } from "@/types/profile";
import { ProfileEditForm } from "@/components/dashboard/ProfileEditForm";
import { ImageUploadSection } from "@/components/dashboard/ImageUploadSection";
import { AvailabilitySchedule } from "@/components/availability/AvailabilitySchedule";
import { ServiceManager } from "@/components/provider/ServiceManager";

export default function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data as Profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(t("errorLoadingProfile"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

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
    } catch (error) {
      console.error('Error updating gallery:', error);
      toast.error(t("errorUpdatingGallery"));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{t("profile")}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? t("cancel") : t("edit")}
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="relative">
                    <img 
                      src={profile?.avatar_url || "/placeholder.svg"} 
                      alt={profile?.full_name || ""}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <ImageUploadSection
                      userId={user?.id || ""}
                      onImageUploaded={handleAvatarUpdate}
                      type="avatar"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <ProfileEditForm
                      profile={profile}
                      onProfileUpdate={handleProfileUpdate}
                    />
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold mb-2">{profile?.full_name || ""}</h1>
                      <p className="text-gray-400 mb-4">{profile?.bio || ""}</p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span>{profile?.location || ""}</span>
                        </div>
                        {profile?.contact_info?.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <span>{profile.contact_info.phone}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {/* Services Section */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
              <h2 className="text-xl font-bold mb-6">{t("services")}</h2>
              <ServiceManager />
            </Card>

            {/* Availability Section */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
              <h2 className="text-xl font-bold mb-6">{t("availability")}</h2>
              <AvailabilitySchedule />
            </Card>

            {/* Gallery */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t("gallery")}</h2>
                <ImageUploadSection
                  userId={user?.id || ""}
                  onImageUploaded={handleGalleryUpdate}
                  type="gallery"
                />
              </div>
              <Gallery images={profile?.gallery || []} />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <FavoritesCard user={user} />
            <RecentChatsCard user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}