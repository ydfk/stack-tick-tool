import type { Locale, PageId } from "@/site/config";

export function getPagePath(locale: Locale, pageId: PageId) {
  if (locale === "en") {
    if (pageId === "home") {
      return "/en/";
    }

    if (pageId === "tools") {
      return "/en/#tools";
    }

    return "/en/tools/cron-expression/";
  }

  if (pageId === "home") {
    return "/";
  }

  if (pageId === "tools") {
    return "/#tools";
  }

  return "/tools/cron-expression/";
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "zh-CN" ? "en" : "zh-CN";
}

export function normalizeSiteUrl(siteUrl: string | undefined) {
  if (!siteUrl) {
    return "";
  }

  return siteUrl.replace(/\/+$/, "");
}

export function buildAbsoluteUrl(siteUrl: string | undefined, path: string) {
  const normalized = normalizeSiteUrl(siteUrl);

  if (!normalized) {
    return path;
  }

  return `${normalized}${path}`;
}
