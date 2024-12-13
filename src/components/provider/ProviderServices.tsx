import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { Wine, Plane, Theater, Hotel, Spa } from "lucide-react";

export interface ProviderServicesProps {
  services: string[];
  providerId: string;
}

const serviceIcons: Record<string, any> = {
  "Dinner Dates": Wine,
  "Geschäftsreisen": Plane,
  "Kulturelle Veranstaltungen": Theater,
  "Private Treffen": Hotel,
  "Wellness & Spa": Spa,
};

export const ProviderServices = ({ services }: ProviderServicesProps) => {
  const { t } = useLanguage();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{t("services")}</h2>
      <div className="space-y-3">
        {services.map((service, index) => {
          const Icon = serviceIcons[service] || Wine;
          return (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Icon className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{service}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};