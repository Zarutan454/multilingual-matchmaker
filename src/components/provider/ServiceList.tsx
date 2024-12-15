import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SERVICE_CATEGORIES } from "./ServiceCategorySelector";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  categories: string[];
}

interface ServiceListProps {
  services: Service[];
  onDelete: (id: string) => Promise<void>;
}

export const ServiceList = ({ services, onDelete }: ServiceListProps) => {
  const { t } = useLanguage();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  return (
    <div className="grid gap-4">
      {services.map((service) => (
        <Card key={service.id} className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                <p className="text-gray-400">{service.description}</p>
                <p className="text-sm text-gray-500">
                  {t("duration")}: {service.duration} {t("minutes")}
                </p>
                {service.categories && service.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {service.categories.map((categoryId) => {
                      const category = SERVICE_CATEGORIES.find(c => c.id === categoryId);
                      return category ? (
                        <Badge key={categoryId} variant="secondary">
                          {category.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(service.id)}
                disabled={deletingId === service.id}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};