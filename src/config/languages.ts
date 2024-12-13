import { Language } from "./languageTypes";
import { deTranslations } from "./translations/de";
import { enTranslations } from "./translations/en";

export * from "./languageTypes";

export const languages: Record<
  Language,
  { name: string; flag: string; translations: typeof enTranslations }
> = {
  de: {
    name: "Deutsch",
    flag: "🇩🇪",
    translations: deTranslations
  },
  en: {
    name: "English",
    flag: "🇬🇧",
    translations: enTranslations
  },
  ru: {
    name: "Русский",
    flag: "🇷🇺",
    translations: {
      ...enTranslations,
      // Russische Übersetzungen hier hinzufügen
      changePassword: "Изменить пароль",
      changeEmail: "Изменить email",
      newPassword: "Новый пароль",
      newEmail: "Новый email",
      updatePassword: "Обновить пароль",
      updateEmail: "Обновить email",
      passwordUpdated: "Пароль обновлен",
      emailUpdated: "Email обновлен",
      errorUpdatingPassword: "Ошибка при обновлении пароля",
      errorUpdatingEmail: "Ошибка при обновлении email",
      emailRequired: "Требуется указать email",
      dangerZone: "Опасная зона",
      deleteAccount: "Удалить аккаунт",
      deleteAccountConfirm: "Подтвердить удаление аккаунта",
      deleteAccountWarning: "Это действие нельзя отменить. Все ваши данные будут удалены навсегда.",
      cancel: "Отмена",
      confirmDelete: "Да, удалить аккаунт",
      accountDeleted: "Ваш аккаунт был успешно удален",
      errorDeletingAccount: "Ошибка при удалении аккаунта",
      updating: "Обновление...",
      deleting: "Удаление..."
    }
  },
  ro: {
    name: "Română",
    flag: "🇷🇴",
    translations: {
      ...enTranslations,
      // Rumänische Übersetzungen hier hinzufügen
      changePassword: "Schimbă parola",
      changeEmail: "Schimbă email",
      newPassword: "Parolă nouă",
      newEmail: "Email nou",
      updatePassword: "Actualizează parola",
      updateEmail: "Actualizează email",
      passwordUpdated: "Parola actualizată",
      emailUpdated: "Email actualizat",
      errorUpdatingPassword: "Eroare la actualizarea parolei",
      errorUpdatingEmail: "Eroare la actualizarea email-ului",
      emailRequired: "Email-ul este obligatoriu",
      dangerZone: "Zonă periculoasă",
      deleteAccount: "Șterge cont",
      deleteAccountConfirm: "Confirmă ștergerea contului",
      deleteAccountWarning: "Această acțiune nu poate fi anulată. Toate datele dvs. vor fi șterse permanent.",
      cancel: "Anulează",
      confirmDelete: "Da, șterge contul",
      accountDeleted: "Contul dvs. a fost șters cu succes",
      errorDeletingAccount: "Eroare la ștergerea contului",
      updating: "Se actualizează...",
      deleting: "Se șterge..."
    }
  },
  it: {
    name: "Italiano",
    flag: "🇮🇹",
    translations: {
      ...enTranslations,
      // Italienische Übersetzungen hier hinzufügen
      changePassword: "Cambia password",
      changeEmail: "Cambia email",
      newPassword: "Nuova password",
      newEmail: "Nuova email",
      updatePassword: "Aggiorna password",
      updateEmail: "Aggiorna email",
      passwordUpdated: "Password aggiornata",
      emailUpdated: "Email aggiornata",
      errorUpdatingPassword: "Errore durante l'aggiornamento della password",
      errorUpdatingEmail: "Errore durante l'aggiornamento dell'email",
      emailRequired: "Email richiesta",
      dangerZone: "Zona pericolosa",
      deleteAccount: "Elimina account",
      deleteAccountConfirm: "Conferma eliminazione account",
      deleteAccountWarning: "Questa azione non può essere annullata. Tutti i tuoi dati verranno eliminati permanentemente.",
      cancel: "Annulla",
      confirmDelete: "Sì, elimina account",
      accountDeleted: "Il tuo account è stato eliminato con successo",
      errorDeletingAccount: "Errore durante l'eliminazione dell'account",
      updating: "Aggiornamento in corso...",
      deleting: "Eliminazione in corso..."
    }
  },
  es: {
    name: "Español",
    flag: "🇪🇸",
    translations: {
      ...enTranslations,
      // Spanische Übersetzungen hier hinzufügen
      changePassword: "Cambiar contraseña",
      changeEmail: "Cambiar email",
      newPassword: "Nueva contraseña",
      newEmail: "Nuevo email",
      updatePassword: "Actualizar contraseña",
      updateEmail: "Actualizar email",
      passwordUpdated: "Contraseña actualizada",
      emailUpdated: "Email actualizado",
      errorUpdatingPassword: "Error al actualizar la contraseña",
      errorUpdatingEmail: "Error al actualizar el email",
      emailRequired: "El email es requerido",
      dangerZone: "Zona de peligro",
      deleteAccount: "Eliminar cuenta",
      deleteAccountConfirm: "Confirmar eliminación de cuenta",
      deleteAccountWarning: "Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.",
      cancel: "Cancelar",
      confirmDelete: "Sí, eliminar cuenta",
      accountDeleted: "Tu cuenta ha sido eliminada exitosamente",
      errorDeletingAccount: "Error al eliminar la cuenta",
      updating: "Actualizando...",
      deleting: "Eliminando..."
    }
  },
  fr: {
    name: "Français",
    flag: "🇫🇷",
    translations: {
      ...enTranslations,
      // Französische Übersetzungen hier hinzufügen
      changePassword: "Changer le mot de passe",
      changeEmail: "Changer l'email",
      newPassword: "Nouveau mot de passe",
      newEmail: "Nouvel email",
      updatePassword: "Mettre à jour le mot de passe",
      updateEmail: "Mettre à jour l'email",
      passwordUpdated: "Mot de passe mis à jour",
      emailUpdated: "Email mis à jour",
      errorUpdatingPassword: "Erreur lors de la mise à jour du mot de passe",
      errorUpdatingEmail: "Erreur lors de la mise à jour de l'email",
      emailRequired: "L'email est requis",
      dangerZone: "Zone dangereuse",
      deleteAccount: "Supprimer le compte",
      deleteAccountConfirm: "Confirmer la suppression du compte",
      deleteAccountWarning: "Cette action ne peut pas être annulée. Toutes vos données seront définitivement supprimées.",
      cancel: "Annuler",
      confirmDelete: "Oui, supprimer le compte",
      accountDeleted: "Votre compte a été supprimé avec succès",
      errorDeletingAccount: "Erreur lors de la suppression du compte",
      updating: "Mise à jour en cours...",
      deleting: "Suppression en cours..."
    }
  }
};