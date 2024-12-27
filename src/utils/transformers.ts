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
    rating: Number(row.rating) || 0,
    reviews: Number(row.reviews) || 0,
    languages: row.languages || [],
    spokenLanguages: row.languages || [],
    serviceCategories: row.service_categories || [],
    priceRange: {
      min: priceRangeData?.min || 0,
      max: priceRangeData?.max || 0
    },
    user_type: (row.user_type as 'customer' | 'provider') || 'customer',
    interests: Array.isArray(row.interests) ? row.interests : row.interests ? [row.interests] : [],
    membership_level: (row.membership_level as Profile['membership_level']) || 'basic'
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