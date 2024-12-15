import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
}

export const ServiceManager = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: 30
  });

  const handleAddService = () => {
    if (!newService.name || !newService.description) {
      toast.error(t("fillAllFields"));
      return;
    }

    const service: Service = {
      id: crypto.randomUUID(),
      ...newService
    };

    setServices([...services, service]);
    setNewService({ name: "", description: "", duration: 30 });
    toast.success(t("serviceAdded"));
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast.success(t("serviceDeleted"));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">{t("addNewService")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder={t("serviceName")}
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Textarea
              placeholder={t("serviceDescription")}
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder={t("duration")}
              value={newService.duration}
              onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Button onClick={handleAddService} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {t("addService")}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                  <p className="text-gray-400 mt-1">{service.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {t("duration")}: {service.duration} {t("minutes")}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteService(service.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}