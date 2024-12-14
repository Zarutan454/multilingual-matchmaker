import { Translations } from "../languageTypes";
import { authTranslations } from "./categories/auth";
import { navigationTranslations } from "./categories/navigation";
import { profileTranslations } from "./categories/profile";
import { servicesTranslations } from "./categories/services";
import { subscriptionTranslations } from "./categories/subscription";

export const enTranslations: Translations = {
  ...authTranslations,
  ...navigationTranslations,
  ...profileTranslations,
  ...servicesTranslations,
  ...subscriptionTranslations,
  // Add any missing translations here
  fullName: "Full Name",
  bio: "Bio",
  location: "Location",
  interests: "Interests",
  occupation: "Occupation",
  height: "Height",
  weight: "Weight",
  availability: "Availability",
  availabilityStatus: "Availability Status",
  selectAvailability: "Select Availability",
  available: "Available",
  busy: "Busy",
  offline: "Offline",
  gallery: "Gallery",
  addImage: "Add Image",
  viewAllPhotos: "View All Photos",
  profileImage: "Profile Image"
};