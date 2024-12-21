export interface TranslationKeys {
  // Auth related translations
  login: string;
  register: string;
  logout: string;
  email: string;
  password: string;
  
  // Profile related translations
  profile: string;
  settings: string;
  services: string;
  availability: string;
  
  // Common actions
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  
  // Service related
  serviceAdded: string;
  serviceDeleted: string;
  errorAddingService: string;
  errorDeletingService: string;
  errorLoadingServices: string;
  
  // Form fields
  fullName: string;
  location: string;
  bio: string;
  interests: string;
  occupation: string;
  
  // Status messages
  loading: string;
  error: string;
  success: string;
  profileUpdated: string;
  errorUpdatingProfile: string;
  saving: string;
  saveChanges: string;
  errorLoadingData: string;
}

export type Translations = {
  [K in keyof TranslationKeys]: string;
};