import { Translations } from "../languageTypes";
import { enTranslations } from "../translations/en";

export const itTranslations: Translations = {
  ...enTranslations,
  home: "Home",
  about: "Chi siamo",
  services: "Servizi",
  contact: "Contatti",
  register: "Registrati",
  login: "Accedi",
  email: "Email",
  password: "Password",
  confirmPassword: "Conferma password",
  submit: "Invia",
  loginSuccess: "Accesso effettuato con successo",
  loginError: "Errore di accesso",
  loginButton: "Accedi",
  noAccount: "Non hai un account?",
  registerNow: "Registrati ora",
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
  country: "Paese",
  profile: "Profilo"
};