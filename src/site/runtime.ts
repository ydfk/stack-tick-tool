import { localeStorageKey, supportedLocales, type Locale, type PageId } from "@/site/config";
import { getPagePath } from "@/site/routing";

type RootDataset = {
  locale: Locale;
  pageId: PageId;
};

function isLocale(value: string | undefined): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function readRootDataset(root: HTMLElement): RootDataset {
  const locale = root.dataset.locale;
  const pageId = root.dataset.page;

  if (!isLocale(locale) || (pageId !== "home" && pageId !== "tools" && pageId !== "cron")) {
    throw new Error("Missing page dataset.");
  }

  return { locale, pageId };
}

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }

  const locale = window.localStorage.getItem(localeStorageKey);
  return isLocale(locale ?? undefined) ? (locale as Locale) : null;
}

export function writeStoredLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(localeStorageKey, locale);
}

export function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") {
    return "zh-CN";
  }

  const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language];

  return browserLocales.some((item) => item.toLowerCase().startsWith("en")) ? "en" : "zh-CN";
}

function isBotUserAgent() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /bot|crawl|spider|slurp|bingpreview|baiduspider/i.test(navigator.userAgent);
}

export function getAutoLocaleTarget(currentLocale: Locale, pageId: PageId) {
  if (isBotUserAgent()) {
    return null;
  }

  const stored = readStoredLocale();
  const preferred: Locale = stored ?? getBrowserLocale();

  if (preferred === currentLocale) {
    return null;
  }

  return getPagePath(preferred, pageId);
}
