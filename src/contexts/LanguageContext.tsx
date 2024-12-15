import React, { createContext, useContext, useState, useCallback } from "react";
import { languages, Language, TranslationKey, Translations } from "../config/languages";
import { translateText } from "../utils/translationUtils";

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("de");
  const [dynamicTranslations, setDynamicTranslations] = useState<Partial<Record<TranslationKey, string>>>({});

  const t = useCallback(async (key: TranslationKey): Promise<string> => {
    // First try to get from static translations
    const staticTranslation = languages[currentLanguage].translations[key];
    if (staticTranslation) return staticTranslation;

    // Then check dynamic translations
    if (dynamicTranslations[key]) return dynamicTranslations[key]!;

    // If not found, translate from English and cache
    const englishText = languages.en.translations[key] || key;
    try {
      const translatedText = await translateText(englishText, currentLanguage);
      setDynamicTranslations(prev => ({
        ...prev,
        [key]: translatedText
      }));
      return translatedText;
    } catch (error) {
      console.error("Translation failed:", error);
      return englishText;
    }
  }, [currentLanguage, dynamicTranslations]);

  const contextValue = {
    currentLanguage,
    setLanguage: setCurrentLanguage,
    t: (key: TranslationKey) => {
      const staticTranslation = languages[currentLanguage].translations[key];
      if (staticTranslation) return staticTranslation;
      
      // If no static translation, try to get from dynamic translations
      if (dynamicTranslations[key]) return dynamicTranslations[key]!;
      
      // If still not found, return the key and trigger async translation
      t(key).then(() => {
        // Translation will be stored in dynamicTranslations and component will re-render
      });
      
      // Fallback to English or key itself
      return languages.en.translations[key] || key;
    }
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