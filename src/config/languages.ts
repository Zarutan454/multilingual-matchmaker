export type Language = "de" | "en" | "ru" | "ro" | "it" | "es" | "fr";

export type TranslationKey =
  | "home"
  | "about"
  | "services"
  | "contact"
  | "iAmAWoman"
  | "iAmAMan"
  | "register"
  | "login"
  | "customerRegistration"
  | "providerRegistration"
  | "profileImage"
  | "uploadDocuments"
  | "email"
  | "password"
  | "confirmPassword"
  | "registerAsCustomer"
  | "registerAsProvider"
  | "submit"
  | "documentsNote";

export const languages: Record<
  Language,
  { name: string; flag: string; translations: Record<TranslationKey, string> }
> = {
  de: {
    name: "Deutsch",
    flag: "🇩🇪",
    translations: {
      home: "Startseite",
      about: "Über uns",
      services: "Dienstleistungen",
      contact: "Kontakt",
      iAmAWoman: "Ich bin eine Frau",
      iAmAMan: "Ich bin ein Mann",
      register: "Registrieren",
      login: "Anmelden",
      customerRegistration: "Als Kunde registrieren",
      providerRegistration: "Als Dienstleister registrieren",
      profileImage: "Profilbild",
      uploadDocuments: "Dokumente hochladen",
      email: "E-Mail",
      password: "Passwort",
      confirmPassword: "Passwort bestätigen",
      registerAsCustomer: "Als Kunde registrieren",
      registerAsProvider: "Als Dienstleister registrieren",
      submit: "Absenden",
      documentsNote: "Bitte laden Sie relevante Dokumente hoch (PDF, Bilder)",
    },
  },
  en: {
    name: "English",
    flag: "🇬🇧",
    translations: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      iAmAWoman: "I am a woman",
      iAmAMan: "I am a man",
      register: "Register",
      login: "Login",
      customerRegistration: "Register as Customer",
      providerRegistration: "Register as Provider",
      profileImage: "Profile Image",
      uploadDocuments: "Upload Documents",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      registerAsCustomer: "Register as Customer",
      registerAsProvider: "Register as Provider",
      submit: "Submit",
      documentsNote: "Please upload relevant documents (PDF, images)",
    },
  },
  ru: {
    name: "Русский",
    flag: "🇷🇺",
    translations: {
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      contact: "Контакты",
      iAmAWoman: "Я женщина",
      iAmAMan: "Я мужчина",
      register: "Регистрация",
      login: "Вход",
      customerRegistration: "Регистрация клиента",
      providerRegistration: "Регистрация поставщика услуг",
      profileImage: "Фото профиля",
      uploadDocuments: "Загрузить документы",
      email: "Эл. почта",
      password: "Пароль",
      confirmPassword: "Подтвердить пароль",
      registerAsCustomer: "Зарегистрироваться как клиент",
      registerAsProvider: "Зарегистрироваться как поставщик",
      submit: "Отправить",
      documentsNote: "Загрузите необходимые документы (PDF, изображения)",
    },
  },
  ro: {
    name: "Română",
    flag: "🇷🇴",
    translations: {
      home: "Acasă",
      about: "Despre",
      services: "Servicii",
      contact: "Contact",
      iAmAWoman: "Sunt femeie",
      iAmAMan: "Sunt bărbat",
      register: "Înregistrare",
      login: "Autentificare",
      customerRegistration: "Înregistrare ca client",
      providerRegistration: "Înregistrare ca furnizor",
      profileImage: "Imagine profil",
      uploadDocuments: "Încărcare documente",
      email: "Email",
      password: "Parolă",
      confirmPassword: "Confirmă parola",
      registerAsCustomer: "Înregistrare ca client",
      registerAsProvider: "Înregistrare ca furnizor",
      submit: "Trimite",
      documentsNote: "Vă rugăm să încărcați documentele relevante (PDF, imagini)",
    },
  },
  it: {
    name: "Italiano",
    flag: "🇮🇹",
    translations: {
      home: "Home",
      about: "Chi siamo",
      services: "Servizi",
      contact: "Contatti",
      iAmAWoman: "Sono una donna",
      iAmAMan: "Sono un uomo",
      register: "Registrati",
      login: "Accedi",
      customerRegistration: "Registrati come cliente",
      providerRegistration: "Registrati come fornitore",
      profileImage: "Immagine profilo",
      uploadDocuments: "Carica documenti",
      email: "Email",
      password: "Password",
      confirmPassword: "Conferma password",
      registerAsCustomer: "Registrati come cliente",
      registerAsProvider: "Registrati come fornitore",
      submit: "Invia",
      documentsNote: "Carica i documenti pertinenti (PDF, immagini)",
    },
  },
  es: {
    name: "Español",
    flag: "🇪🇸",
    translations: {
      home: "Inicio",
      about: "Sobre nosotros",
      services: "Servicios",
      contact: "Contacto",
      iAmAWoman: "Soy mujer",
      iAmAMan: "Soy hombre",
      register: "Registrarse",
      login: "Iniciar sesión",
      customerRegistration: "Registrarse como cliente",
      providerRegistration: "Registrarse como proveedor",
      profileImage: "Imagen de perfil",
      uploadDocuments: "Subir documentos",
      email: "Correo electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      registerAsCustomer: "Registrarse como cliente",
      registerAsProvider: "Registrarse como proveedor",
      submit: "Enviar",
      documentsNote: "Por favor, sube los documentos relevantes (PDF, imágenes)",
    },
  },
  fr: {
    name: "Français",
    flag: "🇫🇷",
    translations: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      contact: "Contact",
      iAmAWoman: "Je suis une femme",
      iAmAMan: "Je suis un homme",
      register: "S'inscrire",
      login: "Se connecter",
      customerRegistration: "S'inscrire comme client",
      providerRegistration: "S'inscrire comme prestataire",
      profileImage: "Photo de profil",
      uploadDocuments: "Télécharger des documents",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      registerAsCustomer: "S'inscrire comme client",
      registerAsProvider: "S'inscrire comme prestataire",
      submit: "Envoyer",
      documentsNote: "Veuillez télécharger les documents pertinents (PDF, images)",
    },
  },
};