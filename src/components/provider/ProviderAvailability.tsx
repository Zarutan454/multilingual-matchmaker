import { Card } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export interface ProviderAvailabilityProps {
  providerId: string;
}

export const ProviderAvailability = ({ providerId }: ProviderAvailabilityProps) => {
  const { t } = useLanguage();

  // Beispiel-Verfügbarkeitsdaten - später durch echte Daten ersetzen
  const availabilityData = {
    status: "available",
    schedule: [
      { day: "Montag", hours: "10:00 - 22:00" },
      { day: "Dienstag", hours: "10:00 - 22:00" },
      { day: "Mittwoch", hours: "10:00 - 22:00" },
      { day: "Donnerstag", hours: "10:00 - 22:00" },
      { day: "Freitag", hours: "10:00 - 23:00" },
      { day: "Samstag", hours: "12:00 - 23:00" },
      { day: "Sonntag", hours: "12:00 - 22:00" },
    ],
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t("availability")}</h2>
          <Badge 
            variant="secondary" 
            className={`flex items-center gap-1 ${
              availabilityData.status === "available" 
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <Clock className="h-4 w-4" />
            {t(availabilityData.status)}
          </Badge>
        </div>

        <div className="space-y-2">
          {availabilityData.schedule.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
              <span className="font-medium">{item.day}</span>
              <span className="text-gray-600">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};