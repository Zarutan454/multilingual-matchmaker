import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Profile } from "./types";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { MessageCircle, Star, MapPin, Users, Crown, Medal } from "lucide-react";

interface ProfileCardProps {
  profile: Profile;
  onChatClick: (e: React.MouseEvent, profileId: string) => void;
}

const getMembershipBadge = (level: string = 'bronze') => {
  const badges = {
    bronze: {
      icon: <Medal className="w-4 h-4 text-[#CD7F32]" />,
      text: "Bronze",
      className: "bg-gradient-to-r from-[#CD7F32]/20 to-[#CD7F32]/40 text-[#CD7F32] border-[#CD7F32]/50"
    },
    silver: {
      icon: <Medal className="w-4 h-4 text-[#C0C0C0]" />,
      text: "Silber",
      className: "bg-gradient-to-r from-[#C0C0C0]/20 to-[#C0C0C0]/40 text-[#C0C0C0] border-[#C0C0C0]/50"
    },
    gold: {
      icon: <Medal className="w-4 h-4 text-[#FFD700]" />,
      text: "Gold",
      className: "bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/40 text-[#FFD700] border-[#FFD700]/50"
    },
    vip: {
      icon: <Crown className="w-4 h-4 text-[#8B008B]" />,
      text: "VIP",
      className: "bg-gradient-to-r from-[#8B008B]/20 to-[#8B008B]/40 text-[#8B008B] border-[#8B008B]/50"
    }
  };

  return badges[level as keyof typeof badges] || badges.bronze;
};

export const ProfileCard = ({ profile, onChatClick }: ProfileCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    if (!user) {
      toast.error("Bitte melden Sie sich an, um Favoriten hinzuzufügen");
      return;
    }

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('profile_id', profile.id);
        
        if (error) throw error;
        setIsFavorite(false);
        toast.success("Aus Favoriten entfernt");
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert([
            { user_id: user.id, profile_id: profile.id }
          ]);
        
        if (error) throw error;
        setIsFavorite(true);
        toast.success("Zu Favoriten hinzugefügt");
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error("Fehler beim Aktualisieren der Favoriten");
    }
  };

  const membershipBadge = getMembershipBadge(profile.membership_level);

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

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
          onClick={handleFavoriteClick}
        >
          <Star className={`h-6 w-6 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
        </Button>

        <Badge 
          className={`absolute top-16 right-4 flex items-center gap-2 px-3 py-1 font-semibold backdrop-blur-sm border ${membershipBadge.className}`}
        >
          {membershipBadge.icon}
          {membershipBadge.text}
        </Badge>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
          <h3 className="text-xl font-bold mb-1 text-white">{profile.name}</h3>
          <p className="text-sm text-gray-300 mb-2">{profile.age} Jahre</p>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{profile.rating} ({profile.reviews})</span>
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
