export interface Profile {
  id: string;
  full_name: string | null;
  nickname?: string;
  bio: string | null;
  avatar_url: string | null;
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
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price?: number;
  category?: string;
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