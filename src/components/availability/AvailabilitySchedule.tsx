import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { TimeSlotList } from "./TimeSlotList";
import { Button } from "../ui/button";
import { Edit2, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  day: string;
  timeSlots: TimeSlot[];
}

interface AvailabilityScheduleProps {
  isEditable?: boolean;
  profileId?: string;
}

export const AvailabilitySchedule = ({ isEditable = false, profileId }: AvailabilityScheduleProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>(
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => ({
      day,
      timeSlots: [{ start: "09:00", end: "22:00" }]
    }))
  );

  const canEdit = isEditable && user?.id === profileId;

  const handleTimeChange = (day: string, index: number, type: 'start' | 'end', value: string) => {
    setWeeklySchedule(prev => prev.map(schedule => {
      if (schedule.day === day) {
        const newTimeSlots = [...schedule.timeSlots];
        newTimeSlots[index] = {
          ...newTimeSlots[index],
          [type]: value
        };
        return { ...schedule, timeSlots: newTimeSlots };
      }
      return schedule;
    }));
  };

  const saveSchedule = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          working_hours: weeklySchedule.reduce((acc, { day, timeSlots }) => ({
            ...acc,
            [day.toLowerCase()]: timeSlots.map(slot => `${slot.start}-${slot.end}`)
          }), {})
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success(t("scheduleUpdated"));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast.error(t("errorSavingSchedule"));
    }
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  if (!canEdit) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{t("availability")}</h3>
        <div className="space-y-2">
          {weeklySchedule.map(({ day, timeSlots }) => (
            <div key={day} className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="font-medium">{t(day.toLowerCase())}</span>
              <span className="text-gray-300">
                {timeSlots.map((slot, index) => (
                  <span key={index}>
                    {slot.start} - {slot.end}
                    {index < timeSlots.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{t("availability")}</h3>
        {isEditing ? (
          <Button onClick={saveSchedule} variant="secondary">
            <Save className="w-4 h-4 mr-2" />
            {t("save")}
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="secondary">
            <Edit2 className="w-4 h-4 mr-2" />
            {t("edit")}
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {weeklySchedule.map(({ day, timeSlots }) => (
          <div key={day} className="space-y-2">
            <h4 className="font-medium">{t(day.toLowerCase())}</h4>
            {timeSlots.map((slot, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">{t("startTime")}</label>
                  <Select
                    value={slot.start}
                    onValueChange={(value) => handleTimeChange(day, index, 'start', value)}
                    disabled={!isEditing}
                  >
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
                <div>
                  <label className="text-sm text-gray-400">{t("endTime")}</label>
                  <Select
                    value={slot.end}
                    onValueChange={(value) => handleTimeChange(day, index, 'end', value)}
                    disabled={!isEditing}
                  >
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
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};