import { Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface NotificationsCardProps {
  user: User | null;
}

export const NotificationsCard = ({ user }: NotificationsCardProps) => {
  const { t } = useLanguage();

  const { data: notifications = [], isError } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];

      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('recipient_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          // If the table doesn't exist, return empty array instead of throwing
          if (error.code === '42P01') {
            console.log('Notifications table does not exist yet');
            return [];
          }
          console.error('Error fetching notifications:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Error in notifications query:', error);
        return [];
      }
    },
    enabled: !!user,
    retry: false // Don't retry if table doesn't exist
  });

  // Don't render anything if there's an error
  if (isError) {
    return null;
  }

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#9b87f5]" />
          {t("notifications")}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {t("recentNotifications")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-400 py-4">{t("noNotifications")}</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-3 p-4 rounded-lg bg-black/30 hover:bg-[#9b87f5]/10 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-white">{notification.title}</p>
                  <p className="text-sm text-gray-400">{notification.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </span>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};