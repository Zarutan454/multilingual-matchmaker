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
import { DashboardTranslationKeys } from "./types/dashboardTypes";

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
  | PricingTranslationKeys
  | DashboardTranslationKeys
  | "success"
  | "error"
  | "verificationCodeSent"
  | "errorSendingCode"
  | "phoneVerified"
  | "invalidVerificationCode"
  | "sendingCode"
  | "sendVerificationCode"
  | "enterVerificationCode"
  | "verifying"
  | "verifyCode"
  | "gender"
  | "selectGender"
  | "male"
  | "female"
  | "other"
  | "dateOfBirth"
  | "nationality"
  | "languages"
  | "selectLanguages"
  | "preferredCommunication"
  | "selectPreferredCommunication"
  | "phone"
  | "both"
  | "emergencyContact"
  | "emergencyContactName"
  | "emergencyContactPhone"
  | "emergencyContactRelationship"
  | "nickname"
  | "nicknameRequired"
  | "nicknameChangeLimit"
  | "nicknameUpdated"
  | "errorUpdatingNickname"
  | "updatingUserStatus"
  | "usersLoadedSuccessfully"
  | "errorNavigating"
  | "loadingUsers"
  | "favorites"
  | "yourFavorites"
  | "noFavoritesSelected"
  | "messages"
  | "recentMessages"
  | "noMessages"
  | "typeMessage"
  | "send"
  | "online"
  | "offline"
  | "lastSeen"
  | "availability"
  | "gallery"
  | "viewAllPhotos"
  | "contactInfo"
  | "about"
  | "services"
  | "reviews"
  | "writeReview"
  | "bookNow"
  | "profile"
  | "settings"
  | "logout"
  | "search"
  | "filter"
  | "location"
  | "price"
  | "categories"
  | "applyFilters"
  | "resetFilters"
  | "userStatusUpdated"
  | "errorUpdatingUser"
  | "name"
  | "status"
  | "role"
  | "actions"
  | "notProvided"
  | "pending"
  | "user"
  | "activate"
  | "suspend";

export type Translations = Partial<Record<TranslationKey, string>>;