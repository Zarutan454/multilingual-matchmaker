import { Profile } from '@/types/profile/types';
import { ProfileRow } from '@/types/profile/supabaseTypes';

export const transformProfile = (profile: ProfileRow): Profile => {
  const priceRangeData = profile.price_range as { min: number; max: number } | null;

  return {
    id: profile.id,
    name: profile.full_name || '',
    image: profile.avatar_url || '',
    bio: profile.bio || '',
    avatar_url: profile.avatar_url || '',
    banner_url: profile.banner_url || '',
    category: profile.category || '',
    location: profile.location || '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    status: profile.availability_status || 'offline',
    rating: 0,
    reviews: 0,
    languages: profile.languages || [],
    spokenLanguages: profile.languages || [],
    serviceCategories: profile.service_categories || [],
    priceRange: {
      min: priceRangeData?.min || 0,
      max: priceRangeData?.max || 0
    },
    user_type: profile.user_type as 'customer' | 'provider',
    contact_info: {
      phone: profile.phone || '',
      email: profile.email || ''
    },
    service_info: {
      categories: profile.service_categories || [],
      description: profile.bio || '',
      pricing: {
        hourly: priceRangeData?.min || 0,
      },
      availability: {
        days: profile.availability || [],
        hours: ''
      }
    },
    verification_status: 'pending',
    age: profile.age || 0
  };
};