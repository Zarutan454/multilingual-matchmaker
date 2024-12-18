import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useOptimizedPresence = () => {
  const { user } = useAuth();
  const presenceRef = useRef<NodeJS.Timeout>();
  const channelRef = useRef<any>();

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel('optimized_presence');
    channelRef.current = channel;

    const updatePresence = async () => {
      try {
        const now = new Date().toISOString();
        await supabase
          .from('profiles')
          .update({
            last_seen: now,
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
            // Update presence alle 30 Sekunden
            presenceRef.current = setInterval(updatePresence, 30000);
          }
        });
      } catch (error) {
        console.error('Error setting up presence:', error);
        toast.error('Fehler bei der Verbindung');
      }
    };

    setupPresence();

    // Cleanup-Funktion
    return () => {
      if (presenceRef.current) {
        clearInterval(presenceRef.current);
      }
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
      // Setze Status auf offline beim Verlassen
      Promise.resolve(
        supabase
          .from('profiles')
          .update({
            availability_status: 'offline',
            last_seen: new Date().toISOString()
          })
          .eq('id', user.id)
      ).then(() => {
        console.log('Presence cleanup successful');
      }).catch((error) => {
        console.error('Error in presence cleanup:', error);
      });
    };
  }, [user]);
};