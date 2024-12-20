import { Profile } from '@/types/profile/types';
import { ProfileRow } from '@/types/profile/supabaseTypes';

export function transformProfile(profile: ProfileRow): Profile {
  return {
    id: profile.id,
    full_name: profile.full_name || '',
    name: profile.full_name || '',
    image: profile.avatar_url || '',
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
    services: [],
    age: profile.age || 0,
    gender: profile.gender || '',
    category: profile.category || '',
    coordinates: { lat: 0, lng: 0 },
    status: profile.availability_status || 'offline',
    rating: 0,
    reviews: 0,
    reviews_count: 0,
    spokenLanguages: profile.languages || [],
    serviceCategories: profile.service_categories || [],
    priceRange: {
      min: typeof profile.price_range === 'object' ? (profile.price_range as any)?.min || 0 : 0,
      max: typeof profile.price_range === 'object' ? (profile.price_range as any)?.max || 0 : 0
    }
  };
}