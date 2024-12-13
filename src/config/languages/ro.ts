import { Translations } from "../languageTypes";
import { enTranslations } from "../translations/en";

export const roTranslations: Translations = {
  ...enTranslations,
  phoneNumber: "Număr de telefon",
  phoneLogin: "Conectare cu telefon",
  emailLogin: "Conectare cu email",
  enterPhoneNumber: "Vă rugăm introduceți numărul de telefon",
  otpSent: "Un cod de verificare a fost trimis",
  orContinueWith: "Sau continuați cu",
  uploadedDocuments: "Documente încărcate",
  documentsRequired: "Vă rugăm să încărcați documentele necesare",
  invalidPhoneNumber: "Număr de telefon invalid",
  mustBe18: "Trebuie să aveți cel puțin 18 ani",
  age: "Vârstă",
  country: "Țară"
};