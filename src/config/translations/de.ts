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
  savingProfile: "Profil wird gespeichert...",
  errorUploadingAvatar: "Fehler beim Hochladen des Profilbilds",
  errorUploadingGallery: "Fehler beim Hochladen der Galeriebilder",
};
