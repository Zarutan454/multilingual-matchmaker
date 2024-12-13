import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Globe2 } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface ProviderInfoProps {
  provider: any; // Später durch spezifischen Typ ersetzen
}

export const ProviderInfo = ({ provider }: ProviderInfoProps) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <Avatar className="h-48 w-48 rounded-lg">
            <AvatarImage src={provider?.avatar_url} />
            <AvatarFallback className="text-4xl">{provider?.full_name?.[0]}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="space-y-6 flex-grow">
          <div>
            <h1 className="text-3xl font-bold mb-2">{provider?.full_name}</h1>
            <p className="text-lg text-gray-600">{provider?.occupation}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
              <MapPin className="h-4 w-4" />
              {provider?.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
              <Globe2 className="h-4 w-4" />
              {provider?.stats?.languages?.join(", ")}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
              <Star className="h-4 w-4" />
              4.9 (32 {t("reviews")})
            </Badge>
            <Badge 
              variant="secondary" 
              className={`flex items-center gap-1 px-3 py-1 ${
                provider?.availability_status === "available" 
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <Clock className="h-4 w-4" />
              {t(provider?.availability_status || "offline")}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{t("age")}</span>
              <p className="font-semibold">{provider?.stats?.age}</p>
            </div>
            <div>
              <span className="text-gray-500">{t("height")}</span>
              <p className="font-semibold">{provider?.stats?.height}</p>
            </div>
            <div>
              <span className="text-gray-500">{t("location")}</span>
              <p className="font-semibold">{provider?.stats?.location}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{provider?.bio}</p>
        </div>
      </div>
    </div>
  );
};