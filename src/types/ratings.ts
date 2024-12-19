export type RatingCriteria = {
  communication: number;
  cleanliness: number;
  accuracy: number;
  value: number;
  location: number;
  overall: number;
};

export interface Rating {
  id: string;
  provider_id: string;
  user_id: string;
  service_id?: string;
  rating: number;
  criteria?: RatingCriteria;
  comment?: string;
  created_at: string;
}