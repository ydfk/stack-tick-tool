import React from "react";
import { useEffect } from "react";

import {
  FeaturedSection,
  HeroSection,
  RoadmapSection,
  SiteFooter,
  SiteHeader,
} from "@/components/site/sections";
import type { Locale, PageId } from "@/site/config";
import { getAutoLocaleTarget } from "@/site/runtime";

type AppProps = {
  locale: Locale;
  pageId: PageId;
};

export function App({ locale, pageId }: AppProps) {
  useEffect(() => {
    const target = getAutoLocaleTarget(locale, pageId);

    if (target && window.location.pathname !== target) {
      window.location.replace(target);
    }
  }, [locale, pageId]);

  return (
    <div className="relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 surface-grid opacity-35" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SiteHeader locale={locale} pageId={pageId} />
        <main>
          {pageId !== "cron" ? <HeroSection locale={locale} pageId={pageId} /> : null}
          <FeaturedSection locale={locale} pageId={pageId} />
          {pageId === "tools" ? <RoadmapSection locale={locale} /> : null}
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
