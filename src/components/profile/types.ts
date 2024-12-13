import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
export const MAX_GALLERY_IMAGES = 5;

export const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  interests: z.string().optional(),
  occupation: z.string().optional(),
  avatar: z
    .any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), "Max file size is 5MB")
    .refine(
      (file) => !file || (file instanceof File && ALLOWED_FILE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .gif formats are supported"
    )
    .optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  availability: z.array(z.string()).optional(),
  serviceCategories: z.array(z.string()).optional(),
  priceRange: z.object({
    min: z.number(),
    max: z.number()
  }),
  gallery: z.array(z.any())
    .refine(
      (files) => files.length <= MAX_GALLERY_IMAGES,
      `Maximum ${MAX_GALLERY_IMAGES} images allowed`
    )
    .optional(),
  availabilityStatus: z.enum(["available", "busy", "offline"]).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export interface UserMetadata {
  full_name: string;
  bio: string;
  location: string;
  interests: string;
  occupation: string;
  avatar_url?: string;
  height?: string;
  weight?: string;
  availability?: string[];
  service_categories?: string[];
  price_range: {
    min: number;
    max: number;
  };
  gallery?: string[];
  availability_status?: "available" | "busy" | "offline";
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}