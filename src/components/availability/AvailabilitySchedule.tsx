import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { TimeSlotList } from "./TimeSlotList";

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  date: Date;
  timeSlots: TimeSlot[];
}

interface AvailabilityScheduleProps {
  isEditable?: boolean;
}

export const AvailabilitySchedule = ({ isEditable = false }: AvailabilityScheduleProps) => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState("09:00");
  const [selectedEndTime, setSelectedEndTime] = useState("17:00");

  const validateTimeSlot = (start: string, end: string): boolean => {
    const startHour = parseInt(start.split(":")[0]);
    const endHour = parseInt(end.split(":")[0]);
    return startHour < endHour;
  };

  const addTimeSlot = () => {
    if (!selectedDate) {
      toast.error(t("selectDate"));
      return;
    }

    if (!validateTimeSlot(selectedStartTime, selectedEndTime)) {
      toast.error(t("invalidTimeRange"));
      return;
    }

    const newSchedule = [...schedule];
    const daySchedule = newSchedule.find(
      (day) => day.date.toDateString() === selectedDate.toDateString()
    );

    if (daySchedule) {
      const hasOverlap = daySchedule.timeSlots.some((slot) => {
        const slotStart = parseInt(slot.start.split(":")[0]);
        const slotEnd = parseInt(slot.end.split(":")[0]);
        const newStart = parseInt(selectedStartTime.split(":")[0]);
        const newEnd = parseInt(selectedEndTime.split(":")[0]);
        return (
          (newStart >= slotStart && newStart < slotEnd) ||
          (newEnd > slotStart && newEnd <= slotEnd)
        );
      });

      if (hasOverlap) {
        toast.error(t("timeSlotOverlap"));
        return;
      }

      daySchedule.timeSlots.push({
        start: selectedStartTime,
        end: selectedEndTime,
      });
      daySchedule.timeSlots.sort((a, b) => 
        parseInt(a.start) - parseInt(b.start)
      );
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
    toast.success(t("timeSlotAdded"));
  };

  const removeTimeSlot = (date: Date, index: number) => {
    const newSchedule = schedule.map((day) => {
      if (day.date.toDateString() === date.toDateString()) {
        return {
          ...day,
          timeSlots: day.timeSlots.filter((_, i) => i !== index),
        };
      }
      return day;
    });
    setSchedule(newSchedule.filter((day) => day.timeSlots.length > 0));
    toast.success(t("timeSlotRemoved"));
  };

  const getTimeSlotsForDate = (date: Date): TimeSlot[] => {
    const daySchedule = schedule.find(
      (day) => day.date.toDateString() === date.toDateString()
    );
    return daySchedule?.timeSlots || [];
  };

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  if (!isEditable) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{t("availability")}</h3>
        <div className="space-y-2">
          {weekDays.map((day) => (
            <div key={day} className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium">{t(day.toLowerCase())}</span>
              <span className="text-gray-300">09:00 - 22:00</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }

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
          <TimeSlotSelector
            selectedStartTime={selectedStartTime}
            selectedEndTime={selectedEndTime}
            onStartTimeChange={setSelectedStartTime}
            onEndTimeChange={setSelectedEndTime}
            onAddTimeSlot={addTimeSlot}
          />

          {selectedDate && (
            <TimeSlotList
              date={selectedDate}
              timeSlots={getTimeSlotsForDate(selectedDate)}
              onRemoveTimeSlot={(index) => removeTimeSlot(selectedDate, index)}
            />
          )}
        </div>
      </div>
    </Card>
  );
};