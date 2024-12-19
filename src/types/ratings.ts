export interface Rating {
  id: string;
  provider_id?: string;
  user_id?: string;
  service_id?: string;
  rating: number;
  criteria?: Record<string, any>;
  comment?: string;
  created_at?: string;
}

export interface RatingCriteria {
  communication: number;
  professionalism: number;
  cleanliness: number;
  location: number;
  value: number;
}

export interface RatingSummary {
  averageRating: number;
  totalRatings: number;
  distribution: Record<number, number>;
}