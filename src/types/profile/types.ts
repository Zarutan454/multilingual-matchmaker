export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  social?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface ServiceInfo {
  services?: string[];
  categories: string[];
  description: string;
  pricing: {
    hourly?: number;
    daily?: number;
    custom?: string;
  };
  availability: {
    days: string[];
    hours: string;
  };
}

export interface Profile {
  id: string;
  full_name: string;
  name: string;
  bio?: string;
  image: string;
  avatar_url?: string;
  banner_url?: string;
  user_type: 'customer' | 'provider';
  contact_info: ContactInfo;
  service_info?: ServiceInfo;
  verification_status: 'pending' | 'verified' | 'rejected';
  created_at?: string;
  updated_at?: string;
  category: string;
  coordinates: [number, number];
  location: string;
  status: string;
  spokenLanguages: string[];
  serviceCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  reviews: number;
  languages: string[];
  age?: number;
  phone?: string;
  email?: string;
  interests?: string;
  occupation?: string;
  availability?: string[];
  service_categories?: string[];
  price_range?: {
    min: number;
    max: number;
  };
  availability_status?: 'online' | 'offline' | 'busy';
  gallery?: string[];
  is_verified?: boolean;
  last_seen?: string;
}

export interface ProfilesResponse {
  profiles: Profile[];
  total: number;
}

export const MAX_GALLERY_IMAGES = 10;