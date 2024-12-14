import { z } from "zod";

export interface Profile {
  id: number;
  name: string;
  image: string;
  category: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: "online" | "offline";
  rating: number;
  reviews: number;
  languages: string[];
  age: number;
  services?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: {
    days: string[];
    hours: string[];
  };
}

export const MAX_GALLERY_IMAGES = 10;

export interface ProfileFormValues {
  fullName: string;
  bio: string;
  avatar?: File;
  location: string;
  interests: string;
  occupation: string;
  height: string;
  weight: string;
  availability: string[];
  serviceCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  availabilityStatus: "online" | "offline" | "busy";
  gallery?: (File | string)[];
}

export interface UserMetadata {
  full_name: string;
  bio: string;
  avatar_url?: string;
  location: string;
  interests: string;
  occupation: string;
  height: string;
  weight: string;
  availability: string[];
  service_categories: string[];
  price_range: {
    min: number;
    max: number;
  };
  availability_status: string;
  gallery?: string[];
}

export const profileSchema = z.object({
  fullName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  bio: z.string().min(10, "Bio muss mindestens 10 Zeichen lang sein"),
  avatar: z.instanceof(File).optional(),
  location: z.string().min(2, "Standort ist erforderlich"),
  interests: z.string(),
  occupation: z.string(),
  height: z.string(),
  weight: z.string(),
  availability: z.array(z.string()),
  serviceCategories: z.array(z.string()),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0)
  }),
  availabilityStatus: z.enum(["online", "offline", "busy"]),
  gallery: z.array(z.union([z.instanceof(File), z.string()])).optional()
});