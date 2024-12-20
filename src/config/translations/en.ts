import { TranslationKey } from '../types/translationTypes';

const translations: Partial<Record<TranslationKey, string>> = {
  'auth.verification.title': 'Age Verification',
  'auth.verification.question': 'Are you at least 18 years old?',
  'auth.verification.disclaimer': 'By continuing, you confirm that you are of legal age.',
  'auth.verification.yes': 'Yes, I am over 18',
  'auth.verification.no': 'No, I am under 18'
};

export default translations;
