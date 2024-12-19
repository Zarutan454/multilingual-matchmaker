export interface RatingCriteria {
  communication: number;
  professionalism: number;
  cleanliness: number;
  location: number;
  value: number;
}

export interface DetailedRating {
  id: string;
  overall_rating: number;
  criteria: RatingCriteria;
  comment: string;
  created_at: string;
  user_id: string;
  provider_id: string;
}