import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Navbar } from "../components/Navbar";
import { RecentChatsCard } from "@/components/dashboard/RecentChatsCard";
import { RecentContactsCard } from "@/components/dashboard/RecentContactsCard";
import { FavoritesCard } from "@/components/dashboard/FavoritesCard";

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const displayName = user?.user_metadata?.nickname || user?.user_metadata?.full_name || user?.email;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("welcome")}, {displayName}
          </h1>
          <p className="text-gray-400">
            {t("lastLogin")}: {new Date(user?.last_sign_in_at || "").toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RecentChatsCard user={user} />
          <RecentContactsCard user={user} />
          <FavoritesCard user={user} />
        </div>
      </main>
    </div>
  );
}