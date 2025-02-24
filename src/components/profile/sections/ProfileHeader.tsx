import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Globe2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@/types/profile";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { usePresence } from "@/hooks/usePresence"; // Add this import

interface ProfileHeaderProps {
  profile: Profile;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState(profile.availability_status === 'online');
  const [lastSeen, setLastSeen] = useState<string | null>(null);

  // Use the presence hook
  usePresence();

  useEffect(() => {
    // Subscribe to presence changes for this profile
    const channel = supabase
      .channel(`presence_${profile.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${profile.id}`
        },
        (payload: any) => {
          if (payload.new) {
            setIsOnline(payload.new.availability_status === 'online');
            if (payload.new.last_seen) {
              setLastSeen(formatDistanceToNow(new Date(payload.new.last_seen), { 
                addSuffix: true,
                locale: de 
              }));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile.id]);

  return (
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
          <Badge 
            variant="outline" 
            className={`${
              isOnline 
                ? "bg-green-500/20 text-green-300" 
                : "bg-gray-500/20 text-gray-300"
            }`}
          >
            <Clock className="w-3 h-3 mr-1" />
            {isOnline ? t("online") : lastSeen ? `${t("lastSeen")} ${lastSeen}` : t("offline")}
          </Badge>
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
  );
};
