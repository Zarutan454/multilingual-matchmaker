import { Translations } from "../languageTypes";
import { enTranslations } from "../translations/en";

export const roTranslations: Translations = {
  ...enTranslations,
  home: "Acasă",
  about: "Despre noi",
  services: "Servicii",
  contact: "Contact",
  register: "Înregistrare",
  login: "Autentificare",
  email: "Email",
  password: "Parolă",
  confirmPassword: "Confirmă parola",
  submit: "Trimite",
  loginSuccess: "Autentificare reușită",
  loginError: "Eroare la autentificare",
  loginButton: "Autentificare",
  noAccount: "Nu ai cont?",
  registerNow: "Înregistrează-te acum",
  phoneNumber: "Număr de telefon",
  phoneLogin: "Autentificare cu telefon",
  emailLogin: "Autentificare cu email",
  enterPhoneNumber: "Te rugăm să introduci numărul de telefon",
  otpSent: "A fost trimis un cod de verificare",
  orContinueWith: "Sau continuă cu",
  uploadedDocuments: "Documente încărcate",
  documentsRequired: "Te rugăm să încarci documentele necesare",
  invalidPhoneNumber: "Număr de telefon invalid",
  mustBe18: "Trebuie să ai cel puțin 18 ani",
  age: "Vârstă",
  country: "Țară",
  profile: "Profil"
};