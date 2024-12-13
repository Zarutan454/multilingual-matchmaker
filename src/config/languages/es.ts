import { Translations } from "../languageTypes";
import { enTranslations } from "../translations/en";

export const esTranslations: Translations = {
  ...enTranslations,
  home: "Inicio",
  about: "Sobre nosotros",
  services: "Servicios",
  contact: "Contacto",
  register: "Registrarse",
  login: "Iniciar sesión",
  email: "Correo electrónico",
  password: "Contraseña",
  confirmPassword: "Confirmar contraseña",
  submit: "Enviar",
  loginSuccess: "Sesión iniciada correctamente",
  loginError: "Error al iniciar sesión",
  loginButton: "Iniciar sesión",
  noAccount: "¿No tienes cuenta?",
  registerNow: "Regístrate ahora",
  phoneNumber: "Número de teléfono",
  phoneLogin: "Iniciar sesión con teléfono",
  emailLogin: "Iniciar sesión con correo",
  enterPhoneNumber: "Por favor, introduce tu número de teléfono",
  otpSent: "Se ha enviado un código de verificación",
  orContinueWith: "O continuar con",
  uploadedDocuments: "Documentos subidos",
  documentsRequired: "Por favor, sube los documentos requeridos",
  invalidPhoneNumber: "Número de teléfono inválido",
  mustBe18: "Debes tener al menos 18 años",
  age: "Edad",
  country: "País",
  profile: "Perfil"
};