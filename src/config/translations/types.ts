export type TranslationKey =
  | 'save'
  | 'delete'
  | 'edit'
  | 'serviceAdded'
  | 'errorSavingService'
  | 'serviceDeleted'
  | 'errorDeletingService'
  | 'loading'
  | 'errorLoadingData'
  | 'profileUpdated'
  | 'errorUpdatingProfile'
  | 'saving'
  | 'saveChanges';

export interface Translations {
  save: string;
  delete: string;
  edit: string;
  serviceAdded: string;
  errorSavingService: string;
  serviceDeleted: string;
  errorDeletingService: string;
  loading: string;
  errorLoadingData: string;
  profileUpdated: string;
  errorUpdatingProfile: string;
  saving: string;
  saveChanges: string;
  [key: string]: string;
}