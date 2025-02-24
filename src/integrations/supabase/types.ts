export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          content: string | null
          id: string
          published: boolean | null
          publishedat: string | null
          slug: string | null
          tags: string[] | null
          title: string
          updatedat: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          id?: string
          published?: boolean | null
          publishedat?: string | null
          slug?: string | null
          tags?: string[] | null
          title: string
          updatedat?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          id?: string
          published?: boolean | null
          publishedat?: string | null
          slug?: string | null
          tags?: string[] | null
          title?: string
          updatedat?: string | null
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "favorites_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: []
      }
      news_items: {
        Row: {
          content: string | null
          expiresat: string | null
          id: string
          priority: string | null
          published: boolean | null
          publishedat: string | null
          title: string
        }
        Insert: {
          content?: string | null
          expiresat?: string | null
          id?: string
          priority?: string | null
          published?: boolean | null
          publishedat?: string | null
          title: string
        }
        Update: {
          content?: string | null
          expiresat?: string | null
          id?: string
          priority?: string | null
          published?: boolean | null
          publishedat?: string | null
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          recipient_id: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          recipient_id?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          recipient_id?: string | null
          title?: string
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "profile_likes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          audit_log: Json[] | null
          availability: string[] | null
          availability_status: string | null
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          body_type: string | null
          bust_size: string | null
          category: string | null
          contact_info: Json | null
          created_at: string
          dress_size: string | null
          eye_color: string | null
          full_name: string | null
          gallery: string[] | null
          gender: string | null
          grooming: string | null
          hair_color: string | null
          hair_length: string | null
          hair_type: string | null
          height: string | null
          id: string
          interests: string | null
          is_active: boolean | null
          is_verified: boolean | null
          languages: string[] | null
          last_login: string | null
          last_seen: string | null
          likes_count: number | null
          location: string | null
          measurements: Json | null
          membership_level: string | null
          nickname: string | null
          occupation: string | null
          price_range: Json | null
          rates: Json | null
          rating: number | null
          reviews: number | null
          reviews_count: number | null
          role: string | null
          service_categories: string[] | null
          services_offered: string[] | null
          skin_tone: string | null
          updated_at: string
          user_type: string | null
          verification_status: string | null
          weight: string | null
          working_hours: Json | null
        }
        Insert: {
          age?: number | null
          audit_log?: Json[] | null
          availability?: string[] | null
          availability_status?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          body_type?: string | null
          bust_size?: string | null
          category?: string | null
          contact_info?: Json | null
          created_at?: string
          dress_size?: string | null
          eye_color?: string | null
          full_name?: string | null
          gallery?: string[] | null
          gender?: string | null
          grooming?: string | null
          hair_color?: string | null
          hair_length?: string | null
          hair_type?: string | null
          height?: string | null
          id: string
          interests?: string | null
          is_active?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          last_login?: string | null
          last_seen?: string | null
          likes_count?: number | null
          location?: string | null
          measurements?: Json | null
          membership_level?: string | null
          nickname?: string | null
          occupation?: string | null
          price_range?: Json | null
          rates?: Json | null
          rating?: number | null
          reviews?: number | null
          reviews_count?: number | null
          role?: string | null
          service_categories?: string[] | null
          services_offered?: string[] | null
          skin_tone?: string | null
          updated_at?: string
          user_type?: string | null
          verification_status?: string | null
          weight?: string | null
          working_hours?: Json | null
        }
        Update: {
          age?: number | null
          audit_log?: Json[] | null
          availability?: string[] | null
          availability_status?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          body_type?: string | null
          bust_size?: string | null
          category?: string | null
          contact_info?: Json | null
          created_at?: string
          dress_size?: string | null
          eye_color?: string | null
          full_name?: string | null
          gallery?: string[] | null
          gender?: string | null
          grooming?: string | null
          hair_color?: string | null
          hair_length?: string | null
          hair_type?: string | null
          height?: string | null
          id?: string
          interests?: string | null
          is_active?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          last_login?: string | null
          last_seen?: string | null
          likes_count?: number | null
          location?: string | null
          measurements?: Json | null
          membership_level?: string | null
          nickname?: string | null
          occupation?: string | null
          price_range?: Json | null
          rates?: Json | null
          rating?: number | null
          reviews?: number | null
          reviews_count?: number | null
          role?: string | null
          service_categories?: string[] | null
          services_offered?: string[] | null
          skin_tone?: string | null
          updated_at?: string
          user_type?: string | null
          verification_status?: string | null
          weight?: string | null
          working_hours?: Json | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          criteria: Json | null
          id: string
          provider_id: string | null
          rating: number | null
          service_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          criteria?: Json | null
          id?: string
          provider_id?: string | null
          rating?: number | null
          service_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          criteria?: Json | null
          id?: string
          provider_id?: string | null
          rating?: number | null
          service_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          categories: string[] | null
          created_at: string
          description: string | null
          duration: number
          id: string
          name: string
          price: number | null
          provider_id: string | null
        }
        Insert: {
          categories?: string[] | null
          created_at?: string
          description?: string | null
          duration?: number
          id?: string
          name: string
          price?: number | null
          provider_id?: string | null
        }
        Update: {
          categories?: string[] | null
          created_at?: string
          description?: string | null
          duration?: number
          id?: string
          name?: string
          price?: number | null
          provider_id?: string | null
        }
        Relationships: []
      }
      system_logs: {
        Row: {
          id: string
          level: string | null
          message: string
          metadata: Json | null
          timestamp: string | null
          userid: string | null
        }
        Insert: {
          id?: string
          level?: string | null
          message: string
          metadata?: Json | null
          timestamp?: string | null
          userid?: string | null
        }
        Update: {
          id?: string
          level?: string | null
          message?: string
          metadata?: Json | null
          timestamp?: string | null
          userid?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
