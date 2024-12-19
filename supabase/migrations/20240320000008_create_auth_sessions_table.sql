CREATE TABLE IF NOT EXISTS public.auth_sessions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_sign_in_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    factor_id text,
    aal aal_level DEFAULT 'aal1'::aal_level,
    not_after timestamp with time zone
);

-- Add RLS policies
ALTER TABLE public.auth_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions"
    ON public.auth_sessions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
    ON public.auth_sessions
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Add indices for better performance
CREATE INDEX auth_sessions_user_id_idx ON public.auth_sessions(user_id);
CREATE INDEX auth_sessions_factor_id_idx ON public.auth_sessions(factor_id);