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

export interface Coordinates {
  lat: number;
  lng: number;
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
  coordinates: Coordinates;
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
  age: number;
}

export interface ProfilesResponse {
  profiles: Profile[];
  total: number;
}

export const MAX_GALLERY_IMAGES = 10;