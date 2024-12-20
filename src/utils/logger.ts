import { supabase } from '@/lib/supabase';

export const logger = {
  error: async (message: string, metadata?: any) => {
    console.error(message, metadata);
    try {
      await supabase.from('system_logs').insert({
        level: 'error',
        message,
        metadata
      });
    } catch (error) {
      console.error('Failed to log error:', error);
    }
  },
  
  info: async (message: string, metadata?: any) => {
    console.info(message, metadata);
    try {
      await supabase.from('system_logs').insert({
        level: 'info',
        message,
        metadata
      });
    } catch (error) {
      console.error('Failed to log info:', error);
    }
  }
};