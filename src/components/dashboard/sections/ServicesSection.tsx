import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { ServiceManager } from "@/components/provider/ServiceManager";
import { AvailabilitySchedule } from "@/components/availability/AvailabilitySchedule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Settings } from "lucide-react";

export const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="services" className="space-y-6">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="services" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          {t("services")}
        </TabsTrigger>
        <TabsTrigger value="availability" className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {t("availability")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="services">
        <Card className="bg-black/50 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] p-6">
          <h2 className="text-xl font-bold mb-6">{t("services")}</h2>
          <ServiceManager />
        </Card>
      </TabsContent>

      <TabsContent value="availability">
        <Card className="bg-black/50 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] p-6">
          <h2 className="text-xl font-bold mb-6">{t("availability")}</h2>
          <AvailabilitySchedule />
        </Card>
      </TabsContent>
    </Tabs>
  );
};