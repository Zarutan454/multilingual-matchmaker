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
      console.error("Translation error:", await response.text());
      return text;
    }

    const data = await response.json();
    return data[0][0][0] || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};

export const translateObject = async <T extends Record<string, string>>(
  obj: T,
  targetLang: Language
): Promise<T> => {
  const entries = await Promise.all(
    Object.entries(obj).map(async ([key, value]) => [
      key,
      await translateText(value, targetLang)
    ])
  );
  return Object.fromEntries(entries) as T;
};