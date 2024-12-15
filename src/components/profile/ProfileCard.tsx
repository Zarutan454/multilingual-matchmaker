import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Profile } from "./types";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { MessageCircle, MapPin, Users } from "lucide-react";
import { MembershipBadge } from "./badges/MembershipBadge";
import { ProfileActions } from "./actions/ProfileActions";

interface ProfileCardProps {
  profile: Profile;
  onChatClick: (e: React.MouseEvent, profileId: string) => void;
}

export const ProfileCard = ({ profile, onChatClick }: ProfileCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOnline, setIsOnline] = useState(profile.status === "online");
  const [lastSeen, setLastSeen] = useState<string | null>(null);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('availability_status, last_seen')
        .eq('id', profile.id)
        .single();

      if (!error && data) {
        setIsOnline(data.availability_status === 'online');
        if (data.last_seen) {
          setLastSeen(formatDistanceToNow(new Date(data.last_seen), { 
            addSuffix: true, 
            locale: de 
          }));
        }
      }
    };

    checkOnlineStatus();

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

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 bg-gray-900/50 backdrop-blur-sm"
      onClick={() => navigate(`/provider/${profile.id}`)}
    >
      <div className="aspect-[3/4] relative">
        <img 
          src={profile.image} 
          alt={profile.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-dark opacity-60" />

        <ProfileActions
          profileId={profile.id}
          initialLikeCount={profile.likes_count || 0}
          onFavoriteClick={handleFavoriteClick}
          isFavorite={isFavorite}
        />

        <MembershipBadge 
          level={profile.membership_level || 'bronze'} 
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
          <h3 className="text-xl font-bold mb-1 text-white">{profile.name}</h3>
          <p className="text-sm text-gray-300 mb-2">{profile.age} Jahre</p>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users className="w-4 h-4" />
              <span>{profile.spokenLanguages?.join(", ")}</span>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <Badge 
              variant={isOnline ? "success" : "secondary"}
              className="w-full justify-center"
            >
              {isOnline ? "Online" : lastSeen ? `Zuletzt online ${lastSeen}` : "Offline"}
            </Badge>

            {isOnline && (
              <Button
                onClick={(e) => onChatClick(e, profile.id)}
                variant="secondary"
                size="sm"
                className="w-full bg-accent hover:bg-accent-hover"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat starten
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};