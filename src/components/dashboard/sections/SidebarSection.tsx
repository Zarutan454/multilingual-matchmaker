import { FavoritesCard } from "../FavoritesCard";
import { RecentChatsCard } from "../RecentChatsCard";
import { User } from "@supabase/supabase-js";

interface SidebarSectionProps {
  user: User | null;
}

export const SidebarSection = ({ user }: SidebarSectionProps) => {
  return (
    <div className="space-y-8">
      <FavoritesCard />
      <RecentChatsCard user={user} />
    </div>
  );
};