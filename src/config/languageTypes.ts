import { AuthTranslationKeys } from "./types/authTypes";
import { NavigationTranslationKeys } from "./types/navigationTypes";
import { ProfileTranslationKeys } from "./types/profileTypes";

export type Language = "de" | "en" | "ru" | "ro" | "it" | "es" | "fr";

export type TranslationKey =
  | AuthTranslationKeys
  | NavigationTranslationKeys
  | ProfileTranslationKeys;

export type Translations = {
  [K in TranslationKey]: string;
};