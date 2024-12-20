import { Database } from '@/integrations/supabase/types';
import { Profile, Service } from '@/types/profile';
import { Message } from '@/types/messages';

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
    price_range: row.price_range ? {
      min: typeof row.price_range === 'object' ? (row.price_range as any).min || 0 : 0,
      max: typeof row.price_range === 'object' ? (row.price_range as any).max || 0 : 0
    } : { min: 0, max: 0 },
    availability_status: (row.availability_status as 'online' | 'offline' | 'busy') || 'offline',
    gallery: row.gallery || [],
    languages: row.languages || [],
    services: [],
    age: row.age || 0,
    gender: row.gender || '',
    name: row.full_name || '',
    image: row.avatar_url || '',
    category: row.category || '',
    coordinates: { lat: 0, lng: 0 },
    status: row.availability_status || 'offline',
    rating: 0,
    reviews: 0,
    reviews_count: 0,
    spokenLanguages: row.languages || [],
    serviceCategories: row.service_categories || [],
    priceRange: row.price_range ? {
      min: typeof row.price_range === 'object' ? (row.price_range as any).min || 0 : 0,
      max: typeof row.price_range === 'object' ? (row.price_range as any).max || 0 : 0
    } : { min: 0, max: 0 },
    user_type: (row.user_type as 'customer' | 'provider') || 'customer',
    last_seen: row.last_seen,
    is_verified: false,
    messages_count: 0,
    average_rating: 0,
    membership_level: 'basic',
    hair_color: null,
    hair_length: null,
    hair_type: null,
    eye_color: null,
    skin_tone: null,
    grooming: null,
    body_type: null,
    bust_size: null,
    dress_size: null,
    nickname: null
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