import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Profile } from "./types";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { MessageCircle, MapPin, Users, Star, Heart, Medal, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileCardProps {
  profile: Profile;
  onChatClick: (e: React.MouseEvent, profileId: string) => void;
}

export const ProfileCard = ({ profile, onChatClick }: ProfileCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(profile.likes_count || 0);
  const [isOnline, setIsOnline] = useState(profile.status === "online");
  const [lastSeen, setLastSeen] = useState<string | null>(null);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profile_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('profile_id', profile.id)
        .single();
      
      setIsLiked(!!data);
    };

    checkLikeStatus();
  }, [user, profile.id]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Bitte melden Sie sich an, um Profile zu liken");
      return;
    }

    try {
      if (isLiked) {
        const { error } = await supabase
          .from('profile_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('profile_id', profile.id);
        
        if (error) throw error;
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
        toast.success("Like entfernt");
      } else {
        const { error } = await supabase
          .from('profile_likes')
          .insert([
            { user_id: user.id, profile_id: profile.id }
          ]);
        
        if (error) throw error;
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        toast.success("Profil geliked");
      }
    } catch (error) {
      console.error('Error updating likes:', error);
      toast.error("Fehler beim Aktualisieren des Likes");
    }
  };

  const getMembershipBadge = () => {
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

    const badge = badges[profile.membership_level as keyof typeof badges] || badges.bronze;

    return (
      <Badge 
        className={`flex items-center gap-2 px-3 py-1 font-semibold backdrop-blur-sm border ${badge.className}`}
      >
        {badge.icon}
        {badge.text}
      </Badge>
    );
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

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => handleLikeClick(e)}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="absolute -bottom-4 text-xs font-semibold">
                {likeCount}
              </span>
            </Button>
          </div>
        </div>

        <div className="absolute top-4 left-4">
          {getMembershipBadge()}
        </div>

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