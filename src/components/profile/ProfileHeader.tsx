import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Shield } from "lucide-react";

export const ProfileHeader = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="bg-black/80 backdrop-blur-md rounded-lg p-8 mb-6 max-w-md w-full text-center border border-[#FFD700]/30 shadow-[0_0_15px_rgba(218,165,32,0.3)]">
      <Shield className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
      <div className="flex flex-col items-center gap-6">
        <Avatar className="h-24 w-24 border-2 border-[#FFD700]/30">
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-black/50 text-white">{user?.email?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">{user?.user_metadata?.full_name || user?.email}</h1>
          <p className="text-[#FFD700]/80">{t("memberSince")}: {new Date(user?.created_at || "").toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};