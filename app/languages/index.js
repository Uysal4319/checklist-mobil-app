import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import tr from './tr';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('tr'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      tr: {
        translation: tr,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18next;
