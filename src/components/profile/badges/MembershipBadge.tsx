import { Badge } from "@/components/ui/badge";
import { Medal, Crown } from "lucide-react";

interface MembershipBadgeProps {
  level: 'bronze' | 'silver' | 'gold' | 'vip';
}

export const MembershipBadge = ({ level }: MembershipBadgeProps) => {
  const badges = {
    bronze: {
      icon: <Medal className="w-4 h-4 text-[#CD7F32]" />,
      text: "Bronze",
      className: "bg-gradient-to-r from-[#CD7F32]/20 to-[#CD7F32]/40 text-[#CD7F32] border-[#CD7F32]/50"
    },
    silver: {
      icon: <Medal className="w-4 h-4 text-[#C0C0C0]" />,
      text: "Silber",
      className: "bg-gradient-to-r from-[#C0C0C0]/20 to-[#C0C0C0]/40 text-[#C0C0C0] border-[#C0C0C0]/50"
    },
    gold: {
      icon: <Medal className="w-4 h-4 text-[#FFD700]" />,
      text: "Gold",
      className: "bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/40 text-[#FFD700] border-[#FFD700]/50"
    },
    vip: {
      icon: <Crown className="w-4 h-4 text-[#8B008B]" />,
      text: "VIP",
      className: "bg-gradient-to-r from-[#8B008B]/20 to-[#8B008B]/40 text-[#8B008B] border-[#8B008B]/50"
    }
  };

  const badge = badges[level];

  return (
    <Badge 
      className={`flex items-center gap-2 px-3 py-1 font-semibold backdrop-blur-sm border ${badge.className}`}
    >
      {badge.icon}
      {badge.text}
    </Badge>
  );
};