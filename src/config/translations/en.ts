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
  
  // Admin translations
  userManagement: "User Management",
  userStatusUpdated: "User status updated",
  errorUpdatingUser: "Error updating user",
  name: "Name",
  status: "Status",
  role: "Role",
  actions: "Actions",
  notProvided: "Not provided",
  pending: "Pending",
  user: "User",
  activate: "Activate",
  suspend: "Suspend",

  // KYC translations
  kycPending: "KYC verification pending",
  kycApproved: "KYC verification approved",
  kycRejected: "KYC verification rejected",
  pleaseUploadAllDocuments: "Please upload all required documents",
  kycDocumentsUploaded: "Documents uploaded successfully",
  errorUploadingDocuments: "Error uploading documents",
  identityDocument: "Identity Document",
  idDocumentNote: "Please upload a valid identity document",
  businessLicense: "Business License",
  businessLicenseNote: "Please upload your business license",
  uploading: "Uploading...",
  submitDocuments: "Submit Documents",
  kycRequired: "KYC verification required",
  kycStatus: "KYC Status",
  kycVerification: "KYC Verification",
  documentsVerification: "Documents Verification",
  documentsNote: "Please ensure all documents are clearly legible",

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

  // Messaging translations
  typeMessage: "Type a message...",
  noMessages: "No messages",
  errorLoadingMessages: "Error loading messages",
  errorSendingMessage: "Error sending message",
  requestCall: "Request Call",
  sendMessage: "Send Message",
  bookAppointment: "Book Appointment",
  messages: "Messages",

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