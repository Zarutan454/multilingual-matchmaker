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
  
  search: "Suche",
  searchProfiles: "Profile durchsuchen",
  enterLocation: "Standort eingeben",
  
  ratings: "Bewertungen",
  ratingSubmitted: "Bewertung erfolgreich übermittelt",
  summary: "Zusammenfassung",
  allRatings: "Alle Bewertungen",
  rateProvider: "Anbieter bewerten",
  pleaseSelectRating: "Bitte wählen Sie eine Bewertung",
  ratingComment: "Ihr Kommentar",
  submitRating: "Bewertung absenden",
  noRatingsYet: "Noch keine Bewertungen",
  reviews: "Rezensionen"
};
