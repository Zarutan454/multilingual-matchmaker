export interface Notification {
  id: string;
  recipient_id?: string;
  title: string;
  message: string;
  read: boolean;
  created_at?: string;
}