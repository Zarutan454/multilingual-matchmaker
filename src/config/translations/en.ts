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
  // Additional translations
  reviews: "Reviews",
  ratingSubmitted: "Rating Submitted",
  ratings: "Ratings",
  summary: "Summary",
  allRatings: "All Ratings",
  rateProvider: "Rate Provider",
  pleaseSelectRating: "Please Select Rating",
  ratingComment: "Rating Comment",
  submitRating: "Submit Rating",
  noRatingsYet: "No Ratings Yet",
  // Provider translations
  requestCall: "Request Call",
  sendMessage: "Send Message",
  bookAppointment: "Book Appointment",
  // Search translations
  search: "Search",
  searchProfiles: "Search profiles",
  enterLocation: "Enter location",
};
