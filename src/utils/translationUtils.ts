import { Language } from "../config/languageTypes";

export const translateText = async (
  text: string,
  targetLang: Language
): Promise<string> => {
  // Konvertiere Sprachcodes in das Google Translate Format
  const googleLangMap: Record<Language, string> = {
    de: "de",
    en: "en",
    ru: "ru",
    ro: "ro",
    it: "it",
    es: "es",
    fr: "fr"
  };

  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${
        googleLangMap[targetLang]
      }&dt=t&q=${encodeURIComponent(text)}`
    );

    if (!response.ok) {
      console.error('Translation failed:', response.statusText);
      return text; // Return original text if translation fails
    }

    const data = await response.json();
    if (!data || !data[0] || !data[0][0]) {
      console.error('Invalid translation response');
      return text;
    }

    return data[0][0][0] || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text on error
  }
};

export const translateObject = async <T extends Record<string, string>>(
  obj: T,
  targetLang: Language
): Promise<T> => {
  try {
    const entries = await Promise.all(
      Object.entries(obj).map(async ([key, value]) => [
        key,
        await translateText(value, targetLang)
      ])
    );
    return Object.fromEntries(entries) as T;
  } catch (error) {
    console.error('Translation object error:', error);
    return obj; // Return original object on error
  }
};