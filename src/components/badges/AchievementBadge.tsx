import { Badge } from "@/components/ui/badge";
import { Trophy, Shield, MessageCircle, UserCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type AchievementType = 
  | "verified"
  | "messages"
  | "ratings"
  | "premium"
  | "vip";

interface AchievementBadgeProps {
  type: AchievementType;
  level?: number;
  className?: string;
}

const BADGE_CONFIG = {
  verified: {
    icon: UserCheck,
    label: "Verifiziert",
    color: "bg-green-500"
  },
  messages: {
    icon: MessageCircle,
    label: "Kommunikator",
    color: "bg-blue-500"
  },
  ratings: {
    icon: Star,
    label: "Top Bewertet",
    color: "bg-yellow-500"
  },
  premium: {
    icon: Shield,
    label: "Premium",
    color: "bg-purple-500"
  },
  vip: {
    icon: Trophy,
    label: "VIP",
    color: "bg-gold-500"
  }
};

export const AchievementBadge = ({ type, level, className }: AchievementBadgeProps) => {
  const config = BADGE_CONFIG[type];
  const Icon = config.icon;

  return (
    <Badge 
      className={cn(
        "flex items-center gap-1 px-2 py-1",
        config.color,
        className
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{config.label}</span>
      {level && <span className="ml-1">{level}</span>}
    </Badge>
  );
};