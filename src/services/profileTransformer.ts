import { Profile } from '@/types/profile/types';
import { ProfileRow } from '@/types/profile/supabaseTypes';

export const transformProfile = (profile: ProfileRow): Profile => {
  const priceRangeData = profile.price_range as { min: number; max: number } | null;
  
  return {
    id: profile.id,
    full_name: profile.full_name || '',
    bio: profile.bio || '',
    avatar_url: profile.avatar_url || '',
    banner_url: profile.banner_url || '',
    category: profile.category || '',
    location: profile.location || '',
    interests: profile.interests || '',
    occupation: profile.occupation || '',
    height: profile.height || '',
    weight: profile.weight || '',
    availability: profile.availability || [],
    service_categories: profile.service_categories || [],
    price_range: priceRangeData || { min: 0, max: 0 },
    availability_status: profile.availability_status as 'online' | 'offline' | 'busy' || 'offline',
    gallery: profile.gallery || [],
    languages: profile.languages || [],
    age: profile.age || 0,
    gender: profile.gender || '',
    user_type: profile.user_type as 'customer' | 'provider' || 'customer',
    last_seen: profile.last_seen,
    coordinates: {
      lat: 0,
      lng: 0
    },
    status: profile.availability_status || 'offline',
    rating: 0,
    reviews: 0,
    spokenLanguages: profile.languages || [],
    serviceCategories: profile.service_categories || [],
    is_verified: profile.is_verified || false,
    messages_count: 0,
    average_rating: 0,
    membership_level: 'basic'
  };
};