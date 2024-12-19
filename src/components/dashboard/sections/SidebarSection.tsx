import { FavoritesCard } from "../FavoritesCard";
import { RecentChatsCard } from "../RecentChatsCard";
import { NotificationsCard } from "../NotificationsCard";
import { User } from "@supabase/supabase-js";

interface SidebarSectionProps {
  user: User | null;
}

export const SidebarSection = ({ user }: SidebarSectionProps) => {
  return (
    <div className="space-y-8">
      <NotificationsCard user={user} />
      <FavoritesCard />
      <RecentChatsCard user={user} />
    </div>
  );
};