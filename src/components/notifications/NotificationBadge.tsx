import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";

export const NotificationBadge = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('recipient_id', user.id)
        .eq('read', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const markAsRead = async (notificationId: string) => {
    if (!user) return;

    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500"
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="font-semibold mb-2">{t("notifications")}</h3>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              {t("noNotifications")}
            </p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-2 hover:bg-accent rounded-lg cursor-pointer"
                  onClick={() => markAsRead(notification.id)}
                >
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};