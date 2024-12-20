import { TranslationKey } from '../types/translationTypes';

const translations: Partial<Record<TranslationKey, string>> = {
  'auth.verification.title': 'Altersverifikation',
  'auth.verification.question': 'Sind Sie mindestens 18 Jahre alt?',
  'auth.verification.disclaimer': 'Mit dem Fortfahren bestätigen Sie, dass Sie volljährig sind.',
  'auth.verification.yes': 'Ja, ich bin über 18',
  'auth.verification.no': 'Nein, ich bin unter 18'
};

export default translations;
