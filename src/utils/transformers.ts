import { isValidData } from './typeGuards';
import type {
  ProfileRow,
  BlogPostRow,
  NewsItemRow,
  ServiceRow,
  RatingRow,
  MessageRow,
  NotificationRow,
  SystemLogRow
} from '@/types/supabase';
import type { BlogPost, NewsItem, Profile, Service, Rating, Message, Notification, LogEntry } from '@/types';

export function transformProfile(row: ProfileRow): Profile {
  if (!isValidData<ProfileRow>(row)) {
    throw new Error('Invalid profile data');
  }
  
  return {
    id: row.id,
    full_name: row.full_name,
    bio: row.bio,
    avatar_url: row.avatar_url,
    banner_url: row.banner_url,
    location: row.location,
    interests: row.interests,
    occupation: row.occupation,
    height: row.height,
    weight: row.weight,
    availability: row.availability,
    service_categories: row.service_categories,
    price_range: row.price_range,
    availability_status: row.availability_status || 'offline',
    gallery: row.gallery,
    languages: row.languages || [],
    age: row.age,
    gender: row.gender,
    hair_color: row.hair_color,
    hair_length: row.hair_length,
    hair_type: row.hair_type,
    eye_color: row.eye_color,
    skin_tone: row.skin_tone,
    body_type: row.body_type,
    bust_size: row.bust_size,
    dress_size: row.dress_size,
    grooming: row.grooming,
    rating: row.rating,
    reviews_count: row.reviews_count,
    user_type: row.user_type || 'customer',
    last_seen: row.last_seen,
  };
}

export function transformBlogPost(row: BlogPostRow): BlogPost {
  if (!isValidData<BlogPostRow>(row)) {
    throw new Error('Invalid blog post data');
  }

  return {
    id: row.id,
    title: row.title,
    content: row.content || '',
    author: row.author || '',
    published: row.published || false,
    publishedAt: row.publishedat,
    updatedAt: row.updatedat,
    slug: row.slug,
    tags: row.tags || []
  };
}

export function transformNewsItem(row: NewsItemRow): NewsItem {
  if (!isValidData<NewsItemRow>(row)) {
    throw new Error('Invalid news item data');
  }

  return {
    id: row.id,
    title: row.title,
    content: row.content || '',
    published: row.published || false,
    publishedAt: row.publishedat,
    priority: row.priority as 'low' | 'medium' | 'high',
    expiresAt: row.expiresat
  };
}

export function transformService(row: ServiceRow): Service {
  if (!isValidData<ServiceRow>(row)) {
    throw new Error('Invalid service data');
  }

  return {
    id: row.id,
    provider_id: row.provider_id,
    name: row.name,
    description: row.description || null,
    duration: row.duration,
    created_at: row.created_at,
    categories: row.categories || null,
    price: row.price || null
  };
}

export function transformRating(row: RatingRow): Rating {
  if (!isValidData<RatingRow>(row)) {
    throw new Error('Invalid rating data');
  }

  return {
    id: row.id,
    provider_id: row.provider_id,
    user_id: row.user_id,
    service_id: row.service_id || null,
    rating: row.rating || 0,
    criteria: row.criteria || null,
    comment: row.comment || null,
    created_at: row.created_at || null
  };
}

export function transformMessage(row: MessageRow): Message {
  if (!isValidData<MessageRow>(row)) {
    throw new Error('Invalid message data');
  }

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
  if (!isValidData<NotificationRow>(row)) {
    throw new Error('Invalid notification data');
  }

  return {
    id: row.id,
    recipient_id: row.recipient_id || null,
    title: row.title,
    message: row.message,
    read: row.read || false,
    created_at: row.created_at || null
  };
}

export function transformLogEntry(row: SystemLogRow): LogEntry {
  if (!isValidData<SystemLogRow>(row)) {
    throw new Error('Invalid log entry data');
  }

  return {
    id: row.id,
    timestamp: row.timestamp || null,
    level: row.level || null,
    message: row.message,
    userId: row.userid || null,
    metadata: row.metadata || null
  };
}
