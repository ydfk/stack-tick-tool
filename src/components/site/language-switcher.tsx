import React from "react";
import { Languages } from "lucide-react";

import { siteCopy, type Locale, type PageId } from "@/site/config";
import { getAlternateLocale, getPagePath } from "@/site/routing";
import { writeStoredLocale } from "@/site/runtime";

type LanguageSwitcherProps = {
  locale: Locale;
  pageId: PageId;
};

export function LanguageSwitcher({ locale, pageId }: LanguageSwitcherProps) {
  const alternateLocale = getAlternateLocale(locale);
  const targetPath = getPagePath(alternateLocale, pageId);
  const targetLabel = siteCopy[alternateLocale].localeLabel;

  return (
    <a
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/80 bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
      href={targetPath}
      onClick={() => writeStoredLocale(alternateLocale)}
    >
      <Languages className="h-4 w-4" />
      {targetLabel}
    </a>
  );
}
