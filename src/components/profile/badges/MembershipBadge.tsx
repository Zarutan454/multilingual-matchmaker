import { Badge } from "@/components/ui/badge";
import { Medal, Crown, Sparkles } from "lucide-react";

interface MembershipBadgeProps {
  level: 'bronze' | 'silver' | 'gold' | 'vip';
}

export const MembershipBadge = ({ level }: MembershipBadgeProps) => {
  const badges = {
    bronze: {
      icon: <Medal className="w-4 h-4 animate-pulse" />,
      text: "Bronze",
      className: "bg-gradient-to-r from-[#CD7F32]/20 via-[#8B4513]/30 to-[#CD7F32]/20 text-[#CD7F32] border-[#CD7F32]/50 hover:from-[#CD7F32]/30 hover:via-[#8B4513]/40 hover:to-[#CD7F32]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(205,127,50,0.3)]"
    },
    silver: {
      icon: <Medal className="w-4 h-4 animate-pulse" />,
      text: "Silber",
      className: "bg-gradient-to-r from-[#C0C0C0]/20 via-[#E8E8E8]/30 to-[#C0C0C0]/20 text-[#C0C0C0] border-[#C0C0C0]/50 hover:from-[#C0C0C0]/30 hover:via-[#E8E8E8]/40 hover:to-[#C0C0C0]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(192,192,192,0.3)]"
    },
    gold: {
      icon: <Crown className="w-4 h-4 animate-pulse" />,
      text: "Gold",
      className: "bg-gradient-to-r from-[#FFD700]/20 via-[#FDB931]/30 to-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/50 hover:from-[#FFD700]/30 hover:via-[#FDB931]/40 hover:to-[#FFD700]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]"
    },
    vip: {
      icon: <Sparkles className="w-4 h-4 animate-pulse" />,
      text: "VIP",
      className: "bg-gradient-to-r from-[#8B008B]/20 via-[#800080]/30 to-[#8B008B]/20 text-[#8B008B] border-[#8B008B]/50 hover:from-[#8B008B]/30 hover:via-[#800080]/40 hover:to-[#8B008B]/30 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(139,0,139,0.3)]"
    }
  };

  const badge = badges[level];

  return (
    <Badge 
      className={`flex items-center gap-2 px-3 py-1 font-semibold backdrop-blur-sm border animate-float ${badge.className}`}
    >
      {badge.icon}
      {badge.text}
    </Badge>
  );
};