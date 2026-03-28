import React from "react";

import {
  CronGuideSection,
  CronSeoSection,
  FaqSection,
  FeaturedSection,
  RelatedLinksSection,
} from "@/components/site/sections";
import type { Locale } from "@/site/config";

type CronPageProps = {
  locale: Locale;
};

export function CronPage({ locale }: CronPageProps) {
  return (
    <>
      <FeaturedSection locale={locale} pageId="cron" />
      <CronGuideSection locale={locale} />
      <CronSeoSection locale={locale} />
      <RelatedLinksSection locale={locale} />
      <FaqSection locale={locale} />
    </>
  );
}
