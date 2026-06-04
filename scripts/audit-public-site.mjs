#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const baseUrl = (process.env.AUDIT_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const routeTimeoutMs = Number(process.env.AUDIT_ROUTE_TIMEOUT_MS || 30000);
const stabilizeMs = Number(process.env.AUDIT_STABILIZE_MS || 500);
const minTouchTargetPx = 44;
const minBlogArticleWords = 550;
const minServiceWords = 180;
const minHomeIntroLength = 80;
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1eakesum";
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-02";
const findings = [];

const secretPattern =
  /AIza|sk_live|sk_test|service_role|BEGIN PRIVATE KEY|SANITY_API_READ_TOKEN=|RESEND_API_KEY=.+[A-Za-z0-9]|GOOGLE_API_KEY=.+[A-Za-z0-9]|APIFY_API_KEY=.+[A-Za-z0-9]|STUDIO_BASIC_AUTH_PASSWORD=.+[A-Za-z0-9]|PASSWORD=.+[A-Za-z0-9]|SECRET=.+[A-Za-z0-9]|TOKEN=.+[A-Za-z0-9]|Bearer [A-Za-z0-9._-]{20,}/;
const norwegianCharacterEscapePattern =
  /&(aring|oslash|aelig|Aring|Oslash|AElig);|\\u00(e5|f8|e6|c5|d8|c6)/;
const serverRenderWarningPattern =
  /@portabletext\/react|Unknown block type|style=["'][^"']*display\s*:\s*none/i;

function addFinding(scope, issue, value) {
  findings.push({ scope, issue, value });
}

function decodeHtmlJson(text) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
}

async function fetchText(path, init) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    signal: AbortSignal.timeout(routeTimeoutMs),
  });
  const text = await response.text();
  return { response, text };
}

async function fetchSanity(query) {
  const searchParams = new URLSearchParams({ query });
  const response = await fetch(
    `https://${sanityProjectId}.apicdn.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}?${searchParams}`,
    { signal: AbortSignal.timeout(routeTimeoutMs) },
  );

  if (!response.ok) {
    addFinding("sanity", "query_status", response.status);
    return null;
  }

  const payload = await response.json();
  return payload.result;
}

