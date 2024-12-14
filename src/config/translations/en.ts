import { Translations } from "../languageTypes";
import { authTranslations } from "./categories/auth";
import { navigationTranslations } from "./categories/navigation";
import { profileTranslations } from "./categories/profile";
import { servicesTranslations } from "./categories/services";
import { subscriptionTranslations } from "./categories/subscription";
import { availabilityTranslations } from "./categories/availability";
import { pricingTranslations } from "./categories/pricing";

export const enTranslations: Translations = {
  ...authTranslations,
  ...navigationTranslations,
  ...profileTranslations,
  ...servicesTranslations,
  ...subscriptionTranslations,
  ...availabilityTranslations,
  ...pricingTranslations,
  pricing: "Pricing",
  basePrice: "Base Price",
  hour: "Hour",
  priceRange: "Price Range",
  filters: "Filters",
  categories: "Categories",
  applyFilters: "Apply Filters",
  searchProviders: "Search Providers",
  typeMessage: "Type a message",
  noMessages: "No messages",
  error: "Error",
  errorLoadingMessages: "Error loading messages",
  errorSendingMessage: "Error sending message",
  requestCall: "Request Call",
  sendMessage: "Send Message",
  bookAppointment: "Book Appointment"
};
