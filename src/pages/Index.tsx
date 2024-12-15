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
import { Profile } from "@/types/profile";

export default function Index() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="md:col-span-2">
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
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{profile?.location || ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>{profile?.availability_status || ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bio/Description */}
            {profile?.bio && (
              <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6 mt-6">
                <h2 className="text-xl font-bold mb-4">{t("about")}</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-line">{profile.bio}</p>
                </div>
              </Card>
            )}

            {/* Gallery */}
            {profile?.gallery && profile.gallery.length > 0 && (
              <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6 mt-6">
                <h2 className="text-xl font-bold mb-4">{t("gallery")}</h2>
                <Gallery images={profile.gallery} />
              </Card>
            )}
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            {/* Services & Rates */}
            <Card className="bg-black/50 backdrop-blur-sm border-neutral-800 p-6">
              <h2 className="text-xl font-bold mb-4">{t("services")}</h2>
              <div className="space-y-4">
                {profile?.service_categories && (
                  <div className="flex flex-wrap gap-2">
                    {profile.service_categories.map((service: string) => (
                      <Badge key={service} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}