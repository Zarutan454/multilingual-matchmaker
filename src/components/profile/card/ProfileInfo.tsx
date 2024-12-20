import { MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileInfoProps {
  name: string;
  age?: number;
  location?: string;
  spokenLanguages?: string[];
  isOnline: boolean;
  lastSeen?: string | null;
}

export const ProfileInfo = ({ 
  name, 
  age, 
  location, 
  spokenLanguages, 
  isOnline, 
  lastSeen 
}: ProfileInfoProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-bold mb-1 text-white">{name}</h3>
      {age && <p className="text-sm text-gray-300 mb-2">{age} Jahre</p>}
      
      <div className="flex flex-col gap-2">
        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        )}
        {spokenLanguages && spokenLanguages.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Users className="w-4 h-4" />
            <span>{spokenLanguages.join(", ")}</span>
          </div>
        )}
      </div>

      <Badge 
        variant={isOnline ? "success" : "secondary"}
        className="w-full justify-center"
      >
        {isOnline ? "Online" : lastSeen ? `Zuletzt online ${new Date(lastSeen).toLocaleString()}` : "Offline"}
      </Badge>
    </div>
  );
};