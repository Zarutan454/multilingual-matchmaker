import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface ProviderInfoProps {
  provider: any;
}

export const ProviderInfo = ({ provider }: ProviderInfoProps) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Avatar className="h-32 w-32">
          <AvatarImage src={provider?.avatar_url} />
          <AvatarFallback>{provider?.full_name?.[0]}</AvatarFallback>
        </Avatar>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{provider?.full_name}</h1>
            <p className="text-gray-600">{provider?.occupation}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {provider?.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              4.8 (120)
            </Badge>
            <Badge 
              variant="secondary" 
              className={`flex items-center gap-1 ${
                provider?.availability_status === "available" 
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <Clock className="h-4 w-4" />
              {t(provider?.availability_status || "offline")}
            </Badge>
          </div>

          <p className="text-gray-700">{provider?.bio}</p>
        </div>
      </div>
    </div>
  );
};