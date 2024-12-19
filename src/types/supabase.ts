export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          user_type: 'customer' | 'provider';
          // ... andere Profilfelder
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          user_type: 'customer' | 'provider';
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          user_type?: 'customer' | 'provider';
        };
      };
      messages: {
        Row: {
          id: string;
          sender: string;
          recipient: string;
          content: string;
          created_at: string;
          read: boolean;
        };
        Insert: {
          sender: string;
          recipient: string;
          content: string;
          created_at?: string;
          read?: boolean;
        };
        Update: {
          read?: boolean;
        };
      };
      // ... andere Tabellendefinitionen
    };
  };
}

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type DbResultErr = {
  code: string;
  msg: string;
  details: string;
  hint: string;
};