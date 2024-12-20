import { Database } from '@/integrations/supabase/types';
import { Profile, Service } from '@/types/profile';
import { Message } from '@/types/messages';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type MessageRow = Database['public']['Tables']['messages']['Row'];

export function transformProfile(row: ProfileRow): Profile {
  const priceRangeData = row.price_range as { min: number; max: number } | null;
  
  return {
    id: row.id,
    full_name: row.full_name || '',
    name: row.full_name || '',
    image: row.avatar_url || '',
    bio: row.bio || '',
    avatar_url: row.avatar_url || '',
    banner_url: row.banner_url || '',
    location: row.location || '',
    category: row.category || '',
    coordinates: { lat: 0, lng: 0 },
    status: row.availability_status || 'offline',
    rating: 0,
    reviews: 0,
    languages: row.languages || [],
    spokenLanguages: row.languages || [],
    serviceCategories: row.service_categories || [],
    priceRange: {
      min: priceRangeData?.min || 0,
      max: priceRangeData?.max || 0
    },
    user_type: (row.user_type as 'customer' | 'provider') || 'customer',
    interests: Array.isArray(row.interests) ? row.interests : row.interests ? [row.interests] : [],
    price_range: row.price_range as { min: number; max: number } || { min: 0, max: 0 },
    is_verified: row.is_verified || false,
    reviews_count: 0,
    age: row.age || 0,
    measurements: row.measurements || null,
    rates: row.rates || null,
    role: row.role || '',
    likes_count: row.likes_count || 0,
    services_offered: row.services_offered || [],
    verification_status: row.verification_status || ''
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