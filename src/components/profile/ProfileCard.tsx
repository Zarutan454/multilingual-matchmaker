import { useNavigate } from "react-router-dom";
import { MapPin, MessageCircle, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationDistance } from "../location/LocationDistance";
import { Profile } from "./types";

interface ProfileCardProps {
  profile: Profile;
  onChatClick: (e: React.MouseEvent, profileId: number) => void;
}

export const ProfileCard = ({ profile, onChatClick }: ProfileCardProps) => {
  const navigate = useNavigate();

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
        
        {/* Status Badge */}
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

        {/* Featured Badge */}
        <Badge 
          className="absolute top-4 right-4 bg-secondary/90 text-white border-none"
        >
          FEATURED
        </Badge>

        {/* Profile Info */}
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
              <span>{profile.languages.join(", ")}</span>
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