export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  location: string | null;
}

export interface FavoriteData {
  id: string;
  profile: Profile;
}

export interface FavoriteResponse {
  id: string;
  profiles: Profile[];
}