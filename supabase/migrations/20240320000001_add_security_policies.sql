-- Profiles table policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Messages table policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender OR auth.uid() = recipient);

CREATE POLICY "Users can insert their own messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender);

-- Services table policies
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Providers can manage their services"
  ON services FOR ALL
  USING (auth.uid() = provider_id);