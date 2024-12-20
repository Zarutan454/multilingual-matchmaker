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
  availability_status: string | null;
  languages?: string[];
  services?: Service[];
  age?: number;
}

export interface ProfileFormValues {
  fullName: string;
  nickname?: string;
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