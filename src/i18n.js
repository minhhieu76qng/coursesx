import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { getLocalizationAsync } from 'expo-localization'
import { en, vi } from './locales';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (_callback) => {
    // return getLocalizationAsync().then(({ locale }) => {
    //   callback(locale);
    // });
    return 'vi';
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    resources: {
      vi,
      en,
    },

    ns: ['course_detail', 'error', 'tab_navigator', 'download_tab'],
    defaultNS: 'common',

    debug: true,

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
