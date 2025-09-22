import * as RNLocalize from 'react-native-localize';
import {en, pl, uk} from './locales';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
  uk: {
    translation: uk,
  },
};

const LANGUAGE_KEY = 'appLanguage';

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLang) {
        console.log(savedLang);
        return callback(savedLang);
      }
      const locales = RNLocalize.getLocales();
      const systemLang = locales[0]?.languageCode || 'en';
      callback(systemLang);
    } catch (error) {
      console.log('Error reading language from AsyncStorage', error);
    }
  },
  init: () => {},
  cacheUserLanguage: async (lang: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    } catch (error) {
      console.log('Error saving language to AsyncStorage', error);
    }
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export {i18next as i18n};
