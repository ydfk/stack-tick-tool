import React from "react";

import { FeaturedSection, HeroSection, RoadmapSection } from "@/components/site/sections";
import type { Locale } from "@/site/config";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  return (
    <>
      <HeroSection locale={locale} pageId="home" />
      <FeaturedSection locale={locale} pageId="home" />
      <RoadmapSection locale={locale} />
    </>
  );
}
