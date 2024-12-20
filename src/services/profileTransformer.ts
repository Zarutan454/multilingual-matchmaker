import { Profile } from '@/types/profile/types';
import { ProfileRow } from '@/types/profile/supabaseTypes';

export function transformProfile(profile: ProfileRow): Profile {
  return {
    id: profile.id,
    full_name: profile.full_name || '',
    bio: profile.bio || '',
    avatar_url: profile.avatar_url || '',
    banner_url: profile.banner_url || '',
    location: profile.location || '',
    interests: profile.interests || null,
    occupation: profile.occupation || null,
    height: profile.height || null,
    weight: profile.weight || null,
    availability: profile.availability || [],
    service_categories: profile.service_categories || [],
    price_range: profile.price_range ? {
      min: typeof profile.price_range === 'object' ? (profile.price_range as any).min || 0 : 0,
      max: typeof profile.price_range === 'object' ? (profile.price_range as any).max || 0 : 0
    } : { min: 0, max: 0 },
    availability_status: (profile.availability_status as 'online' | 'offline' | 'busy') || 'offline',
    gallery: profile.gallery || [],
    languages: profile.languages || [],
    age: profile.age || 0,
    gender: profile.gender || '',
    name: profile.full_name || '',
    image: profile.avatar_url || '',
    category: profile.category || '',
    coordinates: profile.coordinates || { lat: 0, lng: 0 },
    status: profile.availability_status || 'offline',
    rating: profile.rating || 0,
    reviews: profile.reviews || 0,
    spokenLanguages: profile.languages || [],
    serviceCategories: profile.service_categories || [],
    priceRange: profile.price_range ? {
      min: typeof profile.price_range === 'object' ? (profile.price_range as any).min || 0 : 0,
      max: typeof profile.price_range === 'object' ? (profile.price_range as any).max || 0 : 0
    } : { min: 0, max: 0 },
    user_type: (profile.user_type as 'customer' | 'provider') || 'customer',
    last_seen: profile.last_seen,
    is_verified: false,
    messages_count: 0,
    average_rating: 0,
    membership_level: profile.membership_level || 'basic'
  };
}