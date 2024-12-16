import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";
import { ServiceList } from "./ServiceList";
import { Gallery } from "./Gallery";
import { AvailabilitySchedule } from "../availability/AvailabilitySchedule";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ProfileHeader } from "./sections/ProfileHeader";
import { ProfileCharacteristics } from "./sections/ProfileCharacteristics";
import { AdditionalInfo } from "./sections/AdditionalInfo";
import { ProfileBanner } from "./sections/ProfileBanner";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface ExtendedProfileViewProps {
  profile: Profile;
  isEditable?: boolean;
}

export const ExtendedProfileView = ({ profile, isEditable = false }: ExtendedProfileViewProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Fetch all profiles to determine navigation order
  const { data: profiles = [] } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }

      return data || [];
    }
  });

  // Fetch services for this profile
  const { data: services = [] } = useQuery({
    queryKey: ['services', profile.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('provider_id', profile.id);

      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }

      return data || [];
    }
  });

  // Find current profile index and determine prev/next profiles
  const currentIndex = profiles.findIndex(p => p.id === profile.id);
  const prevProfile = currentIndex > 0 ? profiles[currentIndex - 1] : null;
  const nextProfile = currentIndex < profiles.length - 1 ? profiles[currentIndex + 1] : null;

  const handleNavigation = (profileId: string) => {
    navigate(`/provider/${profileId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
      <ProfileBanner 
        profileId={profile.id} 
        bannerUrl={profile.banner_url} 
        isEditable={isEditable} 
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 relative">
        {/* Home Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-0 bg-[#9b87f5]/20 hover:bg-[#9b87f5]/40 text-white rounded-full p-2 backdrop-blur-sm"
          onClick={() => navigate('/')}
          title={t("backToHome")}
        >
          <Home className="h-6 w-6" />
        </Button>

        {/* Navigation Arrows */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          {prevProfile && (
            <Button
              variant="ghost"
              size="icon"
              className="pointer-events-auto bg-[#9b87f5]/20 hover:bg-[#9b87f5]/40 text-white rounded-full p-2 -translate-x-1/2 backdrop-blur-sm"
              onClick={() => handleNavigation(prevProfile.id)}
              title={t("previousProfile")}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          )}
          {nextProfile && (
            <Button
              variant="ghost"
              size="icon"
              className="pointer-events-auto bg-[#9b87f5]/20 hover:bg-[#9b87f5]/40 text-white rounded-full p-2 translate-x-1/2 backdrop-blur-sm"
              onClick={() => handleNavigation(nextProfile.id)}
              title={t("nextProfile")}
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-black/80 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
              <CardHeader>
                <ProfileHeader profile={profile} />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.bio && (
                    <p className="text-gray-300 whitespace-pre-line font-sans">{profile.bio}</p>
                  )}
                  <ProfileCharacteristics profile={profile} />
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-black/80 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
              <CardHeader>
                <CardTitle className="text-white font-sans">{t("services")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ServiceList services={services} isEditable={isEditable} />
              </CardContent>
            </Card>

            {/* Availability */}
            <AvailabilitySchedule isEditable={isEditable} profileId={profile.id} />
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* Gallery */}
            <Card className="bg-black/80 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
              <CardHeader>
                <CardTitle className="text-white font-sans">{t("gallery")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Gallery images={profile.gallery || []} />
              </CardContent>
            </Card>

            {/* Additional Information */}
            <AdditionalInfo profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
};