import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface TimeSlotSelectorProps {
  selectedStartTime: string;
  selectedEndTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onAddTimeSlot: () => void;
}

export const TimeSlotSelector = ({
  selectedStartTime,
  selectedEndTime,
  onStartTimeChange,
  onEndTimeChange,
  onAddTimeSlot,
}: TimeSlotSelectorProps) => {
  const { t } = useLanguage();
  
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <label className="text-sm font-medium mb-1 block">
          {t("startTime")}
        </label>
        <Select value={selectedStartTime || timeOptions[0]} onValueChange={onStartTimeChange}>
          <SelectTrigger>
            <SelectValue placeholder={t("selectStartTime")} />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="text-sm font-medium mb-1 block">
          {t("endTime")}
        </label>
        <Select value={selectedEndTime || timeOptions[0]} onValueChange={onEndTimeChange}>
          <SelectTrigger>
            <SelectValue placeholder={t("selectEndTime")} />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onAddTimeSlot}
        className="mt-6"
        variant="secondary"
      >
        <Plus className="w-4 h-4 mr-2" />
        {t("addTimeSlot")}
      </Button>
    </div>
  );
};