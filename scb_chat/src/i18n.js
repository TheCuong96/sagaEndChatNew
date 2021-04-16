import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../locales/en.js';
import vi from '../locales/vi.js';
import moment from 'moment'
let lang = null;
// try {
//     lang = JSON.parse(localStorage.getItem('language'))
// } catch (e) { }
// console.log('dd',lang);
if (!lang) {
    lang = 'vi';
    localStorage.setItem('language', JSON.stringify(lang));
} 
moment.locale(lang)
// moment.locale('en')

// let lang = 'en';
// console.log(lang);

// the translations
const resources = {
    en: {
        translation: en
    },
    vi: {
        translation: vi
    },
};

i18n

    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: lang,
        fallbackLng: lang, // use en if detected lng is not available
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })


export default i18n;