async function getSitemapRoutes() {
  const { response, text } = await fetchText("/sitemap.xml");
  if (response.status !== 200) {
    addFinding("/sitemap.xml", "status", response.status);
    return [];
  }

  const routes = [...text.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(
    (match) => match[1] || "/",
  );

  if (routes.length === 0) {
    addFinding("/sitemap.xml", "empty_sitemap", "No routes found");
  }

  return routes;
}

async function auditSeo(routes) {
  for (const route of routes) {
    const { response, text: html } = await fetchText(route);
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || "";
    const description =
      html
        .match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1]
        ?.trim() || "";
    const canonical =
      html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)?.[1]?.trim() ||
      "";
    const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
    const hasNoIndex = /noindex/i.test(html);
    const jsonLdMatches = [
      ...html.matchAll(
        /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
      ),
    ];

    if (response.status !== 200) addFinding(route, "status", response.status);
    if (serverRenderWarningPattern.test(html)) {
      addFinding(route, "server_render_warning_in_html", "Hidden or visible render warning found");
    }
    if (title.length < 20 || title.length > 70) {
      addFinding(route, "title_length", { length: title.length, title });
    }
    if (description.length < 70 || description.length > 170) {
      addFinding(route, "description_length", {
        length: description.length,
        description,
      });
    }
    if (!canonical) addFinding(route, "missing_canonical", true);
    if (h1Count !== 1) addFinding(route, "h1_count", h1Count);
    if (hasNoIndex) addFinding(route, "unexpected_noindex", true);
    if (jsonLdMatches.length === 0) addFinding(route, "missing_json_ld", true);

    for (const [index, match] of jsonLdMatches.entries()) {
      try {
        JSON.parse(decodeHtmlJson(match[1]));
      } catch (error) {
        addFinding(route, "json_ld_parse", {
          index,
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }
}

async function auditRuntime(routes) {
  let chromium;

  try {
    ({ chromium } = await import("playwright"));
  } catch {
    addFinding("runtime", "missing_playwright_dependency", "Run npm install");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1440, height: 900 },
  ];

  try {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });
      const consoleErrors = [];

      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });
      page.on("pageerror", (error) => {
        consoleErrors.push(`pageerror: ${error.message}`);
      });

      for (const route of routes) {
        consoleErrors.length = 0;

        const response = await page.goto(`${baseUrl}${route}`, {
          waitUntil: "domcontentloaded",
          timeout: routeTimeoutMs,
        });
        await page.waitForTimeout(stabilizeMs);

        const metrics = await page.evaluate((minimumTouchTargetPx) => {
          const labelText = (element) => {
            if (!element.id) return "";
            const label = document.querySelector(`label[for="${CSS.escape(element.id)}"]`);
            return label?.textContent?.trim() || "";
          };
          const accessibleName = (element) =>
            (
              element.getAttribute("aria-label") ||
              element.getAttribute("title") ||
              labelText(element) ||
              element.innerText ||
              [...(element.querySelectorAll?.("img[alt]") || [])]
                .map((image) => image.getAttribute("alt"))
                .join(" ")
            ).trim();

          const documentWidth = Math.max(
            document.documentElement.scrollWidth,
            document.body.scrollWidth,
          );

          const focusablesMissingName = [
            ...document.querySelectorAll(
              'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])',
            ),
          ]
            .filter((element) => {
              const styles = getComputedStyle(element);
              return (
                !element.disabled &&
                element.getAttribute("aria-hidden") !== "true" &&
                styles.display !== "none" &&
                styles.visibility !== "hidden"
              );
            })
            .map((element) => ({
              tag: element.tagName,
              text: accessibleName(element),
              href: element.getAttribute("href") || null,
            }))
            .filter((element) => !element.text);

          const tooSmallTouchTargets = [
            ...document.querySelectorAll("a,button,input,select,textarea"),
          ]
            .map((element) => {
              const rect = element.getBoundingClientRect();
              const styles = getComputedStyle(element);
              const inViewport =
                rect.bottom > 0 &&
                rect.top < window.innerHeight &&
                rect.right > 0 &&
                rect.left < window.innerWidth;
              const visible =
                !element.disabled &&
                element.getAttribute("aria-hidden") !== "true" &&
                styles.display !== "none" &&
                styles.visibility !== "hidden" &&
                rect.width > 0 &&
                rect.height > 0 &&
                inViewport;

              return {
                tag: element.tagName,
                text: accessibleName(element).replace(/\s+/g, " ").slice(0, 90),
                href: element.getAttribute("href") || null,
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                top: Math.round(rect.top),
                visible,
              };
            })
            .filter(
              (element) =>
                element.visible &&
                (element.width < minimumTouchTargetPx ||
                  element.height < minimumTouchTargetPx),
            )
            .map((element) => ({
              tag: element.tag,
              text: element.text,
              href: element.href,
              width: element.width,
              height: element.height,
              top: element.top,
            }));

          const brokenVisibleImages = [...document.images]
            .filter((image) => {
              const rect = image.getBoundingClientRect();
              return (
                rect.bottom > 0 &&
                rect.top < window.innerHeight &&
                rect.width > 1 &&
                rect.height > 1 &&
                (!image.complete || image.naturalWidth === 0 || image.naturalHeight === 0)
              );
            })
            .map((image) => image.currentSrc || image.src);

          const ids = [...document.querySelectorAll("[id]")]
            .map((element) => element.id)
            .filter(Boolean);
          const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

          const articleText = document.querySelector("article")?.innerText || "";
          const articleWordCount =
            articleText.match(/[A-Za-zÀ-ž0-9]+(?:[-’'][A-Za-zÀ-ž0-9]+)*/g)?.length || 0;
          const internalArticleLinksWithTarget = [...document.querySelectorAll("article a[href^='/']")]
            .filter((link) => link.getAttribute("target"))
            .map((link) => ({
              href: link.getAttribute("href"),
              target: link.getAttribute("target"),
              text: accessibleName(link).replace(/\s+/g, " ").slice(0, 90),
            }));

          return {
            overflow: documentWidth - window.innerWidth,
            h1Count: document.querySelectorAll("h1").length,
            articleWordCount,
            duplicateIds,
            internalArticleLinksWithTarget,
            focusablesMissingName,
            tooSmallTouchTargets,
            brokenVisibleImages,
          };
        }, minTouchTargetPx);

        if (response?.status() !== 200) {
          addFinding(`${viewport.name}:${route}`, "status", response?.status());
        }
        if (consoleErrors.length) {
          addFinding(`${viewport.name}:${route}`, "console_errors", consoleErrors.slice(0, 5));
        }
        if (metrics.overflow > 0) {
          addFinding(`${viewport.name}:${route}`, "horizontal_overflow", metrics.overflow);
        }
        if (metrics.h1Count !== 1) {
          addFinding(`${viewport.name}:${route}`, "h1_count", metrics.h1Count);
        }
        if (metrics.duplicateIds.length) {
          addFinding(`${viewport.name}:${route}`, "duplicate_ids", metrics.duplicateIds);
        }
        if (/^\/blogg\/[^/]+$/.test(route) && metrics.articleWordCount < minBlogArticleWords) {
          addFinding(`${viewport.name}:${route}`, "thin_blog_article", {
            wordCount: metrics.articleWordCount,
            minimum: minBlogArticleWords,
          });
        }
        if (metrics.internalArticleLinksWithTarget.length) {
          addFinding(
            `${viewport.name}:${route}`,
            "internal_article_links_with_target",
            metrics.internalArticleLinksWithTarget,
          );
        }
        if (metrics.focusablesMissingName.length) {
          addFinding(
            `${viewport.name}:${route}`,
            "focusables_missing_name",
            metrics.focusablesMissingName,
          );
        }
        if (metrics.tooSmallTouchTargets.length) {
          addFinding(
            `${viewport.name}:${route}`,
            "too_small_touch_targets",
            metrics.tooSmallTouchTargets.slice(0, 10),
          );
        }
        if (metrics.brokenVisibleImages.length) {
          addFinding(
            `${viewport.name}:${route}`,
            "broken_visible_images",
            metrics.brokenVisibleImages,
          );
        }
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }
}

async function auditSecurityHeaders() {
  const { response } = await fetchText("/");
  const expectedHeaders = [
    ["strict-transport-security", "max-age=31536000; includeSubDomains"],
    ["x-content-type-options", "nosniff"],
    ["x-frame-options", "DENY"],
    ["referrer-policy", "strict-origin-when-cross-origin"],
    ["permissions-policy", "camera=(), microphone=(), geolocation=()"],
  ];

  for (const [header, expectedValue] of expectedHeaders) {
    const actualValue = response.headers.get(header);

    if (actualValue !== expectedValue) {
      addFinding("/", "security_header", { header, actualValue, expectedValue });
    }
  }
}

async function auditSecurityControls() {
  const auditRunId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const auditClientKey = (suffix) => `audit-public-site-${auditRunId}-${suffix}`;

  const studio = await fetch(`${baseUrl}/studio`, {
    signal: AbortSignal.timeout(routeTimeoutMs),
  });

  if (![401, 403, 404, 302].includes(studio.status)) {
    addFinding("/studio", "public_admin_surface", studio.status);
  }

  const robots = await fetchText("/robots.txt");
  for (const rule of ["Disallow: /api/", "Disallow: /studio", "Disallow: /studio/"]) {
    if (!robots.text.includes(rule)) {
      addFinding("/robots.txt", "missing_rule", rule);
    }
  }

  const invalidJson = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": auditClientKey("invalid-json"),
    },
    body: "{bad",
    signal: AbortSignal.timeout(routeTimeoutMs),
  });
  if (invalidJson.status !== 400) {
    addFinding("/api/contact", "invalid_json_status", invalidJson.status);
  }

  const invalidGiftCardBody = {
    formType: "giftCard",
    name: "Test Person",
    email: "test@example.com",
    phone: "",
    service: "Gavekort",
    message: "Gavekortbestilling",
    giftCardType: "Seilopplevelse",
    recipientName: "A",
    company: "",
  };
  const invalidGiftCard = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": auditClientKey("invalid-giftcard"),
    },
    body: JSON.stringify(invalidGiftCardBody),
    signal: AbortSignal.timeout(routeTimeoutMs),
  });
  if (invalidGiftCard.status !== 400) {
    addFinding("/api/contact", "invalid_giftcard_status", invalidGiftCard.status);
  }

  const honeypot = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": auditClientKey("honeypot"),
    },
    body: JSON.stringify({
      name: "Bot Person",
      email: "bot@example.com",
      service: "Seilturer",
      message: "Dette er en testmelding som skal stoppes av honeypot.",
      company: "filled",
    }),
    signal: AbortSignal.timeout(routeTimeoutMs),
  });
  if (honeypot.status !== 200) {
    addFinding("/api/contact", "honeypot_status", honeypot.status);
  }

  const rateLimitIp = auditClientKey("rate-limit");
  const rateLimitStatuses = [];
  for (let index = 0; index < 6; index += 1) {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": rateLimitIp,
      },
      body: JSON.stringify(invalidGiftCardBody),
      signal: AbortSignal.timeout(routeTimeoutMs),
    });
    rateLimitStatuses.push(response.status);
  }
  if (rateLimitStatuses.at(-1) !== 429) {
    addFinding("/api/contact", "rate_limit_statuses", rateLimitStatuses);
  }
}

