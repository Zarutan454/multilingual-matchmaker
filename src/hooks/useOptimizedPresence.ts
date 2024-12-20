import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useOptimizedPresence = () => {
  const { user } = useAuth();
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!user) return;

    const updatePresence = async () => {
      try {
        await supabase
          .from('profiles')
          .update({
            availability_status: 'online',
            last_seen: new Date().toISOString()
          })
          .eq('id', user.id);

        console.log('Presence updated successfully');
      } catch (error) {
        console.error('Error updating presence:', error);
      }
    };

    const channel = supabase.channel("presence_"+user.id);
    channelRef.current = channel;

    channel
      .on('presence', { event: 'sync' }, () => {
        console.log('Presence synced');
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('Presence join:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('Presence leave:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await updatePresence();
        }
      });

    const interval = setInterval(updatePresence, 30000);

    return () => {
      clearInterval(interval);
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }

      const cleanup = async () => {
        try {
          await supabase
            .from('profiles')
            .update({
              availability_status: 'offline',
              last_seen: new Date().toISOString()
            })
            .eq('id', user.id);
          console.log('Presence cleanup successful');
        } catch (error) {
          console.error('Error in presence cleanup:', error);
        }
      };

      cleanup();
    };
  }, [user]);
};