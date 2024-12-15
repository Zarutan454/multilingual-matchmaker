export interface Profile {
  id: string;
  full_name: string | null;
  nickname?: string;
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
  languages?: string[];
  phone?: string;
  phone_verified?: boolean;
  services?: Service[];
  rating?: number;
  reviews_count?: number;
  age?: number;
  gender?: string;
  hair_color?: string;
  hair_length?: string;
  hair_type?: string;
  eye_color?: string;
  skin_tone?: string;
  body_type?: string;
  bust_size?: string;
  dress_size?: string;
  grooming?: string;
  measurements?: {
    height?: string;
    weight?: string;
    size?: string;
  };
  contact_info?: {
    phone?: string;
    email?: string;
  };
  services_offered?: string[];
  working_hours?: Record<string, string[]>;
  rates?: Record<string, number>;
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
  full_name: string;
  nickname?: string;
  bio: string;
  avatar?: File;
  location: string;
  interests: string;
  occupation: string;
  height: string;
  weight: string;
  languages: string[];
  phone?: string;
  gallery?: (File | string)[];
  services: Service[];
  price_range: {
    min: number;
    max: number;
  };
  availability_status: 'online' | 'offline' | 'busy';
}

export const MAX_GALLERY_IMAGES = 10;