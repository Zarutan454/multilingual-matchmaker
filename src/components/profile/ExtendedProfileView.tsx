import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Globe2, Phone, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile, Service } from "@/types/profile";
import { ServiceList } from "./ServiceList";
import { Gallery } from "./Gallery";
import { AvailabilitySchedule } from "../availability/AvailabilitySchedule";
import { PricingSection } from "../services/PricingSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface ExtendedProfileViewProps {
  profile: Profile;
  isEditable?: boolean;
}

export const ExtendedProfileView = ({ profile, isEditable = false }: ExtendedProfileViewProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("info");

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
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Main Information */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
            <CardHeader>
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-secondary">
                  <img 
                    src={profile.avatar_url || "/placeholder.svg"} 
                    alt={profile.full_name || ""} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white">{profile.full_name}</h1>
                  {profile.age && (
                    <p className="text-gray-400">{profile.age} {t("years")}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profile.availability_status && (
                      <Badge variant="outline" className="bg-green-500/20 text-green-300">
                        <Clock className="w-3 h-3 mr-1" />
                        {t(profile.availability_status)}
                      </Badge>
                    )}
                    {profile.location && (
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300">
                        <MapPin className="w-3 h-3 mr-1" />
                        {profile.location}
                      </Badge>
                    )}
                    {profile.languages && (
                      <Badge variant="outline" className="bg-purple-500/20 text-purple-300">
                        <Globe2 className="w-3 h-3 mr-1" />
                        {profile.languages.join(", ")}
                      </Badge>
                    )}
                  </div>
                </div>
                {profile.rating && (
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xl font-bold text-white">{profile.rating}</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {profile.reviews_count} {t("reviews")}
                    </p>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profile.bio && (
                  <p className="text-gray-300 whitespace-pre-line">{profile.bio}</p>
                )}

                {/* Physical Characteristics */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-4">
                  {profile.gender && (
                    <div>
                      <span className="text-gray-400">{t("gender")}: </span>
                      <span className="text-white">{profile.gender}</span>
                    </div>
                  )}
                  {profile.height && (
                    <div>
                      <span className="text-gray-400">{t("height")}: </span>
                      <span className="text-white">{profile.height}</span>
                    </div>
                  )}
                  {profile.body_type && (
                    <div>
                      <span className="text-gray-400">{t("bodyType")}: </span>
                      <span className="text-white">{profile.body_type}</span>
                    </div>
                  )}
                  {profile.bust_size && (
                    <div>
                      <span className="text-gray-400">{t("bustSize")}: </span>
                      <span className="text-white">{profile.bust_size}</span>
                    </div>
                  )}
                  {profile.dress_size && (
                    <div>
                      <span className="text-gray-400">{t("dressSize")}: </span>
                      <span className="text-white">{profile.dress_size}</span>
                    </div>
                  )}
                </div>

                {/* Appearance */}
                <div className="space-y-4 border-t border-gray-800 pt-4">
                  <h3 className="text-lg font-semibold text-white">{t("appearance")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {(profile.hair_color || profile.hair_length || profile.hair_type) && (
                      <div>
                        <span className="text-gray-400">{t("hair")}: </span>
                        <span className="text-white">
                          {[profile.hair_color, profile.hair_length, profile.hair_type]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                    {profile.eye_color && (
                      <div>
                        <span className="text-gray-400">{t("eyeColor")}: </span>
                        <span className="text-white">{profile.eye_color}</span>
                      </div>
                    )}
                    {profile.skin_tone && (
                      <div>
                        <span className="text-gray-400">{t("skinTone")}: </span>
                        <span className="text-white">{profile.skin_tone}</span>
                      </div>
                    )}
                    {profile.grooming && (
                      <div>
                        <span className="text-gray-400">{t("grooming")}: </span>
                        <span className="text-white">{profile.grooming}</span>
                      </div>
                    )}
                  </div>
                </div>
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
          {/* Pricing */}
          <PricingSection />

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
          <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">{t("additionalInfo")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.interests && (
                <div>
                  <span className="text-gray-400">{t("interests")}: </span>
                  <span className="text-white">{profile.interests}</span>
                </div>
              )}
              {profile.occupation && (
                <div>
                  <span className="text-gray-400">{t("occupation")}: </span>
                  <span className="text-white">{profile.occupation}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};