function auditBookingIntegration() {
  const bookingPageSource = readTextFile("src/app/booking/page.tsx");
  const checkinSource = readTextFile("src/components/booking/CheckinBookingEmbed.tsx");

  if (!bookingPageSource.includes("CheckinBookingEmbed")) {
    addFinding("/booking", "missing_checkin_embed", true);
  }

  if (!checkinSource.includes("https://static.checkin.no/loaders/eventindex/loader.js")) {
    addFinding("src/components/booking/CheckinBookingEmbed.tsx", "missing_checkin_loader", true);
  }

  if (!/customerId\s*=\s*16533/.test(checkinSource)) {
    addFinding("src/components/booking/CheckinBookingEmbed.tsx", "missing_checkin_customer_id", true);
  }

  if (!/language:\s*"nb"/.test(checkinSource)) {
    addFinding("src/components/booking/CheckinBookingEmbed.tsx", "missing_checkin_nb_language", true);
  }
}

async function auditSanityServiceContent() {
  const services = await fetchSanity(/* groq */ `
    *[_type == "service" && status == "published"] | order(slug.current asc) {
      title,
      "slug": slug.current,
      "bodyWords": count(string::split(pt::text(body), " ")),
      "blockCount": count(body[]),
      "nonBlockCount": count(body[_type != "block"]),
      "emptySpanCount": count(body[].children[defined(text) && text == ""]),
      "faqCount": count(faqs[]),
      "relatedCount": count(relatedServices[]),
      "hasHero": defined(heroImage.asset),
      "imageAlt": heroImage.alt,
      "imageWidth": heroImage.asset->metadata.dimensions.width,
      "imageHeight": heroImage.asset->metadata.dimensions.height,
      "noIndex": seo.noIndex == true
    }
  `);

  if (!Array.isArray(services)) {
    addFinding("sanity/service", "missing_service_result", true);
    return;
  }

  if (services.length < 7) {
    addFinding("sanity/service", "published_service_count", services.length);
  }

  for (const service of services) {
    const scope = `sanity/service/${service.slug || service.title || "unknown"}`;

    if ((service.bodyWords || 0) < minServiceWords) {
      addFinding(scope, "body_word_count", service.bodyWords || 0);
    }
    if ((service.blockCount || 0) < 4) {
      addFinding(scope, "block_count", service.blockCount || 0);
    }
    if ((service.nonBlockCount || 0) > 0) {
      addFinding(scope, "unexpected_body_type_count", service.nonBlockCount);
    }
    if ((service.emptySpanCount || 0) > 0) {
      addFinding(scope, "empty_span_count", service.emptySpanCount);
    }
    if ((service.faqCount || 0) < 3) {
      addFinding(scope, "faq_reference_count", service.faqCount || 0);
    }
    if ((service.relatedCount || 0) < 3) {
      addFinding(scope, "related_service_count", service.relatedCount || 0);
    }
    if (!service.hasHero) {
      addFinding(scope, "missing_hero_image", true);
    }
    if (!service.imageAlt || service.imageAlt.length < 20) {
      addFinding(scope, "hero_image_alt", service.imageAlt || "");
    }
    if ((service.imageWidth || 0) < 1200 || (service.imageHeight || 0) < 630) {
      addFinding(scope, "hero_image_dimensions", {
        width: service.imageWidth || 0,
        height: service.imageHeight || 0,
      });
    }
    if (service.noIndex) {
      addFinding(scope, "unexpected_noindex", true);
    }
  }
}

