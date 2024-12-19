export interface GalleryImage {
  id: string;
  url: string;
  category?: string;
  order: number;
  createdAt: string;
}

export interface ImageCategory {
  id: string;
  name: string;
  description?: string;
}