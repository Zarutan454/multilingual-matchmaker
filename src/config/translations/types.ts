export interface Translations {
  save: string;
  delete: string;
  edit: string;
  serviceAdded: string;
  errorAddingService: string;
  serviceDeleted: string;
  errorDeletingService: string;
  fillAllFields: string;
  pleaseLogin: string;
  profileUpdated: string;
  errorUpdatingProfile: string;
  galleryUpdated: string;
  imageDeleted: string;
  errorDeletingImage: string;
  [key: string]: string;
}

export type TranslationKey = keyof Translations;