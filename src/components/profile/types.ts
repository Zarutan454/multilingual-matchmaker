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