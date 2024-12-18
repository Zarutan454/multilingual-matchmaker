import { supabase } from '@/lib/supabase';

export const optimizeAndUploadImage = async (
  file: File,
  userId: string,
  type: 'avatar' | 'gallery'
): Promise<string> => {
  try {
    // Validate file size and type
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      throw new Error('Datei ist zu groß (max. 5MB)');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Ungültiges Dateiformat');
    }

    // Generate optimized filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${crypto.randomUUID()}.${fileExt}`;
    const filePath = type === 'avatar' ? `avatars/${fileName}` : `gallery/${fileName}`;

    // Upload file
    const { error: uploadError, data } = await supabase.storage
      .from('uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error optimizing and uploading image:', error);
    throw error;
  }
};