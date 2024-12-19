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
  last_seen?: string | null;
  user_type: 'customer' | 'provider';
  is_verified?: boolean;
  verification_status?: 'pending' | 'approved' | 'rejected';
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

export const MAX_GALLERY_IMAGES = 10;

// Helper function to safely cast Supabase response to Profile
export function castToProfile(data: Record<string, unknown>): Profile {
  return {
    id: String(data.id || ''),
    full_name: data.full_name as string | null,
    bio: data.bio as string | null,
    avatar_url: data.avatar_url as string | null,
    banner_url: data.banner_url as string | null,
    location: data.location as string | null,
    interests: data.interests as string | null,
    occupation: data.occupation as string | null,
    height: data.height as string | null,
    weight: data.weight as string | null,
    availability: (data.availability as string[]) || null,
    service_categories: (data.service_categories as string[]) || null,
    price_range: data.price_range as Profile['price_range'],
    availability_status: (data.availability_status as Profile['availability_status']) || 'offline',
    gallery: (data.gallery as string[]) || null,
    languages: (data.languages as string[]) || undefined,
    services: (data.services as Service[]) || undefined,
    age: data.age as number | undefined,
    gender: data.gender as string | undefined,
    user_type: (data.user_type as 'customer' | 'provider') || 'customer',
    last_seen: data.last_seen as string | null,
  } as Profile;
}

// Helper function to safely cast Supabase response to Service
export function castToService(data: Record<string, unknown>): Service {
  return {
    id: String(data.id || ''),
    name: String(data.name || ''),
    description: data.description as string | null,
    duration: Number(data.duration || 0),
    price: data.price as number | undefined,
    category: data.category as string | undefined,
    categories: (data.categories as string[]) || undefined,
  };
}
