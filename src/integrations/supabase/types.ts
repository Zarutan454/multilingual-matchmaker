import { Database as DatabaseGenerated } from './generated.types';

// Re-export the generated types
export type { DatabaseGenerated as Database };
export type Json = DatabaseGenerated['public']['Json'];

// Export commonly used types
export type Profile = DatabaseGenerated['public']['Tables']['profiles']['Row'];
export type Message = DatabaseGenerated['public']['Tables']['messages']['Row'];
export type Service = DatabaseGenerated['public']['Tables']['services']['Row'];
export type Favorite = DatabaseGenerated['public']['Tables']['favorites']['Row'];
export type ProfileLike = DatabaseGenerated['public']['Tables']['profile_likes']['Row'];