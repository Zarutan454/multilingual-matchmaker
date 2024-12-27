import { Language } from "./languageTypes";
import { deTranslations } from "./translations/de";
import { enTranslations } from "./translations/en";
import { ruTranslations } from "./languages/ru";
import { roTranslations } from "./languages/ro";
import { itTranslations } from "./languages/it";
import { esTranslations } from "./languages/es";
import { frTranslations } from "./languages/fr";

export * from "./languageTypes";

export const languages: Record<
  Language,
  { name: string; flag: string; translations: typeof deTranslations }
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
    translations: ruTranslations
  },
  ro: {
    name: "Română",
    flag: "🇷🇴",
    translations: roTranslations
  },
  it: {
    name: "Italiano",
    flag: "🇮🇹",
    translations: itTranslations
  },
  es: {
    name: "Español",
    flag: "🇪🇸",
    translations: esTranslations
  },
  fr: {
    name: "Français",
    flag: "🇫🇷",
    translations: frTranslations
  }
};