import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/types/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, DollarSign } from "lucide-react";

const SERVICE_CATEGORIES = [
  { id: "dinner_dates", label: "Dinner Dates" },
  { id: "hotel_visits", label: "Hotelbesuche" },
  { id: "home_visits", label: "Hausbesuche" },
  { id: "events", label: "Events & Partys" },
  { id: "travel", label: "Reisebegleitung" },
  { id: "culture", label: "Kulturelle Veranstaltungen" },
  { id: "wellness", label: "Wellness & Spa" }
];

interface ServiceListProps {
  services: Service[];
  isEditable?: boolean;
}

export const ServiceList = ({ services, isEditable = false }: ServiceListProps) => {
  const { t } = useLanguage();

  if (services.length === 0) {
    return (
      <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">{t("services")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-4">{t("noServices")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-neutral-800">
      <CardHeader>
        <CardTitle className="text-white">{t("services")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {services.map((service) => (
            <div 
              key={service.id}
              className="p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-gray-400">{service.description}</p>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration} {t("minutes")}
                    </div>
                    {service.price && (
                      <div className="flex items-center text-gray-400">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {service.price}
                      </div>
                    )}
                  </div>
                  {service.categories && service.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {service.categories.map((categoryId) => {
                        const category = SERVICE_CATEGORIES.find(c => c.id === categoryId);
                        return category ? (
                          <Badge 
                            key={categoryId} 
                            variant="secondary"
                            className="bg-secondary/20 text-secondary"
                          >
                            {category.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};