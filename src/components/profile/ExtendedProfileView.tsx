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

interface ExtendedProfileViewProps {
  profile: Profile;
  isEditable?: boolean;
}

export const ExtendedProfileView = ({ profile, isEditable = false }: ExtendedProfileViewProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Linke Spalte - Hauptinformationen */}
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
                  {profile.nickname && (
                    <p className="text-gray-400">@{profile.nickname}</p>
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
                    {profile.phone_verified && (
                      <Badge variant="outline" className="bg-green-500/20 text-green-300">
                        <Phone className="w-3 h-3 mr-1" />
                        {t("verified")}
                        <Check className="w-3 h-3 ml-1" />
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
              <p className="text-gray-300 whitespace-pre-line">{profile.bio}</p>
            </CardContent>
          </Card>

          {/* Services */}
          <ServiceList services={profile.services || []} isEditable={isEditable} />

          {/* Verfügbarkeit */}
          <AvailabilitySchedule />
        </div>

        {/* Rechte Spalte - Zusätzliche Informationen */}
        <div className="space-y-6">
          {/* Preise */}
          <PricingSection />

          {/* Galerie */}
          <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">{t("gallery")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Gallery images={profile.gallery || []} />
            </CardContent>
          </Card>

          {/* Zusätzliche Informationen */}
          <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">{t("additionalInfo")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.height && (
                <div>
                  <span className="text-gray-400">{t("height")}:</span>
                  <span className="text-white ml-2">{profile.height}</span>
                </div>
              )}
              {profile.weight && (
                <div>
                  <span className="text-gray-400">{t("weight")}:</span>
                  <span className="text-white ml-2">{profile.weight}</span>
                </div>
              )}
              {profile.interests && (
                <div>
                  <span className="text-gray-400">{t("interests")}:</span>
                  <span className="text-white ml-2">{profile.interests}</span>
                </div>
              )}
              {profile.occupation && (
                <div>
                  <span className="text-gray-400">{t("occupation")}:</span>
                  <span className="text-white ml-2">{profile.occupation}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};