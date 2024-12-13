import { Language } from "../languageTypes";
import { deTranslations } from "../translations/de";
import { enTranslations } from "../translations/en";
import { ruTranslations } from "./ru";
import { roTranslations } from "./ro";
import { itTranslations } from "./it";
import { esTranslations } from "./es";
import { frTranslations } from "./fr";

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