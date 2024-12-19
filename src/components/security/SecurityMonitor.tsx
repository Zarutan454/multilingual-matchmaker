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
    const channel = supabase.channel('security_monitor');

    channel
      .on('presence', { event: 'sync' }, () => {
        // Handle presence sync
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await logger.log('info', 'Security monitor initialized');
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
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
    }
  }, [user, t]);

  return null;
};