import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const ProfileHeader = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{user?.user_metadata?.full_name || user?.email}</h1>
          <p className="text-gray-600">{t("memberSince")}: {new Date(user?.created_at || "").toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};