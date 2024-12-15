import { z } from "zod";

export interface Profile {
  id: string;
  name: string;
  image: string;
  category: string;
  location: string;
  serviceCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  status: string;
  rating?: number;
  reviews?: number;
  spokenLanguages?: string[];
  age?: number;
}

export const profileSchema = z.object({
  fullName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  nickname: z.string().min(2, "Nickname muss mindestens 2 Zeichen lang sein"),
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
  gallery: z.array(z.union([z.instanceof(File), z.string()])).optional(),
  phoneNumber: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  spokenLanguages: z.array(z.string()).optional(),
  preferredCommunication: z.enum(["email", "phone", "both"]).optional(),
  emergencyContact: z.object({
    name: z.string(),
    phoneNumber: z.string(),
    relationship: z.string()
  }).optional()
});