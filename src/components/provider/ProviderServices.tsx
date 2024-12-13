import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";

export interface ProviderServicesProps {
  services: string[];
  providerId: string;
}

export const ProviderServices = ({ services }: ProviderServicesProps) => {
  const { t } = useLanguage();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{t("services")}</h2>
      <div className="flex flex-wrap gap-2">
        {services.map((service, index) => (
          <Badge key={index} variant="secondary">
            {service}
          </Badge>
        ))}
      </div>
    </Card>
  );
};