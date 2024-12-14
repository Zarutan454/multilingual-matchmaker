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
  // Profile translations
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
  profileImage: "Profile Image",
  saveProfile: "Save Profile",
  memberSince: "Member Since",
  serviceCategories: "Service Categories",
  selectServices: "Select Services",
  profileUpdated: "Profile Updated",
  errorUpdatingProfile: "Error Updating Profile",
  savingProfile: "Saving Profile...",
  errorUploadingAvatar: "Error uploading profile image",
  errorUploadingGallery: "Error uploading gallery images",
};
