import { LucideIcon } from 'lucide-react';

declare module '@/hooks/use-toast' {
  interface Toast {
    id: string;
    title?: string;
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
    icon?: LucideIcon;
  }
}