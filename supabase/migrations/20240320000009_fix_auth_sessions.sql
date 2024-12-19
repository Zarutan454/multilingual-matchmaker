-- Drop if exists to avoid conflicts
DROP TABLE IF EXISTS public.auth_sessions;

-- Create auth_sessions table with proper structure
CREATE TABLE public.auth_sessions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_sign_in_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    factor_id text,
    aal aal_level DEFAULT 'aal1'::aal_level,
    not_after timestamp with time zone
);

-- Add indices for better performance
CREATE INDEX IF NOT EXISTS idx_auth_sessions_user_id ON public.auth_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_factor_id ON public.auth_sessions(factor_id);

-- Enable RLS
ALTER TABLE public.auth_sessions ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view their own sessions"
    ON public.auth_sessions FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
    ON public.auth_sessions FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);