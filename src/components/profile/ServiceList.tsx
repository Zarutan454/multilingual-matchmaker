import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/types/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, DollarSign } from "lucide-react";

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
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-gray-400 mt-1">{service.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};