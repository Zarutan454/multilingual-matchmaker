import { User, AuthError } from '@supabase/supabase-js';

export type AuthContextType = {
  user: User | null;
  signUp: (email: string, password: string) => Promise<{
    data: { user: User | null } | null;
    error: AuthError | null;
  }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
};