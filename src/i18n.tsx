import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from './translation/english/translation.json';
import thai from './translation/thai/translation.json';

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  lng: 'th', //default language
  resources: {
    en: {
      translation: english,
    },
    th: {
      translation: thai,
    },
  },
});

export default i18next;
