import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const usePresence = () => {
  const { user } = useAuth();
  const lastUpdateRef = useRef<number>(0);
  const PRESENCE_THROTTLE = 30000; // 30 Sekunden

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    const updateUserStatus = async (status: 'online' | 'offline') => {
      const now = Date.now();
      if (now - lastUpdateRef.current < PRESENCE_THROTTLE && status === 'online') {
        return; // Überspringe Update wenn zu früh
      }
      
      try {
        await supabase
          .from('profiles')
          .update({
            availability_status: status,
            last_seen: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        lastUpdateRef.current = now;
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateUserStatus('offline');
      } else {
        updateUserStatus('online');
      }
    };

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        console.log('Presence state:', state);
      })
      .on('presence', { event: 'join' }, () => {
        updateUserStatus('online');
      })
      .on('presence', { event: 'leave' }, () => {
        updateUserStatus('offline');
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
          await updateUserStatus('online');
        }
      });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      updateUserStatus('offline');
      channel.unsubscribe();
    };
  }, [user]);
};