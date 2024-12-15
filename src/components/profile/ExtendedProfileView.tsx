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

interface ExtendedProfileViewProps {
  profile: Profile;
  isEditable?: boolean;
}

export const ExtendedProfileView = ({ profile, isEditable = false }: ExtendedProfileViewProps) => {
  const { t } = useLanguage();

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

  return (
    <>
      <ProfileBanner 
        profileId={profile.id} 
        bannerUrl={profile.banner_url} 
        isEditable={isEditable} 
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Information */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
              <CardHeader>
                <ProfileHeader profile={profile} />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.bio && (
                    <p className="text-gray-300 whitespace-pre-line">{profile.bio}</p>
                  )}
                  <ProfileCharacteristics profile={profile} />
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">{t("services")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ServiceList services={services} isEditable={isEditable} />
              </CardContent>
            </Card>

            {/* Availability */}
            <AvailabilitySchedule />
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* Gallery */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">{t("gallery")}</CardTitle>
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
    </>
  );
};