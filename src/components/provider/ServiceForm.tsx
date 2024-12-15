import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ServiceCategorySelector } from "./ServiceCategorySelector";

interface ServiceFormProps {
  onSubmit: (service: {
    name: string;
    description: string;
    duration: number;
    categories: string[];
  }) => Promise<void>;
  isSubmitting: boolean;
}

export const ServiceForm = ({ onSubmit, isSubmitting }: ServiceFormProps) => {
  const { t } = useLanguage();
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: 30,
    categories: [] as string[]
  });

  const handleSubmit = async () => {
    if (!newService.name || !newService.description) {
      return;
    }

    await onSubmit(newService);
    setNewService({ name: "", description: "", duration: 30, categories: [] });
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="space-y-4 pt-6">
        <Input
          placeholder={t("serviceName")}
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Textarea
          placeholder={t("serviceDescription")}
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          type="number"
          placeholder={t("duration")}
          value={newService.duration}
          onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) })}
          className="bg-gray-800 border-gray-700 text-white"
        />

        <ServiceCategorySelector
          selectedCategories={newService.categories}
          onCategoryChange={(categories) => 
            setNewService({ ...newService, categories })
          }
        />

        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={isSubmitting}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isSubmitting ? t("adding") : t("addService")}
        </Button>
      </CardContent>
    </Card>
  );
};