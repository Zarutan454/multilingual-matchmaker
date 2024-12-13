export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  categories: string[];
  availability: string[];
  location: string;
}