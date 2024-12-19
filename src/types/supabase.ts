import { Database } from '@/integrations/supabase/types';

export type Tables = Database['public']['Tables'];
export type TableRow<T extends keyof Tables> = Tables[T]['Row'];
export type TableInsert<T extends keyof Tables> = Tables[T]['Insert'];
export type TableUpdate<T extends keyof Tables> = Tables[T]['Update'];

export type ProfileRow = TableRow<'profiles'>;
export type ProfileInsert = TableInsert<'profiles'>;
export type ProfileUpdate = TableUpdate<'profiles'>;

export type BlogPostRow = TableRow<'blog_posts'>;
export type BlogPostInsert = TableInsert<'blog_posts'>;
export type BlogPostUpdate = TableUpdate<'blog_posts'>;

export type NewsItemRow = TableRow<'news_items'>;
export type NewsItemInsert = TableInsert<'news_items'>;
export type NewsItemUpdate = TableUpdate<'news_items'>;

export type ServiceRow = TableRow<'services'>;
export type ServiceInsert = TableInsert<'services'>;
export type ServiceUpdate = TableUpdate<'services'>;

export type RatingRow = TableRow<'ratings'>;
export type RatingInsert = TableInsert<'ratings'>;
export type RatingUpdate = TableUpdate<'ratings'>;

export type MessageRow = TableRow<'messages'>;
export type MessageInsert = TableInsert<'messages'>;
export type MessageUpdate = TableUpdate<'messages'>;

export type NotificationRow = TableRow<'notifications'>;
export type NotificationInsert = TableInsert<'notifications'>;
export type NotificationUpdate = TableUpdate<'notifications'>;

export type SystemLogRow = TableRow<'system_logs'>;
export type SystemLogInsert = TableInsert<'system_logs'>;
export type SystemLogUpdate = TableUpdate<'system_logs'>;