export interface Message {
  id: string;
  content: string;
  created_at: string | null;
  read: boolean | null;
  recipient: string | null;
  sender: string | null;
}