import 'react-i18next';
import {uk} from './locales/uk/translation.json';
console.log(uk);

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof uk;
    };
  }
}
