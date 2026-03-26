import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { siteCopy, supportedLocales, type Locale } from "@/site/config";

const resources = {
  "zh-CN": {
    translation: {
      site: siteCopy["zh-CN"],
    },
  },
  en: {
    translation: {
      site: siteCopy.en,
    },
  },
} as const;

export async function initI18n(locale: Locale) {
  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: "zh-CN",
      supportedLngs: supportedLocales,
      interpolation: {
        escapeValue: false,
      },
    });

    return i18n;
  }

  if (i18n.language !== locale) {
    await i18n.changeLanguage(locale);
  }

  return i18n;
}

export { i18n };
