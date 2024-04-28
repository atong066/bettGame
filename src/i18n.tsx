import i18next from "i18next";
import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import XHR from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEnglish from "./Translation/English/translation.json";
import translationChinese from "./Translation/Chinese/translation.json";
import translationBrazil from "./Translation/Brazil/translation.json";
import translationIndonesia from "./Translation/Indonesia/translation.json";
import translationVietnamese from "./Translation/Vietnamese/translation.json";
import translationMelayu from "./Translation/Melayu/translation.json";
import translationThailand from "./Translation/Thailand/translation.json";
import translationIndia from "./Translation/India/translation.json";
import translationEspanol from "./Translation/Espanol/translation.json";
import translationJapan from "./Translation/Japan/translation.json";
const resources = {
    en: {
        ts: translationEnglish,
    },
    cn: {
        ts: translationChinese,
    },
    br: {
        ts: translationBrazil,
    },
    id: {
        ts: translationIndonesia,
    },
    vi: {
        ts: translationVietnamese,
    },
    ms: {
        ts: translationMelayu,
    },
    th: {
        ts: translationThailand,
    },
    in: {
        ts: translationIndia,
    },
    es: {
        ts: translationEspanol,
    },
    ja: {
        ts: translationJapan,
    },
}


i18next
    .use(Backend)
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'cn',
        react: {
            bindI18n: 'languageChanged',
            bindI18nStore: '',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
            useSuspense: true,
        }
    });

export default i18next;