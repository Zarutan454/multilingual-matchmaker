import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { logger } from '@/utils/logger';
import { debounce } from 'lodash';

export const SecurityMonitor = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (!user) return;

    const updateLastSeen = debounce(async () => {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ 
            last_seen: new Date().toISOString(),
            availability_status: document.hidden ? 'offline' : 'online'
          })
          .eq('id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error updating last seen:', error);
      }
    }, 5000); // Debounce für 5 Sekunden

    const handleVisibilityChange = () => {
      updateLastSeen();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    updateLastSeen(); // Initial update

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      updateLastSeen.cancel();
    };
  }, [user]);

  return null;
};