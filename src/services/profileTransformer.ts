import { Profile } from '@/types/profile/types';
import { ProfileRow } from '@/types/profile/supabaseTypes';

export function transformProfile(profile: ProfileRow): Profile {
  const priceRangeData = profile.price_range as { min: number; max: number } | null;
  
  return {
    id: profile.id,
    full_name: profile.full_name || '',
    name: profile.full_name || '',
    image: profile.avatar_url || '',
    bio: profile.bio || '',
    avatar_url: profile.avatar_url || '',
    banner_url: profile.banner_url || '',
    location: profile.location || '',
    interests: profile.interests ? [profile.interests] : [],
    occupation: profile.occupation || '',
    height: profile.height || '',
    weight: profile.weight || '',
    availability: profile.availability || [],
    serviceCategories: profile.service_categories || [],
    priceRange: {
      min: priceRangeData?.min || 0,
      max: priceRangeData?.max || 0
    },
    category: profile.category || '',
    coordinates: { lat: 0, lng: 0 },
    status: profile.availability_status || 'offline',
    rating: 0,
    reviews: 0,
    languages: profile.languages || [],
    spokenLanguages: profile.languages || [],
    age: Number(profile.age) || 0,
    user_type: (profile.user_type as 'customer' | 'provider') || 'customer',
    membership_level: profile.membership_level || 'basic'
  };
}