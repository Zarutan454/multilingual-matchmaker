import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "../../contexts/LanguageContext";

export interface ProviderAvailabilityProps {
  providerId: string;
}

export const ProviderAvailability = ({ providerId }: ProviderAvailabilityProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { t } = useLanguage();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{t("availability")}</h2>
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50">
            {t("available")}
          </Badge>
        </div>
      </div>
    </Card>
  );
};