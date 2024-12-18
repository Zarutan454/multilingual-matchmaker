import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useOptimizedPresence = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel('optimized_presence');
    let presenceTimeout: NodeJS.Timeout;

    const updatePresence = async () => {
      try {
        await supabase
          .from('profiles')
          .update({
            last_seen: new Date().toISOString(),
            availability_status: 'online'
          })
          .eq('id', user.id);
      } catch (error) {
        console.error('Error updating presence:', error);
      }
    };

    const setupPresence = async () => {
      try {
        await channel.subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await updatePresence();
            // Update presence every 30 seconds
            presenceTimeout = setInterval(updatePresence, 30000);
          }
        });
      } catch (error) {
        console.error('Error setting up presence:', error);
        toast.error('Fehler bei der Verbindung');
      }
    };

    setupPresence();

    return () => {
      clearInterval(presenceTimeout);
      channel.unsubscribe();
    };
  }, [user]);
};