async function auditSanityHomePageContent() {
  const homePage = await fetchSanity(/* groq */ `
    *[_type == "homePage"][0] {
      title,
      hero {
        heading,
        rotatingWords,
        intro,
        primaryCtaLabel,
        primaryCtaHref,
        "hasPoster": defined(posterImage.asset),
        "posterAlt": posterImage.alt,
        "posterWidth": posterImage.asset->metadata.dimensions.width,
        "posterHeight": posterImage.asset->metadata.dimensions.height
      },
      featuredIntro {
        eyebrow,
        title
      },
      "featuredServiceCount": count(featuredServices[]),
      "seoTitle": seo.title,
      "seoDescription": seo.description,
      "seoNoIndex": seo.noIndex == true
    }
  `);

  if (!homePage) {
    addFinding("sanity/homePage", "missing_home_page_document", true);
    return;
  }

  const hero = homePage.hero || {};
  const intro = homePage.featuredIntro || {};

  if (!hero.heading || hero.heading.length < 12) {
    addFinding("sanity/homePage", "hero_heading", hero.heading || "");
  }
  if (!Array.isArray(hero.rotatingWords) || hero.rotatingWords.length < 2) {
    addFinding("sanity/homePage", "hero_rotating_words", hero.rotatingWords || []);
  }
  if (!hero.intro || hero.intro.length < minHomeIntroLength) {
    addFinding("sanity/homePage", "hero_intro_length", hero.intro?.length || 0);
  }
  if (!hero.primaryCtaLabel || hero.primaryCtaLabel.length < 4) {
    addFinding("sanity/homePage", "hero_cta_label", hero.primaryCtaLabel || "");
  }
  if (
    !hero.primaryCtaHref ||
    (!hero.primaryCtaHref.startsWith("/") && !hero.primaryCtaHref.startsWith("#"))
  ) {
    addFinding("sanity/homePage", "hero_cta_href", hero.primaryCtaHref || "");
  }
  if (!hero.hasPoster) {
    addFinding("sanity/homePage", "missing_hero_poster", true);
  }
  if (!hero.posterAlt || hero.posterAlt.length < 20) {
    addFinding("sanity/homePage", "hero_poster_alt", hero.posterAlt || "");
  }
  if ((hero.posterWidth || 0) < 1200 || (hero.posterHeight || 0) < 630) {
    addFinding("sanity/homePage", "hero_poster_dimensions", {
      width: hero.posterWidth || 0,
      height: hero.posterHeight || 0,
    });
  }
  if (!intro.eyebrow || !intro.title) {
    addFinding("sanity/homePage", "featured_intro", intro);
  }
  if ((homePage.featuredServiceCount || 0) < 4) {
    addFinding("sanity/homePage", "featured_service_count", homePage.featuredServiceCount || 0);
  }
  if (!homePage.seoTitle || homePage.seoTitle.length < 20) {
    addFinding("sanity/homePage", "seo_title", homePage.seoTitle || "");
  }
  if (!homePage.seoDescription || homePage.seoDescription.length < 70) {
    addFinding("sanity/homePage", "seo_description", homePage.seoDescription || "");
  }
  if (homePage.seoNoIndex) {
    addFinding("sanity/homePage", "unexpected_noindex", true);
  }
}

