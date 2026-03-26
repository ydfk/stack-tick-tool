import React, { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import { i18n, initI18n } from "@/i18n";
import "@/index.css";
import { App } from "@/site-app";
import { readRootDataset } from "@/site/runtime";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found.");
}

const rootElement = root;

const { locale, pageId } = readRootDataset(rootElement);

async function bootstrap() {
  await initI18n(locale);

  const application = (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App locale={locale} pageId={pageId} />
      </I18nextProvider>
    </StrictMode>
  );

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, application);
    return;
  }

  createRoot(rootElement).render(application);
}

void bootstrap();
