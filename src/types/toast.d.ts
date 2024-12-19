import { ReactNode } from 'react';
import { Toast as ShadcnToast } from '@/components/ui/toast';

declare module '@/hooks/use-toast' {
  interface Toast extends ShadcnToast {
    icon?: ReactNode;
  }
}