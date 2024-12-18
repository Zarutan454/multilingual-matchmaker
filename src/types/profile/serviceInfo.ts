export interface ServiceInfo {
  services?: Service[];
  working_hours?: WorkingHours;
  rates?: Rates;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price?: number;
  category?: string;
  categories?: string[];
}

export type WorkingHours = Record<string, string[]>;
export type Rates = Record<string, number>;