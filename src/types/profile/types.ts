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
  bio?: string;
  avatar_url?: string;
  banner_url?: string;
  user_type: 'customer' | 'provider';
  contact_info: ContactInfo;
  service_info?: ServiceInfo;
  verification_status: 'pending' | 'verified' | 'rejected';
  created_at?: string;
  updated_at?: string;
  name: string;
  image: string;
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
  phone?: string;
  email?: string;
}

export interface ProfilesResponse {
  profiles: Profile[];
  total: number;
}