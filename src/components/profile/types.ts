import { z } from "zod";

export const MAX_GALLERY_IMAGES = 6;

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

export const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  bio: z.string(),
  location: z.string(),
  interests: z.string(),
  occupation: z.string(),
  height: z.string(),
  weight: z.string(),
  availability: z.array(z.string()),
  serviceCategories: z.array(z.string()),
  priceRange: z.object({
    min: z.number(),
    max: z.number()
  }),
  availabilityStatus: z.string(),
  avatar: z.instanceof(File).optional(),
  gallery: z.array(z.union([z.instanceof(File), z.string()])).optional()
});