import 'react-i18next';
import uk from './locales/uk/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof uk;
    };
  }
}
