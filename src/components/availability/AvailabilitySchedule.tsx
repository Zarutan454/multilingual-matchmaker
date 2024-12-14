import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  date: Date;
  timeSlots: TimeSlot[];
}

export const AvailabilitySchedule = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState("09:00");
  const [selectedEndTime, setSelectedEndTime] = useState("17:00");

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const addTimeSlot = () => {
    if (!selectedDate) return;

    const newSchedule = [...schedule];
    const daySchedule = newSchedule.find(
      (day) => day.date.toDateString() === selectedDate.toDateString()
    );

    if (daySchedule) {
      daySchedule.timeSlots.push({
        start: selectedStartTime,
        end: selectedEndTime,
      });
    } else {
      newSchedule.push({
        date: selectedDate,
        timeSlots: [
          {
            start: selectedStartTime,
            end: selectedEndTime,
          },
        ],
      });
    }

    setSchedule(newSchedule);
  };

  const getTimeSlotsForDate = (date: Date): TimeSlot[] => {
    const daySchedule = schedule.find(
      (day) => day.date.toDateString() === date.toDateString()
    );
    return daySchedule?.timeSlots || [];
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">{t("availability")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">
                {t("startTime")}
              </label>
              <Select value={selectedStartTime} onValueChange={setSelectedStartTime}>
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
              <Select value={selectedEndTime} onValueChange={setSelectedEndTime}>
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
              onClick={addTimeSlot}
              className="mt-6"
              variant="secondary"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("addTimeSlot")}
            </Button>
          </div>

          {selectedDate && (
            <div>
              <h4 className="font-medium mb-2">
                {selectedDate.toLocaleDateString()}
              </h4>
              <div className="space-y-2">
                {getTimeSlotsForDate(selectedDate).map((slot, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    {slot.start} - {slot.end}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};