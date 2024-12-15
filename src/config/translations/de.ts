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

  loadingUsers: "Benutzer werden geladen...",
  favorites: "Favoriten",
  yourFavorites: "Deine Favoriten",
  noFavoritesSelected: "Keine Favoriten ausgewählt",
  errorNavigating: "Fehler beim Navigieren",
  usersLoadedSuccessfully: "Benutzer erfolgreich geladen",
  updatingUserStatus: "Benutzerstatus wird aktualisiert..."
};