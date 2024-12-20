import { Json } from "@/integrations/supabase/generated.types";

export interface Profile {
  id: string;
  full_name: string;
  name: string;
  image: string;
  bio: string;
  avatar_url: string;
  banner_url: string;
  category: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: string;
  rating: number;
  reviews: number;
  languages: string[];
  spokenLanguages: string[];
  serviceCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  user_type: 'customer' | 'provider';
  interests: string[];
  occupation?: string;
  height?: string;
  weight?: string;
  services?: Service[];
  gallery?: string[];
  working_hours?: any;
  availability?: string[];
  availability_status?: string;
  audit_log?: Json[];
  body_type?: string;
  bust_size?: string;
  gender?: string;
  hair_color?: string;
  hair_length?: string;
  hair_type?: string;
  eye_color?: string;
  skin_tone?: string;
  grooming?: string;
  dress_size?: string;
  is_verified?: boolean;
  messages_count?: number;
  average_rating?: number;
  membership_level?: string;
  reviews_count?: number;
  age?: number;
}

export interface ProfileFormValues {
  fullName: string;
  bio: string;
  location: string;
  interests: string;
  occupation: string;
  height: string;
  weight: string;
  avatar?: File;
  gallery?: (File | string)[];
  gender?: string;
  dateOfBirth?: string;
  nationality?: string;
  spokenLanguages?: string[];
  preferredCommunication?: string;
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  availabilityStatus?: string;
  nickname?: string;
  serviceCategories?: string[];
  services?: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price?: number;
  category?: string;
  categories?: string[];
}

export interface ProfilesResponse {
  profiles: Profile[];
  total: number;
}

export const MAX_GALLERY_IMAGES = 10;

export const castToProfile = (data: any): Profile => {
  const priceRangeData = data.price_range as { min: number; max: number } | null;
  
  return {
    id: data.id,
    full_name: data.full_name || '',
    name: data.full_name || '',
    image: data.avatar_url || '',
    bio: data.bio || '',
    avatar_url: data.avatar_url || '',
    banner_url: data.banner_url || '',
    category: data.category || '',
    location: data.location || '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    status: data.availability_status || 'offline',
    rating: 0,
    reviews: 0,
    languages: data.languages || [],
    spokenLanguages: data.languages || [],
    serviceCategories: data.service_categories || [],
    priceRange: {
      min: priceRangeData?.min || 0,
      max: priceRangeData?.max || 0
    },
    user_type: data.user_type as 'customer' | 'provider',
    interests: Array.isArray(data.interests) ? data.interests : data.interests ? [data.interests] : [],
    age: data.age || 0,
    gender: data.gender || '',
    reviews_count: data.reviews_count || 0
  };
};

export const castToService = (data: any): Service => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    duration: data.duration,
    price: data.price,
    categories: data.categories
  };
};