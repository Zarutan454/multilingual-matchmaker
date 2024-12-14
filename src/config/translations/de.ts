import { Translations } from "../languageTypes";
import { authTranslations } from "./categories/de/auth";
import { navigationTranslations } from "./categories/de/navigation";
import { profileTranslations } from "./categories/de/profile";
import { servicesTranslations } from "./categories/de/services";
import { subscriptionTranslations } from "./categories/de/subscription";

export const deTranslations: Translations = {
  ...authTranslations,
  ...navigationTranslations,
  ...profileTranslations,
  ...servicesTranslations,
  ...subscriptionTranslations,
  // Profile translations
  fullName: "Vollständiger Name",
  bio: "Biografie",
  location: "Standort",
  interests: "Interessen",
  occupation: "Beruf",
  height: "Größe",
  weight: "Gewicht",
  availability: "Verfügbarkeit",
  availabilityStatus: "Verfügbarkeitsstatus",
  selectAvailability: "Verfügbarkeit auswählen",
  available: "Verfügbar",
  busy: "Beschäftigt",
  offline: "Offline",
  gallery: "Galerie",
  addImage: "Bild hinzufügen",
  viewAllPhotos: "Alle Fotos ansehen",
  profileImage: "Profilbild",
  saveProfile: "Profil speichern",
  memberSince: "Mitglied seit",
  serviceCategories: "Servicekategorien",
  selectServices: "Services auswählen",
  profileUpdated: "Profil aktualisiert",
  errorUpdatingProfile: "Fehler beim Aktualisieren des Profils",
  // Additional translations
  reviews: "Bewertungen",
  ratingSubmitted: "Bewertung übermittelt",
  ratings: "Bewertungen",
  summary: "Zusammenfassung",
  allRatings: "Alle Bewertungen",
  rateProvider: "Anbieter bewerten",
  pleaseSelectRating: "Bitte Bewertung auswählen",
  ratingComment: "Bewertungskommentar",
  submitRating: "Bewertung absenden",
  noRatingsYet: "Noch keine Bewertungen",
  // Provider translations
  requestCall: "Anruf anfordern",
  sendMessage: "Nachricht senden",
  bookAppointment: "Termin buchen",
  // Search translations
  search: "Suchen",
  searchProfiles: "Profile durchsuchen",
  enterLocation: "Ort eingeben",
  searchProviders: "Anbieter suchen",
  filters: "Filter",
  categories: "Kategorien",
  priceRange: "Preisbereich",
  applyFilters: "Filter anwenden",
  // KYC translations
  kycRequired: "KYC erforderlich",
  kycPending: "KYC ausstehend",
  kycApproved: "KYC genehmigt",
  kycRejected: "KYC abgelehnt",
  pleaseUploadAllDocuments: "Bitte alle Dokumente hochladen",
  kycDocumentsUploaded: "KYC-Dokumente hochgeladen",
  errorUploadingDocuments: "Fehler beim Hochladen der Dokumente",
  identityDocument: "Ausweisdokument",
  idDocumentNote: "Hinweis zum Ausweisdokument",
  businessLicense: "Gewerbeschein",
  businessLicenseNote: "Hinweis zum Gewerbeschein",
  uploading: "Wird hochgeladen",
  submitDocuments: "Dokumente einreichen",
  // Messaging translations
  typeMessage: "Nachricht eingeben",
  noMessages: "Keine Nachrichten",
  // Admin translations
  userStatusUpdated: "Benutzerstatus aktualisiert",
  errorUpdatingUser: "Fehler beim Aktualisieren des Benutzers",
  userManagement: "Benutzerverwaltung",
  name: "Name",
  status: "Status",
  role: "Rolle",
  actions: "Aktionen",
  notProvided: "Nicht angegeben",
  pending: "Ausstehend",
  user: "Benutzer",
  activate: "Aktivieren",
  suspend: "Sperren",
  // Registration translations
  age: "Alter",
  country: "Land",
  registerAsCustomer: "Als Kunde registrieren",
  registerAsProvider: "Als Anbieter registrieren",
  pricing: "Preise",
  basePrice: "Grundpreis",
  hour: "Stunde",
  no: "Nein"
};