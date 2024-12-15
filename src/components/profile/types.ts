export interface Profile {
  id: string;
  name: string;
  image: string;
  category: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: string;
  rating: number;
  reviews: number;
  spokenLanguages: string[];
  age: number;
  serviceCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  last_seen?: string;
}

export interface ProfileFormValues {
  fullName: string;
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
  priceRange: {
    min: number;
    max: number;
  };
  availabilityStatus: 'online' | 'offline' | 'busy';
  serviceCategories: string[];
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  nationality?: string;
  spokenLanguages?: string[];
  preferredCommunication?: 'email' | 'phone' | 'both';
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price?: number;
  category?: string;
}

export const MAX_GALLERY_IMAGES = 10;
