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
  languages?: string[];
  services?: Service[];
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
  rating?: number;
  reviews_count?: number;
  user_type: 'customer' | 'provider';
  last_seen: string | null;
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
    availability: Array.isArray(data.availability) ? data.availability : null,
    service_categories: Array.isArray(data.service_categories) ? data.service_categories : null,
    price_range: data.price_range as Profile['price_range'],
    availability_status: (data.availability_status as Profile['availability_status']) || 'offline',
    gallery: Array.isArray(data.gallery) ? data.gallery : null,
    languages: Array.isArray(data.languages) ? data.languages : [],
    services: Array.isArray(data.services) ? data.services.map(castToService) : [],
    age: typeof data.age === 'number' ? data.age : undefined,
    gender: data.gender as string | undefined,
    hair_color: data.hair_color as string | undefined,
    hair_length: data.hair_length as string | undefined,
    hair_type: data.hair_type as string | undefined,
    eye_color: data.eye_color as string | undefined,
    skin_tone: data.skin_tone as string | undefined,
    body_type: data.body_type as string | undefined,
    bust_size: data.bust_size as string | undefined,
    dress_size: data.dress_size as string | undefined,
    grooming: data.grooming as string | undefined,
    rating: typeof data.rating === 'number' ? data.rating : undefined,
    reviews_count: typeof data.reviews_count === 'number' ? data.reviews_count : undefined,
    user_type: (data.user_type as 'customer' | 'provider') || 'customer',
    last_seen: data.last_seen as string | null,
  };
}

// Helper function to safely cast Supabase response to Service
export function castToService(data: Record<string, unknown>): Service {
  return {
    id: String(data.id || ''),
    name: String(data.name || ''),
    description: data.description as string | null,
    duration: Number(data.duration || 0),
    price: typeof data.price === 'number' ? data.price : undefined,
    category: data.category as string | undefined,
    categories: Array.isArray(data.categories) ? data.categories : undefined,
  };
}