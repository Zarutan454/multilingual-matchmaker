export const getOptimizedImageUrl = (url: string, width: number = 400): string => {
  if (!url || url.includes('placeholder.svg')) {
    return url;
  }

  // Wenn es eine Supabase Storage URL ist
  if (url.includes('storage.googleapis.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?width=${width}&quality=80&format=webp`;
  }

  // Für andere URLs (z.B. externe Bilder)
  return url;
};

export const preloadImage = (url: string): void => {
  if (!url || url.includes('placeholder.svg')) return;
  
  const img = new Image();
  img.src = getOptimizedImageUrl(url);
};

export const generateBlurHash = async (url: string): Promise<string> => {
  // Implementierung des BlurHash-Algorithmus hier
  // Fürs Erste geben wir einen Platzhalter zurück
  return 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
};
