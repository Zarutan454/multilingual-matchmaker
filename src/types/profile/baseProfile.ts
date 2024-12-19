export interface BaseProfile {
  id: string;
  full_name: string | null;
  nickname?: string;
  bio: string | null;
  location: string | null;
  age?: number;
  gender?: string;
}