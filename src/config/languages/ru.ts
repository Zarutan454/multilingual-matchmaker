import { Translations } from "../languageTypes";
import { enTranslations } from "../translations/en";

export const ruTranslations: Translations = {
  ...enTranslations,
  phoneNumber: "Номер телефона",
  phoneLogin: "Войти по телефону",
  emailLogin: "Войти по email",
  enterPhoneNumber: "Пожалуйста, введите номер телефона",
  otpSent: "Код подтверждения отправлен",
  orContinueWith: "Или продолжить с помощью",
  uploadedDocuments: "Загруженные документы",
  documentsRequired: "Пожалуйста, загрузите необходимые документы",
  invalidPhoneNumber: "Неверный номер телефона",
  mustBe18: "Вам должно быть не менее 18 лет",
  age: "Возраст",
  country: "Страна",
  search: "Поиск",
  searchProfiles: "Поиск профилей",
  enterLocation: "Введите местоположение"
};
