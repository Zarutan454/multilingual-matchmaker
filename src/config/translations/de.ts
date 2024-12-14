import { Translations } from "../languageTypes";
import { authTranslations } from "./categories/de/auth";
import { navigationTranslations } from "./categories/de/navigation";
import { profileTranslations } from "./categories/de/profile";
import { servicesTranslations } from "./categories/de/services";
import { subscriptionTranslations } from "./categories/de/subscription";
import { availabilityTranslations } from "./categories/de/availability";
import { pricingTranslations } from "./categories/de/pricing";

export const deTranslations: Translations = {
  ...authTranslations,
  ...navigationTranslations,
  ...profileTranslations,
  ...servicesTranslations,
  ...subscriptionTranslations,
  ...availabilityTranslations,
  ...pricingTranslations,
  pricing: "Preise",
  basePrice: "Grundpreis",
  hour: "Stunde",
  priceRange: "Preisbereich",
  filters: "Filter",
  categories: "Kategorien",
  applyFilters: "Filter anwenden",
  searchProviders: "Anbieter suchen",
  typeMessage: "Nachricht eingeben",
  noMessages: "Keine Nachrichten",
  error: "Fehler",
  errorLoadingMessages: "Fehler beim Laden der Nachrichten",
  errorSendingMessage: "Fehler beim Senden der Nachricht",
  requestCall: "Anruf anfordern",
  sendMessage: "Nachricht senden",
  bookAppointment: "Termin buchen"
};
