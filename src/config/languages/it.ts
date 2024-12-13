import { Translations } from "../languageTypes";
import { enTranslations } from "../translations/en";

export const itTranslations: Translations = {
  ...enTranslations,
  phoneNumber: "Numero di telefono",
  phoneLogin: "Accedi con telefono",
  emailLogin: "Accedi con email",
  enterPhoneNumber: "Inserisci il numero di telefono",
  otpSent: "È stato inviato un codice di verifica",
  orContinueWith: "O continua con",
  uploadedDocuments: "Documenti caricati",
  documentsRequired: "Carica i documenti richiesti",
  invalidPhoneNumber: "Numero di telefono non valido",
  mustBe18: "Devi avere almeno 18 anni",
  age: "Età",
  country: "Paese"
};