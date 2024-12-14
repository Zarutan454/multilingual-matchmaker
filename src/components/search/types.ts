export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  categories: string[];
  availability: string[];
  location: string;
}

export interface Provider {
  id: number;
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
}