import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from "lucide-react";

interface TimeSlot {
  start: string;
  end: string;
}

interface TimeSlotListProps {
  date: Date;
  timeSlots: TimeSlot[];
  onRemoveTimeSlot: (index: number) => void;
}

export const TimeSlotList = ({ date, timeSlots, onRemoveTimeSlot }: TimeSlotListProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2">
        {date.toLocaleDateString()}
      </h4>
      <div className="space-y-2">
        {timeSlots.map((slot, index) => (
          <div key={index} className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              {slot.start} - {slot.end}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveTimeSlot(index)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};