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
  resetFilters: "Filter zurücksetzen",

  // Rating criteria translations
  communicationRating: "Kommunikation",
  professionalismRating: "Professionalität",
  cleanlinessRating: "Sauberkeit",
  locationRating: "Standort",
  valueRating: "Preis-Leistung",
  pleaseRateAllCriteria: "Bitte bewerten Sie alle Kriterien",
  overallRating: "Gesamtbewertung",

  "auth.verification.title": "Altersverifikation",
  "auth.verification.question": "Sind Sie 18 Jahre oder älter?",
  "auth.verification.accessDenied": "Zugriff verweigert",
  "auth.verification.mustBe18": "Sie müssen mindestens 18 Jahre alt sein",
  "auth.verification.legalDisclaimer": "Diese Website enthält Inhalte für Erwachsene. Mit dem Fortfahren bestätigen Sie, dass Sie volljährig sind und die Gesetze Ihres Landes einhalten.",
  "auth.verification.proceedingNote": "Durch Fortfahren akzeptieren Sie unsere Nutzungsbedingungen und bestätigen die Einhaltung lokaler Gesetze.",
  
  "admin.content.blogPosts": "Blog-Beiträge",
  "admin.content.news": "Neuigkeiten",
  "admin.content.systemLogs": "System-Protokolle",
  "admin.content.manageBlogContent": "Verwalten Sie hier Ihre Blog-Inhalte",
  "admin.content.editComingSoon": "Bearbeitungsfunktion kommt in Kürze",
  "admin.content.newBlogPost": "Neuer Blog-Beitrag",
  
  "common.edit": "Bearbeiten",
  "common.yes": "Ja",
  "common.no": "Nein",
  "common.terms": "AGB",
  "common.privacy": "Datenschutz",
};
