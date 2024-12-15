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
  email: "Email",
  phone: "Phone",
  both: "Both",
  emergencyContact: "Emergency contact",
  emergencyContactName: "Emergency contact name",
  emergencyContactPhone: "Emergency contact phone",
  emergencyContactRelationship: "Emergency contact relationship",
  
  errorNavigating: "Error navigating",
  errorLoadingFavorites: "Error loading favorites",
  noFavorites: "No favorites yet"
};
