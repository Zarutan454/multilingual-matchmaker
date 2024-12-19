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

  // Rating translations
  ratings: "Ratings",
  ratingSubmitted: "Rating submitted successfully",
  summary: "Summary",
  allRatings: "All Ratings",
  rateProvider: "Rate Provider",
  rating: "Rating",
  comment: "Comment",
  submitRating: "Submit Rating",
  averageRating: "Average Rating",
  totalRatings: "Total Ratings",
  ratingDistribution: "Rating Distribution",
  reviewsCount: "Reviews",
  writeReview: "Write a Review",
  noRatingsYet: "No ratings yet",
  thankYouForRating: "Thank you for your rating",
  errorSubmittingRating: "Error submitting rating",
  pleaseSelectRating: "Please select a rating",
  ratingComment: "Rating comment",

  // Rating criteria translations
  communicationRating: "Communication",
  professionalismRating: "Professionalism",
  cleanlinessRating: "Cleanliness",
  locationRating: "Location",
  valueRating: "Value for Money",
  pleaseRateAllCriteria: "Please rate all criteria",
  overallRating: "Overall Rating",
};
