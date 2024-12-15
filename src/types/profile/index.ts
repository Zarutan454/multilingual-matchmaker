import { Appearance } from './appearance';
import { Measurements } from './measurements';
import { BasicInfo } from './basicInfo';

export interface Profile extends BasicInfo, Appearance, Measurements {
  id: string;
  avatar_url: string | null;
  interests: string | null;
  occupation: string | null;
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

export const MAX_GALLERY_IMAGES = 10;

export type { Appearance } from './appearance';
export type { Measurements } from './measurements';
export type { BasicInfo } from './basicInfo';