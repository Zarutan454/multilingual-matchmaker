import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";
import { useLanguage } from "../../contexts/LanguageContext";

export const AvailabilityCalendar = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{t("availability")}</h3>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </Card>
  );
};