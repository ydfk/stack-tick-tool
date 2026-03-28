import React from "react";

import { CronGuideSection, CronSeoSection, FaqSection, FeaturedSection, RelatedLinksSection } from "@/components/site/sections";
import type { Locale } from "@/site/config";

type CronPageProps = {
  locale: Locale;
};

export function CronPage({ locale }: CronPageProps) {
  return (
    <>
      <FeaturedSection locale={locale} pageId="cron" />
      <RelatedLinksSection locale={locale} />
    </>
  );
}
