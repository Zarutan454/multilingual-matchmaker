import { Database } from '@/types/supabase';
import { Profile, BlogPost, NewsItem, Service, Rating, Message, Notification, LogEntry } from '@/types';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type MessageRow = Database['public']['Tables']['messages']['Row'];
type BlogPostRow = Database['public']['Tables']['blog_posts']['Row'];
type NewsItemRow = Database['public']['Tables']['news_items']['Row'];
type ServiceRow = Database['public']['Tables']['services']['Row'];
type RatingRow = Database['public']['Tables']['ratings']['Row'];
type NotificationRow = Database['public']['Tables']['notifications']['Row'];
type SystemLogRow = Database['public']['Tables']['system_logs']['Row'];

export function transformProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    full_name: row.full_name || '',
    bio: row.bio || '',
    avatar_url: row.avatar_url || '',
    banner_url: row.banner_url || '',
    location: row.location || '',
    interests: row.interests || '',
    occupation: row.occupation || '',
    height: row.height || '',
    weight: row.weight || '',
    availability: row.availability || [],
    service_categories: row.service_categories || [],
    price_range: row.price_range || { min: 0, max: 0 },
    availability_status: row.availability_status || 'offline',
    gallery: row.gallery || [],
    languages: row.languages || [],
    age: row.age || 0,
    gender: row.gender || '',
    hair_color: row.hair_color || '',
    hair_length: row.hair_length || '',
    hair_type: row.hair_type || '',
    eye_color: row.eye_color || '',
    skin_tone: row.skin_tone || '',
    body_type: row.body_type || '',
    bust_size: row.bust_size || '',
    dress_size: row.dress_size || '',
    grooming: row.grooming || '',
    rating: row.rating || 0,
    reviews_count: row.reviews_count || 0,
    user_type: row.user_type || 'customer',
    last_seen: row.last_seen || null,
    is_verified: row.is_verified || false,
    messages_count: row.messages_count || 0,
    average_rating: row.average_rating || 0,
    membership_level: row.membership_level || 'basic'
  };
}

export function transformBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    title: row.title || '',
    content: row.content || '',
    author: row.author || '',
    published: row.published || false,
    publishedAt: row.published_at || null,
    updatedAt: row.updated_at || null,
    slug: row.slug || '',
    tags: row.tags || []
  };
}

export function transformNewsItem(row: NewsItemRow): NewsItem {
  return {
    id: row.id,
    title: row.title || '',
    content: row.content || '',
    published: row.published || false,
    publishedAt: row.published_at || null,
    priority: row.priority || 'low',
    expiresAt: row.expires_at || null
  };
}

export function transformService(row: ServiceRow): Service {
  return {
    id: row.id,
    provider_id: row.provider_id,
    name: row.name || '',
    description: row.description || '',
    duration: row.duration || 0,
    created_at: row.created_at || null,
    categories: row.categories || [],
    price: row.price || 0
  };
}

export function transformRating(row: RatingRow): Rating {
  return {
    id: row.id,
    provider_id: row.provider_id,
    user_id: row.user_id,
    service_id: row.service_id || null,
    rating: row.rating || 0,
    criteria: row.criteria || {},
    comment: row.comment || '',
    created_at: row.created_at || null
  };
}

export function transformMessage(row: MessageRow): Message {
  return {
    id: row.id,
    content: row.content,
    created_at: row.created_at || null,
    read: row.read || false,
    recipient: row.recipient,
    sender: row.sender
  };
}

export function transformNotification(row: NotificationRow): Notification {
  return {
    id: row.id,
    recipient_id: row.recipient_id || '',
    title: row.title || '',
    message: row.message || '',
    read: row.read || false,
    created_at: row.created_at || null
  };
}

export function transformLogEntry(row: SystemLogRow): LogEntry {
  return {
    id: row.id,
    timestamp: row.timestamp || null,
    level: row.level || 'info',
    message: row.message || '',
    userId: row.user_id || null,
    metadata: row.metadata || {}
  };
}