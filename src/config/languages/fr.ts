import { Translations } from "../languageTypes";
import { enTranslations } from "../translations/en";

export const frTranslations: Translations = {
  ...enTranslations,
  phoneNumber: "Numéro de téléphone",
  phoneLogin: "Se connecter avec téléphone",
  emailLogin: "Se connecter avec email",
  enterPhoneNumber: "Veuillez entrer votre numéro de téléphone",
  otpSent: "Un code de vérification a été envoyé",
  orContinueWith: "Ou continuer avec",
  uploadedDocuments: "Documents téléchargés",
  documentsRequired: "Veuillez télécharger les documents requis",
  invalidPhoneNumber: "Numéro de téléphone invalide",
  mustBe18: "Vous devez avoir au moins 18 ans",
  age: "Âge",
  country: "Pays"
};