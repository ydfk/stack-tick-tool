import React from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Clock3, Globe, Search, Sparkles } from "lucide-react";

import { CronWorkbench } from "@/components/site/cron-workbench";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { useSiteCopy } from "@/i18n/use-site-copy";
import { brandDisplay, brandName, type Locale, type PageId } from "@/site/config";
import { appVersion, getSiteIcpRecord, icpRecordUrl } from "@/site/env";
import { getPagePath } from "@/site/routing";

type SharedSectionProps = {
  locale: Locale;
  pageId: PageId;
};

export function SiteHeader({ locale, pageId }: SharedSectionProps) {
  const copy = useSiteCopy();
  const isCronPage = pageId === "cron";
  const toolsPath = getPagePath(locale, "tools");

  return (
    <header className={`sticky top-0 z-10 backdrop-blur-md ${isCronPage ? "py-2.5" : "py-4"}`}>
      <div
        className={`surface-card mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 ${
          isCronPage ? "gap-3 px-4 py-3" : "gap-4 px-5 py-4"
        }`}
      >
        <a className="flex min-w-0 items-center gap-3" href={getPagePath(locale, "home")}>
          <div
            className={`flex items-center justify-center rounded-2xl bg-primary text-primary-foreground ${
              isCronPage ? "h-10 w-10" : "h-11 w-11"
            }`}
          >
            <Clock3 className={isCronPage ? "h-4 w-4" : "h-5 w-5"} />
          </div>
          <div className="min-w-0">
            <p className="font-display truncate text-lg font-bold">{brandName}</p>
            <p className="truncate text-sm text-muted-foreground">{brandDisplay}</p>
          </div>
        </a>

        <nav className="hidden items-center text-sm font-medium text-muted-foreground md:flex md:gap-6">
          <a className="transition hover:text-primary" href={getPagePath(locale, "home")}>
            {copy.nav.home}
          </a>
          <a className="transition hover:text-primary" href={toolsPath}>
            {copy.nav.tools}
          </a>
          <a className="transition hover:text-primary" href={getPagePath(locale, "cron")}>
            {copy.nav.cron}
          </a>
        </nav>

        <LanguageSwitcher locale={locale} pageId={pageId} />
      </div>
    </header>
  );
}

export function HeroSection({ locale, pageId }: SharedSectionProps) {
  const copy = useSiteCopy();
  const isHomePage = pageId === "home";
  const isToolsPage = pageId === "tools";
  const title = isHomePage ? copy.hero.title : isToolsPage ? copy.toolsPage.title : copy.featured.title;
  const description = isHomePage
    ? copy.hero.description
    : isToolsPage
      ? copy.toolsPage.description
      : copy.featured.description;

  return (
    <section className="grid gap-6 py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-16">
      <div className="space-y-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-4 py-2 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          {isHomePage ? copy.hero.eyebrow : isToolsPage ? copy.toolsPage.eyebrow : copy.featured.eyebrow}
        </div>
        <div className="space-y-5">
          <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-92"
            href={
              isHomePage
                ? getPagePath(locale, "cron")
                : isToolsPage
                  ? getPagePath(locale, "cron")
                  : getPagePath(locale, "home")
            }
          >
            {isHomePage ? copy.hero.primaryCta : isToolsPage ? copy.toolsPage.primaryCta : copy.nav.home}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white/70 px-5 py-3 text-sm font-semibold transition hover:border-primary/35 hover:text-primary"
            href={
              isHomePage
                ? getPagePath(locale, "tools")
                : isToolsPage
                  ? getPagePath(locale, "home")
                  : getPagePath(locale, "tools")
            }
          >
            {isHomePage ? copy.hero.secondaryCta : isToolsPage ? copy.toolsPage.secondaryCta : copy.nav.tools}
          </a>
        </div>
      </div>

      <div className="surface-card surface-grid rounded-[2rem] border border-white/70 p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {copy.hero.stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.4rem] bg-white/70 p-4 shadow-sm">
              <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4">
          <FeatureItem icon={Search} title="SEO-first" description={copy.architecture.items[0]?.description ?? ""} />
          <FeatureItem icon={Globe} title="Bilingual" description={copy.architecture.items[1]?.description ?? ""} />
          <FeatureItem
            icon={Clock3}
            title={isHomePage ? "Practical" : isToolsPage ? copy.nav.tools : copy.cronGuide.eyebrow}
            description={
              isHomePage
                ? copy.featured.description
                : isToolsPage
                  ? copy.roadmap.description
                  : copy.cronGuide.description
            }
          />
        </div>
      </div>
    </section>
  );
}

