import { Translations } from "../languageTypes";
import { enTranslations } from "../translations/en";

export const esTranslations: Translations = {
  ...enTranslations,
  phoneNumber: "Número de teléfono",
  phoneLogin: "Iniciar sesión con teléfono",
  emailLogin: "Iniciar sesión con email",
  enterPhoneNumber: "Por favor, introduce tu número de teléfono",
  otpSent: "Se ha enviado un código de verificación",
  orContinueWith: "O continuar con",
  uploadedDocuments: "Documentos subidos",
  documentsRequired: "Por favor, sube los documentos requeridos",
  invalidPhoneNumber: "Número de teléfono inválido",
  mustBe18: "Debes tener al menos 18 años",
  age: "Edad",
  country: "País"
};