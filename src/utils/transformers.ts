import { Database } from '@/integrations/supabase/types';
import { Profile, Service, Message, Notification, LogEntry } from '@/types/profile';
import { BlogPost, NewsItem } from '@/types/cms';
import { Rating } from '@/types/ratings';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type MessageRow = Database['public']['Tables']['messages']['Row'];

export function transformProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    full_name: row.full_name || '',
    bio: row.bio || '',
    avatar_url: row.avatar_url || '',
    banner_url: row.banner_url || '',
    location: row.location || '',
    interests: row.interests || '',
    occupation: row.occupation || '',
    height: row.height || '',
    weight: row.weight || '',
    availability: row.availability || [],
    service_categories: row.service_categories || [],
    price_range: row.price_range || { min: 0, max: 0 },
    availability_status: row.availability_status || 'offline',
    gallery: row.gallery || [],
    languages: row.languages || [],
    age: row.age || 0,
    gender: row.gender || '',
    user_type: row.user_type || 'customer',
    last_seen: row.last_seen,
    is_verified: false,
    messages_count: 0,
    average_rating: 0,
    membership_level: 'basic'
  };
}

export function transformMessage(row: MessageRow): Message {
  return {
    id: row.id,
    content: row.content,
    created_at: row.created_at || null,
    read: row.read || false,
    recipient: row.recipient || '',
    sender: row.sender || ''
  };
}