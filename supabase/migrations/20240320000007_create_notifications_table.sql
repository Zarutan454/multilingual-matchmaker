-- Erstelle die notifications-Tabelle
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    type VARCHAR(50),
    data JSONB
);

-- Erstelle Indices für bessere Performance
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Aktiviere Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Erstelle Sicherheitsrichtlinien
CREATE POLICY "Benutzer können ihre eigenen Benachrichtigungen sehen"
    ON notifications FOR SELECT
    USING (auth.uid() = recipient_id);

CREATE POLICY "System kann Benachrichtigungen erstellen"
    ON notifications FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Benutzer können ihre eigenen Benachrichtigungen aktualisieren"
    ON notifications FOR UPDATE
    USING (auth.uid() = recipient_id);

-- Füge einige Test-Benachrichtigungen hinzu
INSERT INTO public.notifications (recipient_id, title, message, type)
SELECT 
    id as recipient_id,
    'Willkommen bei unserer Plattform!' as title,
    'Danke für Ihre Anmeldung. Wir hoffen, Sie haben eine gute Zeit!' as message,
    'welcome' as type
FROM auth.users
WHERE id IS NOT NULL;