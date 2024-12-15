import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Trash2 } from "lucide-react";
import { Service } from "@/types/profile";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

interface ServiceListProps {
  services: Service[];
  isEditable?: boolean;
  onDelete?: (id: string) => Promise<void>;
}

export const ServiceList = ({ services, isEditable = false, onDelete }: ServiceListProps) => {
  const { t } = useLanguage();

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-4 text-gray-400">
        {t("noServices")}
      </div>
    );
  }

  return (
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
              </div>
              {service.categories && service.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {service.categories.map((category, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="bg-secondary/20 text-secondary"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {isEditable && onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                onClick={() => onDelete(service.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};