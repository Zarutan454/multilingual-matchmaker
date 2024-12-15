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
  
  // Admin translations
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

  // KYC translations
  kycPending: "KYC Überprüfung ausstehend",
  kycApproved: "KYC Überprüfung genehmigt",
  kycRejected: "KYC Überprüfung abgelehnt",
  pleaseUploadAllDocuments: "Bitte laden Sie alle erforderlichen Dokumente hoch",
  kycDocumentsUploaded: "Dokumente erfolgreich hochgeladen",
  errorUploadingDocuments: "Fehler beim Hochladen der Dokumente",
  identityDocument: "Ausweisdokument",
  idDocumentNote: "Bitte laden Sie ein gültiges Ausweisdokument hoch",
  businessLicense: "Gewerbeschein",
  businessLicenseNote: "Bitte laden Sie Ihren Gewerbeschein hoch",
  uploading: "Wird hochgeladen...",
  submitDocuments: "Dokumente einreichen",
  kycRequired: "KYC Überprüfung erforderlich",
  kycStatus: "KYC Status",
  kycVerification: "KYC Verifizierung",
  documentsVerification: "Dokumentenprüfung",
  documentsNote: "Bitte stellen Sie sicher, dass alle Dokumente gut lesbar sind",

  // Phone verification translations
  success: "Erfolg",
  error: "Fehler",
  enterPhoneNumber: "Telefonnummer eingeben",
  sendVerificationCode: "Verifizierungscode senden",
  sendingCode: "Code wird gesendet...",
  verificationCodeSent: "Verifizierungscode wurde gesendet",
  enterVerificationCode: "Verifizierungscode eingeben",
  verifying: "Wird verifiziert...",
  verifyCode: "Code verifizieren",
  phoneVerified: "Telefonnummer wurde verifiziert",
  invalidPhoneNumber: "Ungültige Telefonnummer",
  errorSendingCode: "Fehler beim Senden des Codes",
  invalidVerificationCode: "Ungültiger Verifizierungscode",

  // Messaging translations
  typeMessage: "Nachricht eingeben...",
  noMessages: "Keine Nachrichten",
  errorLoadingMessages: "Fehler beim Laden der Nachrichten",
  errorSendingMessage: "Fehler beim Senden der Nachricht",
  requestCall: "Anruf anfordern",
  sendMessage: "Nachricht senden",
  bookAppointment: "Termin buchen",
  messages: "Nachrichten",

  // Extended profile fields translations
  gender: "Geschlecht",
  selectGender: "Geschlecht auswählen",
  male: "Männlich",
  female: "Weiblich",
  other: "Andere",
  dateOfBirth: "Geburtsdatum",
  nationality: "Nationalität",
  languages: "Sprachen",
  selectLanguages: "Sprachen auswählen",
  preferredCommunication: "Bevorzugte Kommunikation",
  selectPreferredCommunication: "Bevorzugte Kommunikation auswählen",
  phone: "Telefon",
  both: "Beides",
  emergencyContact: "Notfallkontakt",
  emergencyContactName: "Name des Notfallkontakts",
  emergencyContactPhone: "Telefonnummer des Notfallkontakts",
  emergencyContactRelationship: "Beziehung zum Notfallkontakt",
  
  // Navigation and error messages
  errorNavigating: "Fehler bei der Navigation",
  errorLoadingFavorites: "Fehler beim Laden der Favoriten",
  noFavorites: "Keine Favoriten vorhanden",

  // Profile related translations
  fullName: "Vollständiger Name",
  bio: "Biografie",
  location: "Standort",
  interests: "Interessen",
  occupation: "Beruf",
  height: "Größe",
  weight: "Gewicht",
  availabilityStatus: "Verfügbarkeitsstatus",
  gallery: "Galerie",
  serviceCategories: "Dienstkategorien",
  availability: "Verfügbarkeit",
  priceRange: "Preisbereich",
  phoneNumber: "Telefonnummer",
  search: "Suche",
  searchProfiles: "Profile durchsuchen",
  enterLocation: "Standort eingeben",
  logout: "Abmelden",
  logoutSuccess: "Erfolgreich abgemeldet",
  logoutError: "Fehler beim Abmelden",

  // Additional required translations
  saveProfile: "Profil speichern",
  memberSince: "Mitglied seit",
  selectAvailability: "Verfügbarkeit auswählen",
  available: "Verfügbar",
  busy: "Beschäftigt",
  offline: "Offline",
  addImage: "Bild hinzufügen",
  viewAllPhotos: "Alle Fotos ansehen",
  profileImage: "Profilbild",
  selectServices: "Dienste auswählen",
  profileUpdated: "Profil aktualisiert",
  errorUpdatingProfile: "Fehler beim Aktualisieren des Profils",
  savingProfile: "Profil wird gespeichert",
  errorUploadingAvatar: "Fehler beim Hochladen des Profilbilds",
  errorUploadingGallery: "Fehler beim Hochladen der Galerie",
  age: "Alter",
  country: "Land",
  registerAsCustomer: "Als Kunde registrieren",
  registerAsProvider: "Als Anbieter registrieren",
  recentMessages: "Letzte Nachrichten",
  contacts: "Kontakte",
  recentContacts: "Letzte Kontakte",
  favorites: "Favoriten",
  yourFavorites: "Deine Favoriten"
};