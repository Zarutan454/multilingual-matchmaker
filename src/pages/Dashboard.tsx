import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/profile/Gallery";
import { FavoritesCard } from "@/components/dashboard/FavoritesCard";
import { RecentChatsCard } from "@/components/dashboard/RecentChatsCard";
import { Profile } from "@/types/profile";

export default function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <img 
                    src={profile?.avatar_url || "/placeholder.svg"} 
                    alt={profile?.full_name || ""}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{profile?.full_name || ""}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile?.age && (
                      <Badge variant="secondary" className="bg-pink-500/20 text-pink-300">
                        {profile.age} Jahre
                      </Badge>
                    )}
                    {profile?.measurements?.height && (
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                        {profile.measurements.height} cm
                      </Badge>
                    )}
                    {profile?.measurements?.weight && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                        {profile.measurements.weight} kg
                      </Badge>
                    )}
                    {profile?.measurements?.size && (
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                        KF {profile.measurements.size}
                      </Badge>
                    )}
                    {profile?.languages?.map((lang: string) => (
                      <Badge key={lang} variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                        {lang}
                      </Badge>
                    ))}
                  </div>
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
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>{profile?.availability_status || ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span>Neu</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bio/Description */}
            {profile?.bio && (
              <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
                <h2 className="text-xl font-bold mb-4">{t("about")}</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-line">{profile.bio}</p>
                </div>
              </Card>
            )}

            {/* Gallery */}
            {profile?.gallery && profile.gallery.length > 0 && (
              <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
                <h2 className="text-xl font-bold mb-4">{t("gallery")}</h2>
                <Gallery images={profile.gallery} />
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Services & Rates */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
              <h2 className="text-xl font-bold mb-4">{t("services")}</h2>
              <div className="space-y-4">
                {profile?.services_offered && (
                  <div className="flex flex-wrap gap-2">
                    {profile.services_offered.map((service: string) => (
                      <Badge key={service} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                )}
                {profile?.rates && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">{t("rates")}</h3>
                    <div className="space-y-2">
                      {Object.entries(profile.rates).map(([service, rate]) => (
                        <div key={service} className="flex justify-between">
                          <span className="capitalize">{service}</span>
                          <span>{String(rate)}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Working Hours */}
            {profile?.working_hours && (
              <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
                <h2 className="text-xl font-bold mb-4">{t("availability")}</h2>
                <div className="space-y-2">
                  {Object.entries(profile.working_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize">{day}</span>
                      <span>{Array.isArray(hours) ? hours.join(", ") : String(hours)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Favorites Card */}
            <FavoritesCard user={user} />

            {/* Recent Chats */}
            <RecentChatsCard user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}