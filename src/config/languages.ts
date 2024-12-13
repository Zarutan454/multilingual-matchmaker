import { Language } from "./languageTypes";
import { deTranslations } from "./translations/de";
import { enTranslations } from "./translations/en";

export * from "./languageTypes";

export const languages: Record<
  Language,
  { name: string; flag: string; translations: typeof enTranslations }
> = {
  de: {
    name: "Deutsch",
    flag: "🇩🇪",
    translations: deTranslations
  },
  en: {
    name: "English",
    flag: "🇬🇧",
    translations: enTranslations
  },
  ru: {
    name: "Русский",
    flag: "🇷🇺",
    translations: {
      ...enTranslations,
      // Add Russian translations here
    }
  },
  ro: {
    name: "Română",
    flag: "🇷🇴",
    translations: {
      ...enTranslations,
      // Add Romanian translations here
    }
  },
  it: {
    name: "Italiano",
    flag: "🇮🇹",
    translations: {
      ...enTranslations,
      // Add Italian translations here
    }
  },
  es: {
    name: "Español",
    flag: "🇪🇸",
    translations: {
      ...enTranslations,
      // Add Spanish translations here
    }
  },
  fr: {
    name: "Français",
    flag: "🇫🇷",
    translations: {
      ...enTranslations,
      // Add French translations here
    }
  }
};
