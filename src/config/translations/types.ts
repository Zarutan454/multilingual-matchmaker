export type TranslationKey =
  | 'save'
  | 'delete'
  | 'edit'
  | 'serviceAdded'
  | 'errorSavingService'
  | 'serviceDeleted'
  | 'errorDeletingService'
  | 'loading'
  | 'errorLoadingData';

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
  [key: string]: string;
}