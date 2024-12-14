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
  // Add any missing translations here
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
  profileImage: "Profilbild"
};