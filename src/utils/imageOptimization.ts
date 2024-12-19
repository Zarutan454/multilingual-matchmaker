import { supabase } from "@/lib/supabase";

export const optimizeImage = async (file: File): Promise<File> => {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // Maximale Bildgröße
  const MAX_WIDTH = 1200;
  const MAX_FILE_SIZE = 500 * 1024; // 500KB

  if (file.size <= MAX_FILE_SIZE) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Blob creation failed'));
            return;
          }
          resolve(new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          }));
        },
        'image/jpeg',
        0.8
      );
    };

    img.onerror = () => {
      reject(new Error('Image loading failed'));
    };

    img.src = URL.createObjectURL(file);
  });
};

export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    const optimizedFile = await optimizeImage(file);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('uploads')
      .upload(filePath, optimizedFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};