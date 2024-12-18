-- Composite index für Profile-Suche
CREATE INDEX IF NOT EXISTS idx_profiles_search 
ON profiles(user_type, is_active, location);

-- Composite index für Nachrichten-Sortierung
CREATE INDEX IF NOT EXISTS idx_messages_sorting 
ON messages(sender, recipient, created_at DESC);

-- Index für Service-Kategorien
CREATE INDEX IF NOT EXISTS idx_services_provider_categories 
ON services USING GIN (categories, provider_id);

-- Index für Profile-Verfügbarkeit
CREATE INDEX IF NOT EXISTS idx_profiles_availability 
ON profiles(availability_status, last_seen DESC);

-- Index für Profile-Mitgliedschaft
CREATE INDEX IF NOT EXISTS idx_profiles_membership 
ON profiles(membership_level, is_active);

-- Index für Profilbewertungen
CREATE INDEX IF NOT EXISTS idx_profile_ratings 
ON profile_ratings(profile_id, rating);