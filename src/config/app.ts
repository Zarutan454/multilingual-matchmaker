import { config } from '@/config/services';
import { Database } from '@/integrations/supabase/types';

export const appConfig = {
  name: 'My App',
  version: '1.0.0',
  database: config as Database
};