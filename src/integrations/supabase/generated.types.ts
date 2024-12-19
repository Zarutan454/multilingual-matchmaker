export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string | null
          author: string | null
          published: boolean | null
          publishedAt: string | null
          updatedAt: string | null
          slug: string | null
          tags: string[] | null
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          author?: string | null
          published?: boolean | null
          publishedAt?: string | null
          updatedAt?: string | null
          slug?: string | null
          tags?: string[] | null
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          author?: string | null
          published?: boolean | null
          publishedAt?: string | null
          updatedAt?: string | null
          slug?: string | null
          tags?: string[] | null
        }
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          user_id?: string
        }
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          recipient: string | null
          sender: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient?: string | null
          sender?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient?: string | null
          sender?: string | null
        }
      }
      news_items: {
        Row: {
          id: string
          title: string
          content: string | null
          published: boolean | null
          publishedAt: string | null
          priority: string | null
          expiresAt: string | null
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          published?: boolean | null
          publishedAt?: string | null
          priority?: string | null
          expiresAt?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          published?: boolean | null
          publishedAt?: string | null
          priority?: string | null
          expiresAt?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          recipient_id: string | null
          title: string
          message: string
          read: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          recipient_id?: string | null
          title: string
          message: string
          read?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          recipient_id?: string | null
          title?: string
          message?: string
          read?: boolean | null
          created_at?: string | null
        }
      }
      profile_likes: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          bio: string | null
          location: string | null
          interests: string | null
          occupation: string | null
          height: string | null
          weight: string | null
          availability: string[] | null
          service_categories: string[] | null
          price_range: Json | null
          availability_status: string | null
          avatar_url: string | null
          gallery: string[] | null
          created_at: string
          updated_at: string
          measurements: Json | null
          age: number | null
          languages: string[] | null
          services_offered: string[] | null
          contact_info: Json | null
          working_hours: Json | null
          rates: Json | null
          last_seen: string | null
          gender: string | null
          hair_color: string | null
          hair_length: string | null
          hair_type: string | null
          eye_color: string | null
          skin_tone: string | null
          body_type: string | null
          bust_size: string | null
          dress_size: string | null
          grooming: string | null
          banner_url: string | null
          likes_count: number | null
          role: string | null
          is_active: boolean | null
          category: string | null
          audit_log: Json[] | null
          last_login: string | null
          user_type: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          bio?: string | null
          location?: string | null
          interests?: string | null
          occupation?: string | null
          height?: string | null
          weight?: string | null
          availability?: string[] | null
          service_categories?: string[] | null
          price_range?: Json | null
          availability_status?: string | null
          avatar_url?: string | null
          gallery?: string[] | null
          created_at?: string
          updated_at?: string
          measurements?: Json | null
          age?: number | null
          languages?: string[] | null
          services_offered?: string[] | null
          contact_info?: Json | null
          working_hours?: Json | null
          rates?: Json | null
          last_seen?: string | null
          gender?: string | null
          hair_color?: string | null
          hair_length?: string | null
          hair_type?: string | null
          eye_color?: string | null
          skin_tone?: string | null
          body_type?: string | null
          bust_size?: string | null
          dress_size?: string | null
          grooming?: string | null
          banner_url?: string | null
          likes_count?: number | null
          role?: string | null
          is_active?: boolean | null
          category?: string | null
          audit_log?: Json[] | null
          last_login?: string | null
          user_type?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          bio?: string | null
          location?: string | null
          interests?: string | null
          occupation?: string | null
          height?: string | null
          weight?: string | null
          availability?: string[] | null
          service_categories?: string[] | null
          price_range?: Json | null
          availability_status?: string | null
          avatar_url?: string | null
          gallery?: string[] | null
          created_at?: string
          updated_at?: string
          measurements?: Json | null
          age?: number | null
          languages?: string[] | null
          services_offered?: string[] | null
          contact_info?: Json | null
          working_hours?: Json | null
          rates?: Json | null
          last_seen?: string | null
          gender?: string | null
          hair_color?: string | null
          hair_length?: string | null
          hair_type?: string | null
          eye_color?: string | null
          skin_tone?: string | null
          body_type?: string | null
          bust_size?: string | null
          dress_size?: string | null
          grooming?: string | null
          banner_url?: string | null
          likes_count?: number | null
          role?: string | null
          is_active?: boolean | null
          category?: string | null
          audit_log?: Json[] | null
          last_login?: string | null
          user_type?: string | null
        }
      }
      ratings: {
        Row: {
          id: string
          provider_id: string | null
          user_id: string | null
          service_id: string | null
          rating: number | null
          criteria: Json | null
          comment: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          provider_id?: string | null
          user_id?: string | null
          service_id?: string | null
          rating?: number | null
          criteria?: Json | null
          comment?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          provider_id?: string | null
          user_id?: string | null
          service_id?: string | null
          rating?: number | null
          criteria?: Json | null
          comment?: string | null
          created_at?: string | null
        }
      }
      services: {
        Row: {
          id: string
          provider_id: string | null
          name: string
          description: string | null
          duration: number
          created_at: string
          categories: string[] | null
          price: number | null
        }
        Insert: {
          id?: string
          provider_id?: string | null
          name: string
          description?: string | null
          duration?: number
          created_at?: string
          categories?: string[] | null
          price?: number | null
        }
        Update: {
          id?: string
          provider_id?: string | null
          name?: string
          description?: string | null
          duration?: number
          created_at?: string
          categories?: string[] | null
          price?: number | null
        }
      }
      system_logs: {
        Row: {
          id: string
          timestamp: string | null
          level: string | null
          message: string
          userId: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          timestamp?: string | null
          level?: string | null
          message: string
          userId?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          timestamp?: string | null
          level?: string | null
          message?: string
          userId?: string | null
          metadata?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
