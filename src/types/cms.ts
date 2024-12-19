export interface BlogPost {
  id: string;
  title: string;
  content?: string;
  author?: string;
  published: boolean;
  publishedAt?: string;
  updatedAt?: string;
  slug?: string;
  tags?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  publishedAt?: string;
  priority?: 'low' | 'medium' | 'high';
  expiresAt?: string;
}