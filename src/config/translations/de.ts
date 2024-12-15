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

  // Rating translations
  ratings: "Bewertungen",
  ratingSubmitted: "Bewertung erfolgreich übermittelt",
  summary: "Übersicht",
  allRatings: "Alle Bewertungen",
  rateProvider: "Anbieter bewerten",
  rating: "Bewertung",
  comment: "Kommentar",
  submitRating: "Bewertung abschicken",
  averageRating: "Durchschnittliche Bewertung",
  totalRatings: "Gesamtanzahl der Bewertungen",
  ratingDistribution: "Bewertungsverteilung",
  reviewsCount: "Bewertungen",
  writeReview: "Bewertung schreiben",
  noRatingsYet: "Noch keine Bewertungen",
  thankYouForRating: "Vielen Dank für Ihre Bewertung",
  errorSubmittingRating: "Fehler beim Übermitteln der Bewertung",
  pleaseSelectRating: "Bitte wählen Sie eine Bewertung",
  ratingComment: "Bewertungskommentar",
  pricing: "Preise",
  hour: "Stunde",
};
