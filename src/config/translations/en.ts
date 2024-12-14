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
  
  search: "Search",
  searchProfiles: "Search Profiles",
  enterLocation: "Enter Location",
  fullName: "Full Name",
  bio: "Biography",
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
  serviceCategories: "Service Categories",
  selectServices: "Select Services",
  profileUpdated: "Profile Updated",
  errorUpdatingProfile: "Error Updating Profile",
  savingProfile: "Saving Profile",
  errorUploadingAvatar: "Error Uploading Avatar",
  errorUploadingGallery: "Error Uploading Gallery",
  age: "Age",
  country: "Country",
  registerAsCustomer: "Register as Customer",
  registerAsProvider: "Register as Provider",
  pricing: "Pricing",
  basePrice: "Base Price",
  hour: "Hour",
  priceRange: "Price Range",
  filters: "Filters",
  categories: "Categories",
  applyFilters: "Apply Filters",
  searchProviders: "Search Providers",
  typeMessage: "Type a message",
  noMessages: "No Messages",
  error: "Error",
  errorLoadingMessages: "Error Loading Messages",
  errorSendingMessage: "Error Sending Message",
  requestCall: "Request Call",
  sendMessage: "Send Message",
  bookAppointment: "Book Appointment",
  yes: "Yes",
  no: "No",
  saveProfile: "Save Profile",
  memberSince: "Member Since",
  userManagement: "User Management",
  userStatusUpdated: "User Status Updated",
  name: "Name",
  email: "Email",
  status: "Status",
  role: "Role",
  actions: "Actions",
  activate: "Activate",
  suspend: "Suspend",
  notProvided: "Not Provided",
  pending: "Pending",
  user: "User",
  errorUpdatingUser: "Error Updating User",
  logout: "Logout",
  logoutSuccess: "Successfully logged out",
  logoutError: "Error logging out",
  recentMessages: "Recent Messages",
  contacts: "Contacts",
  recentContacts: "Recent Contacts",
  favorites: "Favorites",
  yourFavorites: "Your Favorites"
};