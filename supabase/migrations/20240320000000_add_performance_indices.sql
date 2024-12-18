-- Add indices for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_availability_status ON profiles(availability_status);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON profiles(location);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active);

-- Add indices for messages table
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Add indices for services table
CREATE INDEX IF NOT EXISTS idx_services_provider_id ON services(provider_id);
CREATE INDEX IF NOT EXISTS idx_services_categories ON services USING GIN (categories);

-- Add indices for favorites and likes
CREATE INDEX IF NOT EXISTS idx_favorites_user_profile ON favorites(user_id, profile_id);
CREATE INDEX IF NOT EXISTS idx_profile_likes_user_profile ON profile_likes(user_id, profile_id);