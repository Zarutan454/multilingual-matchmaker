import { AuthTranslationKeys } from "./types/authTypes";
import { NavigationTranslationKeys } from "./types/navigationTypes";
import { ProfileTranslationKeys } from "./types/profileTypes";
import { AdminTranslationKeys } from "./types/adminTypes";
import { KYCTranslationKeys } from "./types/kycTypes";
import { MessagingTranslationKeys } from "./types/messagingTypes";
import { RatingsTranslationKeys } from "./types/ratingsTypes";
import { ProviderTranslationKeys } from "./types/providerTypes";
import { ServiceTranslationKeys } from "./types/serviceTypes";
import { SubscriptionTranslationKeys } from "./types/subscriptionTypes";
import { AvailabilityTranslationKeys } from "./types/availabilityTypes";
import { PricingTranslationKeys } from "./types/pricingTypes";

export type Language = "de" | "en" | "ru" | "ro" | "it" | "es" | "fr";

export type TranslationKey =
  | AuthTranslationKeys
  | NavigationTranslationKeys
  | ProfileTranslationKeys
  | AdminTranslationKeys
  | KYCTranslationKeys
  | MessagingTranslationKeys
  | RatingsTranslationKeys
  | ProviderTranslationKeys
  | ServiceTranslationKeys
  | SubscriptionTranslationKeys
  | AvailabilityTranslationKeys
  | PricingTranslationKeys;

export type Translations = {
  [K in TranslationKey]: string;
};