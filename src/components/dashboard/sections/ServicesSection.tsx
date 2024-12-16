import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { ServiceManager } from "@/components/provider/ServiceManager";
import { AvailabilitySchedule } from "@/components/availability/AvailabilitySchedule";

export const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <>
      <Card className="bg-black/50 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] p-6">
        <h2 className="text-xl font-bold mb-6">{t("services")}</h2>
        <ServiceManager />
      </Card>

      <Card className="bg-black/50 backdrop-blur-md border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)] p-6">
        <h2 className="text-xl font-bold mb-6">{t("availability")}</h2>
        <AvailabilitySchedule />
      </Card>
    </>
  );
};