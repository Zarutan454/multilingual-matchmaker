import { Language } from "../config/languageTypes";

const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

export const translateText = async (
  text: string,
  targetLang: Language
): Promise<string> => {
  // Convert language codes to DeepL format
  const deeplLangMap: Record<Language, string> = {
    de: "DE",
    en: "EN",
    ru: "RU",
    ro: "RO",
    it: "IT",
    es: "ES",
    fr: "FR"
  };

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `DeepL-Auth-Key ${import.meta.env.VITE_DEEPL_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text,
        target_lang: deeplLangMap[targetLang],
      }),
    });

    if (!response.ok) {
      console.error("DeepL API error:", await response.text());
      return text; // Fallback to original text
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text
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