function listFilesRecursively(directory) {
  if (!existsSync(directory)) return [];

  const files = [];
  const stack = [directory];

  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function readTextFile(file) {
  try {
    const stats = statSync(file);
    if (stats.size > 2_000_000) return "";
    return readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function auditSecrets() {
  const trackedFiles = execFileSync("git", ["ls-files"], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean)
    .filter((file) => existsSync(file));
  const buildFiles = [
    ...listFilesRecursively(".next/server"),
    ...listFilesRecursively(".next/static"),
    ...listFilesRecursively("public"),
  ];

  for (const file of [...new Set([...trackedFiles, ...buildFiles])]) {
    const text = readTextFile(file);
    if (text && secretPattern.test(text)) {
      addFinding(file, "possible_secret", "Pattern matched, inspect file manually");
    }
  }
}

function auditNorwegianTextEncoding() {
  const sourceFiles = execFileSync("git", ["ls-files", "src"], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean)
    .filter((file) => existsSync(file));
  const untrackedSourceFiles = execFileSync(
    "git",
    ["ls-files", "--others", "--exclude-standard", "src"],
    { encoding: "utf8" },
  )
    .split("\n")
    .filter(Boolean)
    .filter((file) => existsSync(file));

  for (const file of [...new Set([...sourceFiles, ...untrackedSourceFiles])]) {
    const text = readTextFile(file);

    if (text && norwegianCharacterEscapePattern.test(text)) {
      addFinding(file, "norwegian_character_escape", "Use æøå directly in source text");
    }
  }
}

const routes = await getSitemapRoutes();
await auditSeo(routes);
await auditRuntime(routes);
await auditSecurityHeaders();
await auditSecurityControls();
auditBookingIntegration();
await auditSanityServiceContent();
await auditSanityHomePageContent();
auditNorwegianTextEncoding();
auditSecrets();

const summary = {
  baseUrl,
  checkedRoutes: routes.length,
  findings,
};

console.log(JSON.stringify(summary, null, 2));

if (findings.length > 0) {
  process.exitCode = 1;
}
