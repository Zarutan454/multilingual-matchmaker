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
  hair_color?: string;
  hair_length?: string;
  hair_type?: string;
  eye_color?: string;
  skin_tone?: string;
  grooming?: string;
  body_type?: string;
  bust_size?: string;
  dress_size?: string;
  nickname?: string;
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

export const castToProfile = (data: unknown): Profile => {
  const profile = data as any;
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
    price_range: profile.price_range || { min: 0, max: 0 },
    availability_status: profile.availability_status || 'offline',
    gallery: profile.gallery || [],
    languages: profile.languages || [],
    services: profile.services || [],
    age: profile.age || 0,
    gender: profile.gender || '',
    name: profile.full_name || '',
    image: profile.avatar_url || '',
    category: profile.category || '',
    coordinates: profile.coordinates || { lat: 0, lng: 0 },
    status: profile.availability_status || 'offline',
    rating: profile.rating || 0,
    reviews: profile.reviews || 0,
    reviews_count: profile.reviews_count || 0,
    spokenLanguages: profile.languages || [],
    serviceCategories: profile.service_categories || [],
    priceRange: profile.price_range || { min: 0, max: 0 },
    user_type: profile.user_type || 'customer',
    last_seen: profile.last_seen,
    is_verified: profile.is_verified || false,
    messages_count: profile.messages_count || 0,
    average_rating: profile.average_rating || 0,
    membership_level: profile.membership_level || 'basic',
    hair_color: profile.hair_color,
    hair_length: profile.hair_length,
    hair_type: profile.hair_type,
    eye_color: profile.eye_color,
    skin_tone: profile.skin_tone,
    grooming: profile.grooming,
    body_type: profile.body_type,
    bust_size: profile.bust_size,
    dress_size: profile.dress_size,
    nickname: profile.nickname
  };
};

export const castToService = (data: unknown): Service => {
  const service = data as any;
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    duration: service.duration,
    price: service.price,
    category: service.category,
    categories: service.categories || []
  };
};