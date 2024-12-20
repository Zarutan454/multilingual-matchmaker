export interface Profile {
  id: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  location: string | null;
  interests: string | null;
  occupation: string | null;
  height: string | null;
  weight: string | null;
  availability: string[] | null;
  service_categories: string[] | null;
  price_range: { min: number; max: number } | null;
  availability_status: 'online' | 'offline' | 'busy';
  gallery: string[] | null;
  languages: string[];
  services: Service[];
  age: number;
  gender?: string;
  name: string;
  image: string;
  category: string;
  coordinates: { lat: number; lng: number };
  status: string;
  rating: number;
  reviews: number;
  reviews_count?: number;
  spokenLanguages: string[];
  serviceCategories: string[];
  priceRange: { min: number; max: number };
  user_type: 'customer' | 'provider';
  last_seen: string | null;
  is_verified?: boolean;
  messages_count?: number;
  average_rating?: number;
  membership_level?: 'basic' | 'premium' | 'vip';
  working_hours?: any;
  audit_log?: any[];
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

export interface ProfileFormValues {
  fullName: string;
  bio: string;
  avatar?: File;
  location: string;
  interests: string;
  occupation: string;
  height: string;
  weight: string;
  languages: string[];
  services: Service[];
  priceRange: {
    min: number;
    max: number;
  };
  availabilityStatus: 'online' | 'offline' | 'busy';
  serviceCategories: string[];
  gender?: string;
  age?: number;
  gallery?: (string | File)[];
  dateOfBirth?: string;
  nationality?: string;
  spokenLanguages?: string[];
  preferredCommunication?: string;
  nickname?: string;
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
}

export interface ProfilesResponse {
  profiles: Profile[];
  total: number;
}

export const MAX_GALLERY_IMAGES = 10;

export const castToProfile = (data: any): Profile => {
  return {
    id: data.id,
    full_name: data.full_name || '',
    bio: data.bio || '',
    avatar_url: data.avatar_url || '',
    banner_url: data.banner_url || '',
    location: data.location || '',
    interests: data.interests || '',
    occupation: data.occupation || '',
    height: data.height || '',
    weight: data.weight || '',
    availability: data.availability || [],
    service_categories: data.service_categories || [],
    price_range: data.price_range || { min: 0, max: 0 },
    availability_status: data.availability_status || 'offline',
    gallery: data.gallery || [],
    languages: data.languages || [],
    services: data.services || [],
    age: data.age || 0,
    gender: data.gender || '',
    name: data.full_name || '',
    image: data.avatar_url || '',
    category: data.category || '',
    coordinates: data.coordinates || { lat: 0, lng: 0 },
    status: data.availability_status || 'offline',
    rating: data.rating || 0,
    reviews: data.reviews || 0,
    reviews_count: data.reviews_count || 0,
    spokenLanguages: data.languages || [],
    serviceCategories: data.service_categories || [],
    priceRange: data.price_range || { min: 0, max: 0 },
    user_type: data.user_type || 'customer',
    last_seen: data.last_seen,
    is_verified: data.is_verified || false,
    messages_count: data.messages_count || 0,
    average_rating: data.average_rating || 0,
    membership_level: data.membership_level || 'basic',
    hair_color: data.hair_color,
    hair_length: data.hair_length,
    hair_type: data.hair_type,
    eye_color: data.eye_color,
    skin_tone: data.skin_tone,
    grooming: data.grooming,
    body_type: data.body_type,
    bust_size: data.bust_size,
    dress_size: data.dress_size,
    nickname: data.nickname
  };
};

export const castToService = (data: any): Service => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    duration: data.duration,
    price: data.price,
    category: data.category,
    categories: data.categories || []
  };
};
