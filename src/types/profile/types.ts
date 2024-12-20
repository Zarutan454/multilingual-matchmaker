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
  price_range: {
    min: number;
    max: number;
  } | null;
  availability_status: 'online' | 'offline' | 'busy';
  gallery: string[] | null;
  languages: string[] | null;
  services?: Service[];
  age?: number;
  gender?: string;
  name?: string;
  image?: string;
  category?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  status?: string;
  rating?: number;
  reviews?: number;
  spokenLanguages?: string[];
  serviceCategories?: string[];
  user_type: 'customer' | 'provider';
  last_seen: string | null;
  is_verified?: boolean;
  messages_count?: number;
  average_rating?: number;
  membership_level?: 'basic' | 'premium' | 'vip';
}

export interface ProfileFormValues {
  fullName: string;
  bio: string;
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
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price?: number;
  category?: string;
}

export interface ProfilesResponse {
  profiles: Profile[];
  total: number;
}

export const MAX_GALLERY_IMAGES = 10;