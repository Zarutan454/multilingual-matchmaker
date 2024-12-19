import { BaseProfile } from './baseProfile';
import { Appearance } from './appearance';
import { Measurements } from './measurements';
import { ContactInfo } from './contactInfo';
import { ServiceInfo } from './serviceInfo';

export interface Profile extends BaseProfile {
  avatar_url: string | null;
  banner_url: string | null;
  interests: string | null;
  occupation: string | null;
  availability: string[] | null;
  service_categories: string[] | null;
  price_range: PriceRange | null;
  availability_status: AvailabilityStatus;
  gallery: string[] | null;
  languages: string[];
  contact_info: ContactInfo;
  service_info: ServiceInfo;
  last_seen: string | null;
  user_type: UserType;
  is_verified: boolean;
  verification_status: VerificationStatus;
  appearance?: Appearance;
  measurements?: Measurements;
}

export type AvailabilityStatus = 'online' | 'offline' | 'busy';
export type UserType = 'customer' | 'provider';
export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface PriceRange {
  min: number;
  max: number;
}

export const MAX_GALLERY_IMAGES = 10;