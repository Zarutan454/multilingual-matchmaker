import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { RealtimeChannel } from '@supabase/supabase-js';
import { debounce } from 'lodash';

const PRESENCE_THROTTLE = 30000; // 30 Sekunden
const PRESENCE_DEBOUNCE = 5000;  // 5 Sekunden

export const usePresence = () => {
  const { user } = useAuth();
  const channelRef = useRef<RealtimeChannel | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const updatePresence = useCallback(
    debounce(async (status: 'online' | 'offline') => {
      if (!user) return;

      const now = Date.now();
      if (status === 'online' && now - lastUpdateRef.current < PRESENCE_THROTTLE) {
        return;
      }

      try {
        await supabase
          .from('profiles')
          .update({
            availability_status: status,
            last_seen: new Date().toISOString()
          })
          .eq('id', user.id);

        lastUpdateRef.current = now;
        console.log('Presence aktualisiert:', status);
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Presence:', error);
      }
    }, PRESENCE_DEBOUNCE),
    [user]
  );

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel(`presence_${user.id}`);
    channelRef.current = channel;

    const handleVisibilityChange = () => {
      updatePresence(document.hidden ? 'offline' : 'online');
    };

    channel
      .on('presence', { event: 'sync' }, () => {
        console.log('Presence synchronisiert');
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await updatePresence('online');
        }
      });

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', () => updatePresence('offline'));

    updatePresence('online');

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      updatePresence('offline');
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, [user, updatePresence]);
};