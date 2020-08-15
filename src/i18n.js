import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from './utils/asyncStorage';
import { en, vi } from './locales';
import { LANGUAGE_ID } from './constants';

export const initI18n = async () => {
  try {
    const language = (await AsyncStorage.getLanguage()) || LANGUAGE_ID.VI;

    await i18n.use(initReactI18next).init({
      fallbackLng: LANGUAGE_ID.VI,
      lng: language,
      load: 'languageOnly',
      resources: {
        vi,
        en,
      },

      ns: [
        'course_detail',
        'notification',
        'tab_navigator',
        'download_tab',
        'search_tab',
        'authentication',
      ],
      defaultNS: 'common',

      debug: true,

      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  } catch (e) {
    console.log('initI18n -> e', e);
    throw e;
  }
};

export default i18n;
