import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enLocale from '#/configs/locales/en.json';
import viLocale from '#/configs/locales/vi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    lng: localStorage.getItem('locale') || 'vi',
    resources: {
      en: {
        translation: enLocale,
      },
      vi: {
        translation: viLocale,
      },
    },
  });

export default i18n;
