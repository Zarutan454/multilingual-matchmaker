import { Card } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";

interface ProviderAvailabilityProps {
  availability: string[];
}

export const ProviderAvailability = ({ availability }: ProviderAvailabilityProps) => {
  const { t } = useLanguage();

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{t("availability")}</h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={day}
            className={`p-2 text-center rounded ${
              availability.includes(day.toLowerCase())
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </Card>
  );
};