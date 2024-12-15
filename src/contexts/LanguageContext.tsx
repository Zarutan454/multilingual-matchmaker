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

  // Cache für Übersetzungen
  const translationCache = new Map<string, Promise<string>>();

  const translateAndCache = useCallback(async (text: string): Promise<string> => {
    if (!text) return "";
    
    const cacheKey = `${currentLanguage}:${text}`;
    
    if (!translationCache.has(cacheKey)) {
      translationCache.set(
        cacheKey,
        translateText(text, currentLanguage)
      );
    }

    return translationCache.get(cacheKey)!;
  }, [currentLanguage]);

  const t = useCallback((key: TranslationKey | string): string => {
    // Versuche zuerst statische Übersetzungen zu finden
    const staticTranslation = languages[currentLanguage].translations[key as TranslationKey];
    if (staticTranslation) return staticTranslation;

    // Prüfe dann dynamische Übersetzungen
    if (dynamicTranslations[key]) return dynamicTranslations[key];

    // Wenn keine Übersetzung gefunden wurde, starte die Übersetzung
    if (!isTranslating) {
      setIsTranslating(true);
      translateAndCache(key).then((translatedText) => {
        setDynamicTranslations((prev) => ({
          ...prev,
          [key]: translatedText,
        }));
        setIsTranslating(false);
      });
    }

    // Fallback zum Originaltext
    return key;
  }, [currentLanguage, dynamicTranslations, isTranslating, translateAndCache]);

  // Effekt zum Zurücksetzen des Caches beim Sprachwechsel
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