export function FeaturedSection({ locale, pageId }: SharedSectionProps) {
  const copy = useSiteCopy();

  if (pageId === "home") {
    return (
      <section className="space-y-6 py-10">
        <SectionHeading eyebrow={copy.featured.eyebrow} title={copy.featured.title} description={copy.featured.description} />
        <div className="surface-card rounded-[2rem] border border-white/70 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4">
              <div className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                Quartz 6/7
              </div>
              <h3 className="font-display text-3xl font-bold tracking-tight">
                {copy.cronTool.title}
              </h3>
              <p className="text-base leading-8 text-muted-foreground">{copy.cronTool.subtitle}</p>
              <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                <li>{copy.cronTool.descriptionLabel}</li>
                <li>{copy.cronTool.nextRunsLabel}</li>
                <li>{copy.cronGuide.notes[0]}</li>
              </ul>
              <a
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-92"
                href={getPagePath(locale, "cron")}
              >
                {copy.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-[1.8rem] border border-border/80 bg-white/65 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Preview
              </p>
              <div className="mt-4 space-y-3">
                {copy.cronTool.examples.map((example) => (
                  <div key={example.value} className="rounded-2xl bg-[var(--input)] px-4 py-3">
                    <p className="text-sm font-semibold text-foreground">{example.label}</p>
                    <p className="mt-1 font-mono text-sm text-primary">{example.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (pageId === "tools") {
    return null;
  }

  return (
    <section className="py-4 sm:py-6">
      <CronWorkbench locale={locale} />
    </section>
  );
}

export function CronGuideSection({ locale: _locale }: Pick<SharedSectionProps, "locale">) {
  const copy = useSiteCopy();

  return (
    <section className="grid gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <div className="surface-card rounded-[2rem] border border-white/70 p-6 sm:p-8">
        <SectionHeading eyebrow={copy.cronGuide.eyebrow} title={copy.cronGuide.title} description={copy.cronGuide.description} />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {copy.cronGuide.fields.map((field) => (
            <div key={field.name} className="rounded-[1.4rem] border border-border/80 bg-white/65 p-4">
              <p className="font-display text-xl font-bold">{field.name}</p>
              <p className="mt-1 text-sm font-medium text-primary">{field.range}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{field.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card rounded-[2rem] border border-white/70 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Quartz Notes
        </p>
        <div className="mt-6 space-y-4">
          {copy.cronGuide.notes.map((note) => (
            <div key={note} className="rounded-[1.4rem] bg-white/70 p-4 text-sm leading-7 text-muted-foreground">
              {note}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArchitectureSection({ locale: _locale }: Pick<SharedSectionProps, "locale">) {
  const copy = useSiteCopy();

  return (
    <section className="space-y-6 py-10">
      <SectionHeading eyebrow={copy.architecture.eyebrow} title={copy.architecture.title} description={copy.architecture.description} />
      <div className="grid gap-4 lg:grid-cols-4">
        {copy.architecture.items.map((item) => (
          <div key={item.title} className="surface-card rounded-[1.8rem] border border-white/70 p-5">
            <p className="font-display text-xl font-bold">{item.title}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RoadmapSection({ locale }: Pick<SharedSectionProps, "locale">) {
  const copy = useSiteCopy();

  return (
    <section className="space-y-6 py-10" id="roadmap">
      <SectionHeading eyebrow={copy.roadmap.eyebrow} title={copy.roadmap.title} description={copy.roadmap.description} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {copy.roadmap.items.map((item, index) => (
          <div key={item.title} className="surface-card rounded-[1.8rem] border border-white/70 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-bold">{item.title}</p>
                {index === 0 ? (
                  <a
                    className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-92"
                    href={getPagePath(locale, "cron")}
                  >
                    {copy.nav.cron}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                {item.badge}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqSection({ locale: _locale }: Pick<SharedSectionProps, "locale">) {
  const copy = useSiteCopy();

  return (
    <section className="space-y-6 py-10">
      <SectionHeading eyebrow={copy.faq.eyebrow} title={copy.faq.title} />
      <div className="grid gap-4 lg:grid-cols-3">
        {copy.faq.items.map((item) => (
          <div key={item.question} className="surface-card rounded-[1.8rem] border border-white/70 p-5">
            <p className="font-display text-xl font-bold">{item.question}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter({ locale }: Pick<SharedSectionProps, "locale">) {
  const copy = useSiteCopy().footer;
  const icpRecord = locale === "zh-CN" ? getSiteIcpRecord() : "";

  return (
    <footer className="border-t border-border/70 py-10">
      <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-foreground">{copy.title}</p>
          <p>{copy.description}</p>
        </div>
        <div className="flex flex-col gap-1 text-left sm:text-right">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:justify-end">
            <span>{copy.copyright}</span>
            <span>
              {copy.versionLabel} v{appVersion}
            </span>
          </div>
          {icpRecord ? (
            <a
              className="transition hover:text-primary"
              href={icpRecordUrl}
              rel="noreferrer"
              target="_blank"
            >
              {copy.icpLabel} {icpRecord}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-8 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

type FeatureItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-[1.5rem] bg-white/72 p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-lg font-bold">{title}</p>
        <p className="mt-1 text-sm leading-7 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
