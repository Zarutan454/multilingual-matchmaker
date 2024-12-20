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
    interests: profile.interests || '',
    occupation: profile.occupation || '',
    height: profile.height || '',
    weight: profile.weight || '',
    availability: profile.availability || [],
    service_categories: profile.service_categories || [],
    price_range: profile.price_range ? {
      min: typeof profile.price_range === 'object' ? (profile.price_range as any).min || 0 : 0,
      max: typeof profile.price_range === 'object' ? (profile.price_range as any).max || 0 : 0
    } : { min: 0, max: 0 },
    availability_status: (profile.availability_status as 'online' | 'offline' | 'busy') || 'offline',
    gallery: profile.gallery || [],
    languages: profile.languages || [],
    services: profile.services || [],
    age: profile.age || 0,
    gender: profile.gender || '',
    name: profile.full_name || '',
    image: profile.avatar_url || '',
    category: profile.category || '',
    coordinates: { lat: 0, lng: 0 },
    status: profile.availability_status || 'offline',
    rating: profile.rating || 0,
    reviews: profile.reviews || 0,
    reviews_count: profile.reviews_count || 0,
    spokenLanguages: profile.languages || [],
    serviceCategories: profile.service_categories || [],
    priceRange: profile.price_range ? {
      min: typeof profile.price_range === 'object' ? (profile.price_range as any).min || 0 : 0,
      max: typeof profile.price_range === 'object' ? (profile.price_range as any).max || 0 : 0
    } : { min: 0, max: 0 },
    user_type: profile.user_type as 'customer' | 'provider',
    last_seen: profile.last_seen,
    is_verified: profile.is_verified || false,
    messages_count: 0,
    average_rating: 0,
    membership_level: profile.membership_level || 'basic',
    hair_color: profile.hair_color || null,
    hair_length: profile.hair_length || null,
    hair_type: profile.hair_type || null,
    eye_color: profile.eye_color || null,
    skin_tone: profile.skin_tone || null,
    grooming: profile.grooming || null,
    body_type: profile.body_type || null,
    bust_size: profile.bust_size || null,
    dress_size: profile.dress_size || null,
    nickname: profile.nickname || null
  };
}