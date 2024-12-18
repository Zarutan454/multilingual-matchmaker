export interface BaseProfile {
  full_name: string | null;
  nickname?: string;
  bio: string | null;
  location: string | null;
  age?: number;
  gender?: string;
}