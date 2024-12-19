import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { logger } from '@/utils/logger';

export const SecurityMonitor = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    let isSubscribed = true;
    const abortController = new AbortController();

    const channel = supabase.channel('security_monitor', {
      config: {
        broadcast: { self: true },
        presence: {
          key: user?.id,
        },
      },
    });

    const initializeMonitor = async () => {
      try {
        if (!isSubscribed) return;

        channel
          .on('presence', { event: 'sync' }, () => {
            if (!isSubscribed) return;
            // Handle presence sync
          })
          .subscribe(async (status) => {
            if (!isSubscribed) return;

            if (status === 'SUBSCRIBED') {
              await logger.info('Security monitor initialized');
            } else if (status === 'CLOSED') {
              await logger.warn('Security monitor connection closed');
            } else if (status === 'CHANNEL_ERROR') {
              await logger.error('Security monitor channel error');
              toast.error(t('errorSecurityMonitor'));
            }
          });

      } catch (error) {
        if (!isSubscribed) return;
        console.error('Security monitor initialization error:', error);
        toast.error(t('errorSecurityMonitor'));
      }
    };

    initializeMonitor();

    // Cleanup function
    return () => {
      isSubscribed = false;
      abortController.abort();
      channel.unsubscribe();
    };
  }, [user, t]);

  useEffect(() => {
    if (!user) return;

    const updateLastSeen = async () => {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ last_seen: new Date().toISOString() })
          .eq('id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error updating last seen:', error);
        toast.error(t('errorUpdatingLastSeen'));
      }
    };

    updateLastSeen();
  }, [user, t]);

  return null;
};