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

  // Common translations
  loadingUsers: "Benutzer werden geladen...",
  favorites: "Favoriten",
  yourFavorites: "Deine Favoriten",
  noFavoritesSelected: "Keine Favoriten ausgewählt",
  errorNavigating: "Fehler beim Navigieren",
  usersLoadedSuccessfully: "Benutzer erfolgreich geladen",
  updatingUserStatus: "Benutzerstatus wird aktualisiert...",
  
  // Additional translations
  messages: "Nachrichten",
  recentMessages: "Letzte Nachrichten",
  noMessages: "Keine Nachrichten",
  typeMessage: "Nachricht schreiben...",
  send: "Senden",
  online: "Online",
  offline: "Offline",
  lastSeen: "Zuletzt gesehen",
  availability: "Verfügbarkeit",
  gallery: "Galerie",
  viewAllPhotos: "Alle Fotos ansehen",
  contactInfo: "Kontaktinformationen",
  about: "Über mich",
  services: "Dienstleistungen",
  reviews: "Bewertungen",
  writeReview: "Bewertung schreiben",
  bookNow: "Jetzt buchen",
  profile: "Profil",
  settings: "Einstellungen",
  logout: "Abmelden",
  search: "Suche",
  filter: "Filter",
  location: "Standort",
  price: "Preis",
  categories: "Kategorien",
  applyFilters: "Filter anwenden",
  resetFilters: "Filter zurücksetzen"
};