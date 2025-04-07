import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '/src/locales/en/translation.json';
import translationFR from '/src/locales/fr/translation.json';
import translationGR from '/src/locales/gr/translation.json';
import translationSP from '/src/locales/sp/translation.json';
i18n
    .use(LanguageDetector) // auto-detect language
    .use(initReactI18next) // pass to react-i18next
    .init({
        resources: {
            en: { translation: translationEN },
            fr: { translation: translationFR },
            GR: { translation: translationGR },
            SP: { translation: translationSP },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already does escaping
        },
    });

export default i18n;
