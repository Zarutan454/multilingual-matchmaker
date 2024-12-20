export interface Translations {
  save: string;
  delete: string;
  edit: string;
  serviceAdded: string;
  serviceDeleted: string;
  errorAddingService: string;
  errorDeletingService: string;
  fillAllFields: string;
  pleaseLogin: string;
  [key: string]: string;
}

export type TranslationKey = keyof Translations;