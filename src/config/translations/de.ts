import { Translations } from "../languageTypes";
import { authTranslations } from "./categories/de/auth";
import { navigationTranslations } from "./categories/de/navigation";
import { profileTranslations } from "./categories/de/profile";
import { servicesTranslations } from "./categories/de/services";
import { subscriptionTranslations } from "./categories/de/subscription";
import { availabilityTranslations } from "./categories/de/availability";
import { pricingTranslations } from "./categories/de/pricing";
import { dashboardTranslations } from "./categories/de/dashboard";

export const deTranslations: Translations = {
  ...authTranslations,
  ...navigationTranslations,
  ...profileTranslations,
  ...servicesTranslations,
  ...subscriptionTranslations,
  ...availabilityTranslations,
  ...pricingTranslations,
  ...dashboardTranslations,

  // Nickname translations
  nickname: "Nickname",
  nicknameRequired: "Bitte geben Sie einen Nickname ein",
  nicknameChangeLimit: "Sie können Ihren Nickname nur alle 7 Tage ändern",
  nicknameUpdated: "Nickname erfolgreich aktualisiert",
  errorUpdatingNickname: "Fehler beim Aktualisieren des Nicknames",
};
