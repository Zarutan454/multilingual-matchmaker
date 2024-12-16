import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const usePresence = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Create a presence channel for the user
    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    const updateUserStatus = async (status: 'online' | 'offline') => {
      try {
        await supabase
          .from('profiles')
          .update({
            availability_status: status,
            last_seen: new Date().toISOString(),
          })
          .eq('id', user.id);
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    };

    // Subscribe to presence events
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        console.log('Presence state:', state);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track user's presence
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
          await updateUserStatus('online');
        }
      });

    // Handle page visibility changes
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        await updateUserStatus('offline');
      } else {
        await updateUserStatus('online');
      }
    };

    // Handle page unload
    const handleBeforeUnload = async () => {
      await updateUserStatus('offline');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      channel.unsubscribe();
    };
  }, [user]);
};