import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import VueI18Next from 'vue-i18next';
import translationEN from "@/locales/en/translation.json";
import translationPT from "@/locales/pt/translation.json";

const fallbackLng = ['en'];
const availableLanguages = ['en', 'pt'];
const resources = {
  en: { translation: translationEN },
  pt: { translation: translationPT }
};

i18n
  .use(Backend) // load translations using http (default                                               public/assets/locals/en/translations)
  .use(LanguageDetector) // detect user language
  .use(VueI18Next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng, // fallback language is english.
    resources,
    detection: { checkWhitelist: true }, // options for language detection
    debug: false,
    whitelist: availableLanguages,
    interpolation: { escapeValue: false },    // no need for react. it escapes by default
  });

export default i18n;