import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { renderPage } from "../src/ssg/render";
import { buildAbsoluteUrl } from "../src/site/routing";
import type { Locale, PageId } from "../src/site/config";

type RouteTarget = {
  distPath: string;
  pageId: PageId;
  locale: Locale;
  pathName: string;
};

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

const routes: RouteTarget[] = [
  { distPath: path.join(distDir, "index.html"), pageId: "home", locale: "zh-CN", pathName: "/" },
  { distPath: path.join(distDir, "en", "index.html"), pageId: "home", locale: "en", pathName: "/en/" },
  {
    distPath: path.join(distDir, "tools", "cron-expression", "index.html"),
    pageId: "cron",
    locale: "zh-CN",
    pathName: "/tools/cron-expression/",
  },
  {
    distPath: path.join(distDir, "en", "tools", "cron-expression", "index.html"),
    pageId: "cron",
    locale: "en",
    pathName: "/en/tools/cron-expression/",
  },
];

async function main() {
  for (const route of routes) {
    const html = await readFile(route.distPath, "utf8");
    const rendered = await renderPage(route.pageId, route.locale);
    const nextHtml = html.replace(
      /(<div id="root"[^>]*>)(.*?)(<\/div>)/s,
      `$1${rendered}$3`,
    );

    await writeFile(route.distPath, nextHtml, "utf8");
  }

  const siteUrl = await readSiteUrl();
  await writeSitemap(siteUrl);
  await writeRobots(siteUrl);
}

async function readSiteUrl() {
  const envFiles = [".env", ".env.production"];
  const envValues: Record<string, string> = {};

  for (const fileName of envFiles) {
    const filePath = path.join(rootDir, fileName);

    try {
      const content = await readFile(filePath, "utf8");

      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) {
          continue;
        }

        const [key, ...rest] = trimmed.split("=");
        envValues[key.trim()] = rest.join("=").trim();
      }
    } catch {}
  }

  return process.env.VITE_SITE_URL?.trim() || envValues.VITE_SITE_URL || "https://example.com";
}

async function writeSitemap(siteUrl: string) {
  const urls = routes
    .map((route) => {
      const absoluteUrl = buildAbsoluteUrl(siteUrl, route.pathName);
      return `  <url><loc>${absoluteUrl}</loc></url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
}

async function writeRobots(siteUrl: string) {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${buildAbsoluteUrl(siteUrl, "/sitemap.xml")}\n`;
  await writeFile(path.join(distDir, "robots.txt"), robots, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
