export interface PriceRange {
  min: number;
  max: number;
}

export interface ProfileFormValues {
  fullName: string;
  bio: string;
  location: string;
  interests: string;
  occupation: string;
  height: string;
  weight: string;
  availability: string[];
  serviceCategories: string[];
  priceRange: PriceRange;
  availabilityStatus: string;
  avatar?: File;
  gallery?: (File | string)[];
}

export interface UserMetadata {
  full_name: string;
  bio: string;
  location: string;
  interests: string;
  occupation: string;
  height: string;
  weight: string;
  availability: string[];
  service_categories: string[];
  price_range: PriceRange;
  availability_status: string;
  avatar_url?: string;
  gallery?: string[];
}