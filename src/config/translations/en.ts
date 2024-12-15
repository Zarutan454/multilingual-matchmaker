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
  
  // Phone verification translations
  success: "Success",
  error: "Error",
  enterPhoneNumber: "Enter phone number",
  sendVerificationCode: "Send verification code",
  sendingCode: "Sending code...",
  verificationCodeSent: "Verification code sent",
  enterVerificationCode: "Enter verification code",
  verifying: "Verifying...",
  verifyCode: "Verify code",
  phoneVerified: "Phone number verified",
  invalidPhoneNumber: "Invalid phone number",
  errorSendingCode: "Error sending code",
  invalidVerificationCode: "Invalid verification code",

  // Extended profile fields translations
  gender: "Gender",
  selectGender: "Select gender",
  male: "Male",
  female: "Female",
  other: "Other",
  dateOfBirth: "Date of birth",
  nationality: "Nationality",
  languages: "Languages",
  selectLanguages: "Select languages",
  preferredCommunication: "Preferred communication",
  selectPreferredCommunication: "Select preferred communication",
  phone: "Phone",
  both: "Both",
  emergencyContact: "Emergency contact",
  emergencyContactName: "Emergency contact name",
  emergencyContactPhone: "Emergency contact phone",
  emergencyContactRelationship: "Emergency contact relationship",
  
  // Navigation and error messages
  errorNavigating: "Error navigating",
  errorLoadingFavorites: "Error loading favorites",
  noFavorites: "No favorites yet",

  // Profile related translations
  fullName: "Full Name",
  bio: "Biography",
  location: "Location",
  interests: "Interests",
  occupation: "Occupation",
  height: "Height",
  weight: "Weight",
  availabilityStatus: "Availability Status",
  gallery: "Gallery",
  serviceCategories: "Service Categories",
  availability: "Availability",
  priceRange: "Price Range",
  phoneNumber: "Phone Number",
  search: "Search",
  searchProfiles: "Search Profiles",
  enterLocation: "Enter Location",
  logout: "Logout",
  logoutSuccess: "Successfully logged out",
  logoutError: "Error logging out",

  // Additional required translations
  saveProfile: "Save Profile",
  memberSince: "Member since",
  selectAvailability: "Select availability",
  available: "Available",
  busy: "Busy",
  offline: "Offline",
  addImage: "Add Image",
  viewAllPhotos: "View All Photos",
  profileImage: "Profile Image",
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
  recentMessages: "Recent Messages",
  contacts: "Contacts",
  recentContacts: "Recent Contacts",
  favorites: "Favorites",
  yourFavorites: "Your Favorites"
};