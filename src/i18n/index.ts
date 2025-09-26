import * as RNLocalize from 'react-native-localize';
import {en, pl, uk} from './locales/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

console.log('--- Debug: Loaded UK resources object ---');
console.log(JSON.stringify(uk.petPage, null, 2)); // Виводимо лише частину, щоб не забивати консоль
console.log('--- End Debug ---');

const resources = {
  uk: {
    translation: uk,
  },
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
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
      callback('en');
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
    supportedLngs: ['en', 'pl', 'uk'],
    compatibilityJSON: 'v4',
    resources,
    fallbackLng: 'en',
    debug: __DEV__,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export {i18next as i18n};
