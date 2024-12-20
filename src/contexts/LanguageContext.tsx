import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { languages, Language, TranslationKey, Translations } from "../config/languages";
import { translateText } from "../utils/translationUtils";

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey | string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("de");
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const translationCache = new Map<string, string>();

  const translateAndCache = useCallback(async (text: string, targetLang: Language): Promise<string> => {
    if (!text) return "";
    
    const cacheKey = ""+targetLang+":"+text;
    
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    try {
      const translatedText = await translateText(text, targetLang);
      translationCache.set(cacheKey, translatedText);
      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  }, []);

  const t = useCallback((key: TranslationKey | string): string => {
    // Try static translations first
    const staticTranslation = languages[currentLanguage]?.translations[key as TranslationKey];
    if (staticTranslation) return staticTranslation;

    // Check dynamic translations
    if (dynamicTranslations[key]) return dynamicTranslations[key];

    // If no translation found and not currently translating, trigger translation
    if (!isTranslating) {
      setIsTranslating(true);
      
      // Use English text as base for translation
      const textToTranslate = languages.en.translations[key as TranslationKey] || key;
      
      // Trigger async translation but return immediately
      translateAndCache(textToTranslate, currentLanguage)
        .then((translatedText) => {
          setDynamicTranslations((prev) => ({
            ...prev,
            [key]: translatedText,
          }));
        })
        .finally(() => {
          setIsTranslating(false);
        });
    }

    // Return English text or original key as fallback while translation is in progress
    return languages.en.translations[key as TranslationKey] || key;
  }, [currentLanguage, dynamicTranslations, isTranslating, translateAndCache]);

  // Reset cache when language changes
  useEffect(() => {
    translationCache.clear();
    setDynamicTranslations({});
  }, [currentLanguage]);

  const contextValue = {
    currentLanguage,
    setLanguage: setCurrentLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
