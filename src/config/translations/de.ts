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

  // User Management translations
  userManagement: "Benutzerverwaltung",
  name: "Name",
  email: "E-Mail",
  status: "Status",
  role: "Rolle",
  actions: "Aktionen",
  notProvided: "Nicht angegeben",
  pending: "Ausstehend",
  user: "Benutzer",
  activate: "Aktivieren",
  suspend: "Sperren",
  userStatusUpdated: "Benutzerstatus erfolgreich aktualisiert",
  errorUpdatingUser: "Fehler beim Aktualisieren des Benutzerstatus",
  updatingUserStatus: "Aktualisiere Benutzerstatus...",
  errorFetchingUsers: "Fehler beim Laden der Benutzer",
  errorRefetchingUsers: "Fehler beim Neuladen der Benutzer",
  usersLoadedSuccessfully: "Benutzer erfolgreich geladen",
  errorLoadingUsers: "Fehler beim Laden der Benutzer",
  tryAgain: "Erneut versuchen",
  loadingUsers: "Lade Benutzer...",
};