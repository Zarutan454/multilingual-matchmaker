import { Translations } from "../languageTypes";
import { authTranslations } from "./categories/de/auth";
import { navigationTranslations } from "./categories/de/navigation";
import { profileTranslations } from "./categories/de/profile";
import { servicesTranslations } from "./categories/de/services";
import { subscriptionTranslations } from "./categories/de/subscription";
import { availabilityTranslations } from "./categories/de/availability";

export const deTranslations: Translations = {
  ...authTranslations,
  ...navigationTranslations,
  ...profileTranslations,
  ...servicesTranslations,
  ...subscriptionTranslations,
  ...availabilityTranslations,
  search: "Suche",
  searchProfiles: "Profile durchsuchen",
  enterLocation: "Standort eingeben",
  userManagement: "Benutzerverwaltung",
  userStatusUpdated: "Benutzerstatus aktualisiert",
  errorUpdatingUser: "Fehler beim Aktualisieren des Benutzers",
  name: "Name",
  status: "Status",
  role: "Rolle",
  actions: "Aktionen",
  notProvided: "Nicht angegeben",
  pending: "Ausstehend",
  user: "Benutzer",
  activate: "Aktivieren",
  suspend: "Sperren",
  ratings: "Bewertungen",
  ratingSubmitted: "Bewertung abgegeben",
  summary: "Zusammenfassung",
  allRatings: "Alle Bewertungen",
  rateProvider: "Anbieter bewerten",
  pleaseSelectRating: "Bitte wählen Sie eine Bewertung",
  ratingComment: "Bewertungskommentar",
  submitRating: "Bewertung absenden",
  noRatingsYet: "Noch keine Bewertungen",
  premiumMembership: "Premium-Mitgliedschaft",
  choosePlan: "Plan wählen",
  recommended: "Empfohlen",
  bookNow: "Jetzt buchen"
};
