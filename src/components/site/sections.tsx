import React from "react";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";

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
  const title = isHomePage ? copy.hero.title : copy.featured.title;
  const description = isHomePage ? copy.hero.description : copy.featured.description;

  const primaryHref = isHomePage ? getPagePath(locale, "cron") : getPagePath(locale, "home");
  const secondaryHref = isHomePage ? getPagePath(locale, "tools") : getPagePath(locale, "tools");
  const primaryLabel = isHomePage ? copy.hero.primaryCta : copy.nav.home;
  const secondaryLabel = isHomePage ? copy.hero.secondaryCta : copy.nav.tools;

  return (
    <section className="grid gap-6 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:py-16">
      <div className="space-y-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          {isHomePage ? copy.hero.eyebrow : copy.featured.eyebrow}
        </div>
        <div className="space-y-5">
          <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-92"
            href={primaryHref}
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white/75 px-5 py-3 text-sm font-semibold transition hover:border-primary/35 hover:text-primary"
            href={secondaryHref}
          >
            {secondaryLabel}
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {copy.hero.stats.map((stat) => (
            <span
              key={stat.label}
              className="rounded-full border border-border/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <span className="mr-2 font-display text-sm font-bold text-foreground">{stat.value}</span>
              {stat.label}
            </span>
          ))}
        </div>
      </div>

      <div className="surface-card rounded-[2rem] border border-white/70 p-6 sm:p-8">
        <div className="rounded-[1.6rem] border border-border/80 bg-white/75 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            {copy.featured.eyebrow}
          </p>
          <div className="mt-4 rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(15,111,101,0.12),rgba(255,255,255,0.92))] p-5">
            <div className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Linux / Quartz
            </div>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-foreground">
              {copy.cronTool.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.cronTool.subtitle}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {copy.cronTool.examples.slice(0, 2).map((example) => (
                <span
                  key={example.value}
                  className="rounded-full border border-primary/15 bg-white/85 px-3 py-1.5 font-mono text-xs text-primary"
                >
                  {example.value}
                </span>
              ))}
            </div>
            <a
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-92"
              href={getPagePath(locale, "cron")}
            >
              {copy.hero.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
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
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <div className="surface-card rounded-[2rem] border border-white/70 p-6 sm:p-8">
            <div className="space-y-5">
              <div className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                Linux / Quartz
              </div>
              <h3 className="font-display text-3xl font-bold tracking-tight">{copy.cronTool.title}</h3>
              <p className="text-base leading-8 text-muted-foreground">{copy.cronTool.subtitle}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {copy.cronTool.examples.map((example) => (
                  <div key={example.value} className="rounded-[1.3rem] border border-border/80 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-foreground">{example.label}</p>
                    <p className="mt-2 font-mono text-sm text-primary">{example.value}</p>
                  </div>
                ))}
              </div>
              <a
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-92"
                href={getPagePath(locale, "cron")}
              >
                {copy.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="surface-card rounded-[2rem] border border-white/70 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">{locale === "zh-CN" ? "更多工具" : "More Tools"}</p>
            <div className="mt-4 space-y-3">
              {copy.roadmap.items.slice(1, 5).map((item) => (
                <div key={item.title} className="rounded-[1.3rem] border border-border/80 bg-white/70 p-4">
                  <p className="font-display text-lg font-bold text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            <a
              className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
              href={getPagePath(locale, "tools")}
            >
              {copy.hero.secondaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
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
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{copy.cronTool.examplesLabel}</p>
        <div className="mt-6 space-y-4">
          {copy.cronTool.examples.map((example) => (
            <div
              key={example.value}
              className="rounded-[1.4rem] border border-border/80 bg-white/70 p-4 text-sm leading-7 text-muted-foreground"
            >
              <p className="font-semibold text-foreground">{example.label}</p>
              <p className="mt-2 font-mono text-primary">{example.value}</p>
            </div>
          ))}
          {copy.cronGuide.notes.map((note) => (
            <div key={note} className="rounded-[1.4rem] bg-[var(--input)] p-4 text-sm leading-7 text-muted-foreground">
              {note}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CronSeoSection({ locale: _locale }: Pick<SharedSectionProps, "locale">) {
  const copy = useSiteCopy();

  return (
    <section className="space-y-6 py-10">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <SectionHeading
            eyebrow={copy.cronSeo.compareEyebrow}
            title={copy.cronSeo.compareTitle}
            description={copy.cronSeo.compareDescription}
          />
        </div>
        {copy.cronSeo.compareItems.map((item) => (
          <div key={item.title} className="surface-card rounded-[1.8rem] border border-white/70 p-5">
            <p className="font-display text-xl font-bold text-foreground">{item.title}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="surface-card rounded-[2rem] border border-white/70 p-6 sm:p-8">
        <SectionHeading
          eyebrow={copy.cronSeo.symbolEyebrow}
          title={copy.cronSeo.symbolTitle}
          description={copy.cronSeo.symbolDescription}
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {copy.cronSeo.symbolItems.map((item) => (
            <div key={item.symbol} className="rounded-[1.5rem] border border-border/80 bg-white/70 p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-primary px-3 font-mono text-sm font-bold text-primary-foreground">
                  {item.symbol}
                </span>
                <p className="font-semibold text-foreground">{item.title}</p>
              </div>
              <p className="mt-3 rounded-xl bg-[var(--input)] px-3 py-2 font-mono text-sm text-primary">{item.example}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card rounded-[2rem] border border-white/70 p-6 sm:p-8">
        <SectionHeading
          eyebrow={copy.cronSeo.scenarioEyebrow}
          title={copy.cronSeo.scenarioTitle}
          description={copy.cronSeo.scenarioDescription}
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {copy.cronSeo.scenarioItems.map((item) => (
            <div key={item.expression} className="rounded-[1.5rem] border border-border/80 bg-white/70 p-4">
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="mt-3 rounded-xl bg-[var(--input)] px-3 py-2 font-mono text-sm text-primary">
                {item.expression}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card rounded-[2rem] border border-white/70 p-6 sm:p-8">
        <SectionHeading
          eyebrow={copy.cronSeo.mistakeEyebrow}
          title={copy.cronSeo.mistakeTitle}
          description={copy.cronSeo.mistakeDescription}
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {copy.cronSeo.mistakeItems.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-border/80 bg-white/70 p-4">
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="mt-3 rounded-xl bg-[var(--input)] px-3 py-2 font-mono text-sm text-primary">
                {item.expression}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
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
    <section className="space-y-6 py-10" id="tools">
      <SectionHeading eyebrow={copy.roadmap.eyebrow} title={copy.roadmap.title} description={copy.roadmap.description} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {copy.roadmap.items.map((item, index) => (
          <div key={item.title} className="surface-card rounded-[1.8rem] border border-white/70 p-5">
            <p className="font-display text-xl font-bold">{item.title}</p>
            {index === 0 ? (
              <a
                className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-92"
                href={getPagePath(locale, "cron")}
              >
                {locale === "zh-CN" ? "打开 Cron 表达式生成器" : "Open Cron Expression Builder"}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RelatedLinksSection({ locale }: Pick<SharedSectionProps, "locale">) {
  return (
    <section className="space-y-6 py-10">
      <SectionHeading
        eyebrow={locale === "zh-CN" ? "相关入口" : "Related links"}
        title={locale === "zh-CN" ? "继续浏览站内其它高相关页面" : "Continue to closely related pages"}
        description={
            locale === "zh-CN"
              ? "用明确锚文本把首页、更多工具区和当前 Cron 页面连接起来，有助于用户浏览，也更利于搜索引擎理解站点结构。"
            : "Clear internal anchors connect the homepage, the more-tools section, and the cron page for both users and search engines."
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AnchorCard
          actionLabel={locale === "zh-CN" ? "查看首页" : "Open homepage"}
          description={
            locale === "zh-CN"
              ? "返回品牌首页，查看当前主推工具和后续工具布局。"
              : "Go back to the product homepage and the current core tool."
          }
          href={getPagePath(locale, "home")}
          label={locale === "zh-CN" ? "程序员在线工具箱首页" : "Developer Toolbox Homepage"}
        />
        <AnchorCard
          actionLabel={locale === "zh-CN" ? "浏览更多工具" : "Browse more tools"}
          description={
            locale === "zh-CN"
              ? "查看首页中的更多工具区和后续扩展方向。"
              : "Browse the more-tools section on the homepage and the next expansion areas."
          }
          href={getPagePath(locale, "tools")}
          label={locale === "zh-CN" ? "更多工具" : "More Tools"}
        />
        <AnchorCard
          actionLabel={locale === "zh-CN" ? "打开当前工具" : "Open cron tool"}
          description={
            locale === "zh-CN"
              ? "重新回到当前工作台，继续使用 Cron 表达式生成与解析。"
              : "Jump back into the cron builder and parser workbench."
          }
          href={getPagePath(locale, "cron")}
          label={locale === "zh-CN" ? "Cron 表达式生成器与解析器" : "Cron Expression Builder and Parser"}
        />
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

type AnchorCardProps = {
  href: string;
  label: string;
  description: string;
  actionLabel: string;
};

function AnchorCard({ href, label, description, actionLabel }: AnchorCardProps) {
  return (
    <a
      className="surface-card cursor-pointer rounded-[1.8rem] border border-white/70 p-5 transition hover:border-primary/30 hover:text-primary"
      href={href}
    >
      <p className="font-display text-xl font-bold text-foreground">{label}</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <span>{actionLabel}</span>
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}
