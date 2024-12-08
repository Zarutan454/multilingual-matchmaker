export const languages = {
  de: {
    name: "Deutsch",
    code: "de",
    flag: "🇩🇪",
    translations: {
      welcome: "Willkommen",
      ageVerification: "Altersverifikation",
      ageQuestion: "Sind Sie über 18 Jahre alt?",
      yes: "Ja",
      no: "Nein",
      accessDenied: "Zugriff verweigert",
      home: "Startseite",
      about: "Über uns",
      services: "Dienstleistungen",
      contact: "Kontakt",
    },
  },
  en: {
    name: "English",
    code: "en",
    flag: "🇬🇧",
    translations: {
      welcome: "Welcome",
      ageVerification: "Age Verification",
      ageQuestion: "Are you over 18 years old?",
      yes: "Yes",
      no: "No",
      accessDenied: "Access Denied",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
  },
  ru: {
    name: "Русский",
    code: "ru",
    flag: "🇷🇺",
    translations: {
      welcome: "Добро пожаловать",
      ageVerification: "Проверка возраста",
      ageQuestion: "Вам больше 18 лет?",
      yes: "Да",
      no: "Нет",
      accessDenied: "Доступ запрещен",
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      contact: "Контакты",
    },
  },
};

export type Language = keyof typeof languages;
export type TranslationKey = keyof typeof languages.de.translations;