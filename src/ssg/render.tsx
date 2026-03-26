import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { I18nextProvider } from "react-i18next";

import { i18n, initI18n } from "@/i18n";
import type { Locale, PageId } from "@/site/config";
import { App } from "@/site-app";

export async function renderPage(pageId: PageId, locale: Locale) {
  await initI18n(locale);

  return renderToString(
    createElement(
      I18nextProvider,
      { i18n },
      createElement(App, { locale, pageId }),
    ),
  );
}
