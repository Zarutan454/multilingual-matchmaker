-- Erweiterte Sicherheitsrichtlinien für Profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles sind öffentlich sichtbar wenn aktiv"
  ON profiles FOR SELECT
  USING (is_active = true);

CREATE POLICY "Benutzer können ihr eigenes Profil bearbeiten"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Erweiterte Sicherheitsrichtlinien für Nachrichten
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Benutzer können nur ihre eigenen Nachrichten lesen"
  ON messages FOR SELECT
  USING (auth.uid() = sender OR auth.uid() = recipient);

CREATE POLICY "Benutzer können nur eigene Nachrichten senden"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender);

-- Erweiterte Sicherheitsrichtlinien für Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services sind öffentlich sichtbar"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Provider können ihre Services verwalten"
  ON services FOR ALL
  USING (auth.uid() = provider_id);

-- Rate Limiting für API-Anfragen
CREATE POLICY "Rate Limiting für Nachrichten"
  ON messages FOR INSERT
  WITH CHECK (
    (SELECT COUNT(*) 
     FROM messages 
     WHERE sender = auth.uid() 
     AND created_at > NOW() - INTERVAL '1 minute') < 10
  );

-- Sicherheitsrichtlinien für Bewertungen
CREATE POLICY "Bewertungen sind öffentlich sichtbar"
  ON profile_ratings FOR SELECT
  USING (true);

CREATE POLICY "Benutzer können nur eine Bewertung pro Profil abgeben"
  ON profile_ratings FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND NOT EXISTS (
      SELECT 1 
      FROM profile_ratings 
      WHERE user_id = auth.uid() 
      AND profile_id = NEW.profile_id
    )
  );