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
  
  // Phone verification translations
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
  email: "E-Mail",
  phone: "Telefon",
  both: "Beides",
  emergencyContact: "Notfallkontakt",
  emergencyContactName: "Name des Notfallkontakts",
  emergencyContactPhone: "Telefonnummer des Notfallkontakts",
  emergencyContactRelationship: "Beziehung zum Notfallkontakt",
  
  errorNavigating: "Fehler bei der Navigation",
  errorLoadingFavorites: "Fehler beim Laden der Favoriten",
  noFavorites: "Keine Favoriten vorhanden"
};
