import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const languages = {
    ru: "Русский",
    en: "English"
}

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: "ru",
        fallbackLng: 'ru',

        interpolation: {
            escapeValue: false,
        }
    });
