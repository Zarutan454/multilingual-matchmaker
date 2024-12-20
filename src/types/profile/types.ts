import { Database } from "@/integrations/supabase/types";
import { Json } from "@/types/supabase";

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
  contact_info: {
    phone: string;
    email: string;
  };
  service_info: {
    categories: string[];
    description: string;
    pricing: {
      hourly: number;
    };
    availability: {
      days: string[];
      hours: string;
    };
  };
  verification_status: string;
  age: number;
  interests?: string[];
  occupation?: string;
  height?: number;
  weight?: number;
  services?: any[];
  gallery?: string[];
  working_hours?: Json;
  availability?: string[];
  availability_status?: string;
  audit_log?: Json[];
  body_type?: string;
  bust_size?: string;
}

export interface ProfilesResponse {
  profiles: Profile[];
  total: number;
}

export const castToProfile = (data: Database['public']['Tables']['profiles']['Row']): Profile => {
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
    contact_info: {
      phone: '',
      email: ''
    },
    service_info: {
      categories: data.service_categories || [],
      description: data.bio || '',
      pricing: {
        hourly: priceRangeData?.min || 0,
      },
      availability: {
        days: data.availability || [],
        hours: ''
      }
    },
    verification_status: 'pending',
    age: data.age || 0,
    interests: [],
    occupation: '',
    height: 0,
    weight: 0,
    services: [],
    gallery: data.gallery as string[] || [],
    working_hours: data.working_hours,
    availability: data.availability,
    availability_status: data.availability_status,
    audit_log: data.audit_log as Json[],
    body_type: data.body_type,
    bust_size: data.bust_size
  };
};