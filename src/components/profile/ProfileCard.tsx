import { useNavigate } from "react-router-dom";
import { MapPin, MessageCircle, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationDistance } from "../location/LocationDistance";
import { Profile } from "./types";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProfileCardProps {
  profile: Profile;
  onChatClick: (e: React.MouseEvent, profileId: number) => void;
}

export const ProfileCard = ({ profile, onChatClick }: ProfileCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', user.id)
          .eq('profile_id', profile.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error checking favorite status:', error);
          return;
        }
        
        setIsFavorite(!!data);
      } catch (error) {
        console.error('Error in checkIfFavorite:', error);
      }
    };

    checkIfFavorite();
  }, [user, profile.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error("Bitte melden Sie sich an, um Favoriten hinzuzufügen");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
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
            {
              user_id: user.id,
              profile_id: profile.id
            }
          ]);
          
        if (error) throw error;
        
        setIsFavorite(true);
        toast.success("Zu Favoriten hinzugefügt");
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error("Ein Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
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
        
        <button
          onClick={toggleFavorite}
          disabled={isLoading}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isFavorite ? 'bg-secondary text-white' : 'bg-gray-800/50 text-gray-300'
          } hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute top-4 left-4">
          <Badge 
            variant={profile.status === "online" ? "secondary" : "outline"}
            className={`${
              profile.status === "online" 
                ? "bg-green-500/20 text-green-300 border-green-500/50" 
                : "bg-gray-500/20 text-gray-300 border-gray-500/50"
            }`}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${
              profile.status === "online" ? "bg-green-500" : "bg-gray-500"
            }`} />
            {profile.status === "online" ? "Online" : "Offline"}
          </Badge>
        </div>

        <Badge 
          className="absolute top-16 right-4 bg-secondary/90 text-white border-none"
        >
          FEATURED
        </Badge>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
          <h3 className="text-xl font-bold mb-1 text-white">{profile.name}</h3>
          <p className="text-sm text-gray-300 mb-2">{profile.age} Jahre</p>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </div>
            <LocationDistance 
              targetLat={profile.coordinates.lat} 
              targetLng={profile.coordinates.lng} 
            />
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{profile.rating} ({profile.reviews})</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users className="w-4 h-4" />
              <span>{profile.spokenLanguages?.join(", ")}</span>
            </div>
          </div>

          {profile.status === "online" && (
            <Button
              onClick={(e) => onChatClick(e, profile.id)}
              variant="secondary"
              size="sm"
              className="w-full mt-3 bg-accent hover:bg-accent-hover"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat starten
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
