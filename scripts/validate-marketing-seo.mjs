import { mkdirSync, writeFileSync } from 'node:fs';

const BASE_URL = process.argv[2] || 'http://127.0.0.1:3100';
const SITE_URL = 'https://sixsmithgames.com';
const OUTPUT_DIR = new URL('../test-results/', import.meta.url);

const REQUIRED_PRODUCT_H2S = [
  'About this product',
  'What it is',
  'Who it is for',
  'How it works',
  'Key features',
  'Pricing and access',
  'Frequently asked questions',
  'Official links',
];

const PRODUCT_FACT_LABELS = [
  'Category:',
  'Primary audience:',
  'Platform:',
  'Pricing model:',
  'Current availability:',
  'Official URL:',
  'Support path:',
];

const KEY_ROUTE_EXPECTATIONS = [
  {
    route: '/',
    label: 'Homepage',
    minWords: 600,
    maxWords: 1000,
    keywords: [
      'Sixsmith Games',
      'Virtual Combat Simulator',
      'ContentCraft',
      'Four Star General',
      'MasterTyping',
      'Gravity',
    ],
    requiredLinks: [
      '/apps/virtual-combat-simulator',
      '/apps/contentcraft',
      '/apps/fourstargeneral',
      '/apps/mastertyping',
      '/apps/gravity',
      '/pricing',
      '/about/facts',
      '/support',
    ],
    requiredSchema: ['Organization'],
  },
  {
    route: '/apps/virtual-combat-simulator',
    label: 'Virtual Combat Simulator',
    minWords: 800,
    maxWords: 1500,
    keywords: ['Virtual Combat Simulator', 'combat simulator', 'tabletop RPG', 'initiative', 'battle map'],
    requiredLinks: ['/pricing#virtual-combat-simulator', '/help/virtual-combat-simulator', '/support'],
    requiredSchema: ['Organization', 'SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
    isProduct: true,
  },
  {
    route: '/apps/contentcraft',
    label: 'ContentCraft',
    minWords: 800,
    maxWords: 1500,
    keywords: ['ContentCraft', 'writing tool', 'worldbuilding', 'canon continuity', 'game masters'],
    requiredLinks: ['/pricing#contentcraft', '/help/contentcraft', '/support'],
    requiredSchema: ['Organization', 'SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
    isProduct: true,
  },
  {
    route: '/apps/fourstargeneral',
    label: 'Four Star General',
    minWords: 800,
    maxWords: 1500,
    keywords: ['Four Star General', 'WWII tactical strategy', 'supply', 'reserves', 'deterministic tactics'],
    requiredLinks: ['/pricing#fourstargeneral', '/help/fourstargeneral', '/support'],
    requiredSchema: ['Organization', 'SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
    isProduct: true,
  },
  {
    route: '/apps/mastertyping',
    label: 'MasterTyping',
    minWords: 800,
    maxWords: 1500,
    keywords: ['MasterTyping', 'typing practice', 'typing improvement', 'progression', 'skill building'],
    requiredLinks: ['/pricing#mastertyping', '/help/mastertyping', '/support'],
    requiredSchema: ['Organization', 'SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
    isProduct: true,
  },
  {
    route: '/apps/gravity',
    label: 'Gravity',
    minWords: 800,
    maxWords: 1500,
    keywords: ['Gravity', 'strategy game', 'board-game', 'simultaneous-turn', 'ship systems'],
    requiredLinks: ['/pricing#gravity', '/help/gravity', '/support'],
    requiredSchema: ['Organization', 'SoftwareApplication', 'FAQPage', 'BreadcrumbList'],
    isProduct: true,
  },
];

const REDIRECT_EXPECTATIONS = [
  { from: '/facts', to: '/about/facts' },
  { from: '/contact', to: '/support' },
  { from: '/apps/vcs', to: '/apps/virtual-combat-simulator' },
  { from: '/apps/virtualcombatsimulator', to: '/apps/virtual-combat-simulator' },
  { from: '/apps/fsg', to: '/apps/fourstargeneral' },
  { from: '/apps/four-star-general', to: '/apps/fourstargeneral' },
];

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function stripTags(text) {
  return decodeEntities(
    text
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function extractFirst(text, pattern) {
  const match = text.match(pattern);
  return match ? decodeEntities(match[1]).trim() : null;
}

function extractAll(text, pattern) {
  return Array.from(text.matchAll(pattern), (match) => decodeEntities(stripTags(match[1])));
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function wordCount(text) {
  return (text.match(/\b[\p{L}\p{N}'-]+\b/gu) || []).length;
}

function extractJsonLdTypes(html) {
  const scripts = Array.from(
    html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
    (match) => match[1],
  );

  const types = new Set();

  function collect(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach(collect);
      return;
    }
    const value = node['@type'];
    if (Array.isArray(value)) value.forEach((item) => types.add(String(item)));
    else if (value) types.add(String(value));
    Object.values(node).forEach(collect);
  }

  for (const script of scripts) {
    try {
      collect(JSON.parse(script));
    } catch {
      // Ignore malformed JSON-LD blocks in validation output.
    }
  }

  return Array.from(types).sort();
}

function extractAnchors(html) {
  return Array.from(html.matchAll(/<a[^>]+href="([^"]+)"/gi), (match) => match[1]);
}

function normalizeInternalHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
    return null;
  }

  if (href.startsWith('/')) {
    const url = new URL(href, SITE_URL);
    return `${url.pathname}${url.search}`;
  }

  if (href.startsWith(SITE_URL)) {
    const url = new URL(href);
    return `${url.pathname}${url.search}`;
  }

  return null;
}

function normalizeRoute(url) {
  const parsed = new URL(url, SITE_URL);
  return `${parsed.pathname}${parsed.search}`;
}

async function fetchText(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    redirect: 'follow',
    ...options,
  });
  const text = await response.text();
  return { response, text };
}

async function fetchRouteAudit(route) {
  const { response, text: html } = await fetchText(route);
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const mainText = stripTags(mainMatch ? mainMatch[1] : bodyMatch ? bodyMatch[1] : html);
  const bodyText = stripTags(bodyMatch ? bodyMatch[1] : html);
  const title = extractFirst(html, /<title>([\s\S]*?)<\/title>/i);
  const description = extractFirst(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const canonical = extractFirst(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  const ogTitle = extractFirst(html, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i);
  const ogDescription = extractFirst(html, /<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i);
  const ogUrl = extractFirst(html, /<meta[^>]+property="og:url"[^>]+content="([^"]*)"/i);
  const ogImage = extractFirst(html, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i);
  const twitterCard = extractFirst(html, /<meta[^>]+name="twitter:card"[^>]+content="([^"]*)"/i);
  const h1Text = extractFirst(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2s = extractAll(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi);
  const faqQuestions = extractAll(html, /<summary[^>]*>([\s\S]*?)<\/summary>/gi);
  const jsonLdTypes = extractJsonLdTypes(html);
  const anchors = extractAnchors(html);

  return {
    route,
    status: response.status,
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    twitterCard,
    h1Text,
    h1Count: countMatches(html, /<h1\b/gi),
    h2s,
    faqCount: faqQuestions.length,
    hasLastUpdated: bodyText.includes('Last updated'),
    hasNoIndex: /noindex/i.test(html),
    mainWordCount: wordCount(mainText),
    bodyText,
    mainText,
    mainTextSnippet: mainText.slice(0, 260),
    jsonLdTypes,
    anchors,
  };
}

function validateKeyRoute(audit, expectation) {
  const failures = [];

  if (audit.status !== 200) failures.push(`Expected HTTP 200, received ${audit.status}.`);
  if (!audit.title) failures.push('Missing <title>.');
  if (!audit.description) failures.push('Missing meta description.');
  if (!audit.canonical) failures.push('Missing canonical URL.');
  if (!audit.ogTitle || !audit.ogDescription || !audit.ogUrl || !audit.ogImage || !audit.twitterCard) {
    failures.push('Missing required Open Graph or Twitter metadata.');
  }
  if (audit.h1Count !== 1) failures.push(`Expected exactly one H1, found ${audit.h1Count}.`);
  if (!audit.h1Text) failures.push('Missing H1 text.');
  if (audit.mainWordCount < expectation.minWords || audit.mainWordCount > expectation.maxWords) {
    failures.push(`Main content word count ${audit.mainWordCount} is outside target range ${expectation.minWords}-${expectation.maxWords}.`);
  }
  if (!audit.hasLastUpdated) failures.push('Visible "Last updated" text not found.');
  if (audit.hasNoIndex) failures.push('Unexpected noindex directive found in HTML.');

  for (const keyword of expectation.keywords) {
    const haystacks = [audit.bodyText, audit.mainText, audit.h1Text || '', audit.title || ''];
    if (!haystacks.some((value) => value.toLowerCase().includes(keyword.toLowerCase()))) {
      failures.push(`Keyword check failed for "${keyword}".`);
    }
  }

  for (const href of expectation.requiredLinks) {
    if (!audit.anchors.includes(href)) {
      failures.push(`Missing required link ${href}.`);
    }
  }

  for (const schemaType of expectation.requiredSchema) {
    if (!audit.jsonLdTypes.includes(schemaType)) {
      failures.push(`Missing JSON-LD type ${schemaType}.`);
    }
  }

  if (expectation.isProduct) {
    for (const heading of REQUIRED_PRODUCT_H2S) {
      if (!audit.h2s.includes(heading)) {
        failures.push(`Missing required H2 "${heading}".`);
      }
    }

    for (const label of PRODUCT_FACT_LABELS) {
      if (!audit.bodyText.includes(label)) {
        failures.push(`Missing product fact label "${label}" near the top of the page.`);
      }
    }

    if (audit.faqCount < 5) {
      failures.push(`Expected at least 5 FAQ entries, found ${audit.faqCount}.`);
    }
  }

  return failures;
}

function findDuplicates(items, key) {
  const map = new Map();
  for (const item of items) {
    const value = item[key];
    if (!value) continue;
    if (!map.has(value)) map.set(value, []);
    map.get(value).push(item.route);
  }
  return Array.from(map.entries())
    .filter(([, routes]) => routes.length > 1)
    .map(([value, routes]) => ({ value, routes }));
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const { text: sitemapXml } = await fetchText('/sitemap.xml');
  const sitemapUrls = Array.from(sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1]);
  const sitemapRoutes = sitemapUrls.map(normalizeRoute);
  const uniqueSitemapRoutes = Array.from(new Set(sitemapRoutes));

  const audits = [];
  for (const route of uniqueSitemapRoutes) {
    audits.push(await fetchRouteAudit(route));
  }

  const keyRouteResults = KEY_ROUTE_EXPECTATIONS.map((expectation) => {
    const audit = audits.find((entry) => entry.route === expectation.route);
    const failures = audit ? validateKeyRoute(audit, expectation) : ['Route missing from sitemap validation set.'];
    return {
      route: expectation.route,
      label: expectation.label,
      passed: failures.length === 0,
      failures,
      audit,
    };
  });

  const titleDuplicates = findDuplicates(audits, 'title');
  const descriptionDuplicates = findDuplicates(audits, 'description');
  const canonicalMismatches = audits
    .filter((audit) => audit.canonical)
    .filter((audit) => {
      try {
        const canonicalUrl = new URL(audit.canonical);
        return canonicalUrl.origin !== SITE_URL || `${canonicalUrl.pathname}${canonicalUrl.search}` !== audit.route;
      } catch {
        return true;
      }
    })
    .map((audit) => ({
      route: audit.route,
      canonical: audit.canonical,
    }));

  const internalLinks = new Set();
  for (const audit of audits) {
    for (const href of audit.anchors) {
      const normalized = normalizeInternalHref(href);
      if (normalized) internalLinks.add(normalized);
    }
  }

  const internalLinkFailures = [];
  for (const href of Array.from(internalLinks).sort()) {
    const response = await fetch(`${BASE_URL}${href}`, { redirect: 'manual' });
    if (response.status >= 400) {
      internalLinkFailures.push({ href, status: response.status });
    }
  }

  const redirectResults = [];
  for (const check of REDIRECT_EXPECTATIONS) {
    const response = await fetch(`${BASE_URL}${check.from}`, { redirect: 'manual' });
    const location = response.headers.get('location');
    redirectResults.push({
      from: check.from,
      expectedTo: check.to,
      status: response.status,
      location,
      passed:
        response.status === 301 &&
        Boolean(location) &&
        normalizeRoute(location) === check.to,
    });
  }

  const { text: robotsTxt } = await fetchText('/robots.txt');
  const { text: llmsTxt } = await fetchText('/llms.txt');
  const notFoundResponse = await fetch(`${BASE_URL}/this-route-should-not-exist`, { redirect: 'manual' });
  const notFoundText = await notFoundResponse.text();

  const structuredDataByPage = {
    home: keyRouteResults.find((item) => item.route === '/')?.audit?.jsonLdTypes ?? [],
    productPages: keyRouteResults.filter((item) => item.route.startsWith('/apps/')).map((item) => ({
      route: item.route,
      types: item.audit?.jsonLdTypes ?? [],
    })),
    about: audits.find((item) => item.route === '/about')?.jsonLdTypes ?? [],
    facts: audits.find((item) => item.route === '/about/facts')?.jsonLdTypes ?? [],
    pricing: audits.find((item) => item.route === '/pricing')?.jsonLdTypes ?? [],
    helpLanding: audits.find((item) => item.route === '/help')?.jsonLdTypes ?? [],
    helpProductSample: audits.find((item) => item.route === '/help/contentcraft')?.jsonLdTypes ?? [],
    helpTopicSample: audits.find((item) => item.route === '/help/contentcraft/getting-started')?.jsonLdTypes ?? [],
    blogLanding: audits.find((item) => item.route === '/blog')?.jsonLdTypes ?? [],
    blogPostSample: audits.find((item) => item.route === '/blog/what-is-contentcraft')?.jsonLdTypes ?? [],
  };

  const result = {
    baseUrl: BASE_URL,
    siteUrl: SITE_URL,
    generatedAt: new Date().toISOString(),
    routeCount: audits.length,
    keyRouteResults,
    titleDuplicates,
    descriptionDuplicates,
    canonicalMismatches,
    internalLinkFailures,
    redirectResults,
    robotsTxt,
    llmsTxt,
    notFound: {
      status: notFoundResponse.status,
      passed:
        notFoundResponse.status === 404 &&
        /the page you asked for is not here/i.test(notFoundText),
    },
    structuredDataByPage,
    metadataMap: audits.map((audit) => ({
      route: audit.route,
      title: audit.title,
      description: audit.description,
      canonical: audit.canonical,
      ogTitle: audit.ogTitle,
      ogDescription: audit.ogDescription,
      ogUrl: audit.ogUrl,
      twitterCard: audit.twitterCard,
    })),
  };

  writeFileSync(new URL('./marketing-seo-validation.json', OUTPUT_DIR), `${JSON.stringify(result, null, 2)}\n`);

  const summaryLines = [
    `Validated ${audits.length} sitemap routes against ${BASE_URL}.`,
    `Key routes passed: ${keyRouteResults.filter((item) => item.passed).length}/${keyRouteResults.length}.`,
    `Duplicate titles: ${titleDuplicates.length}.`,
    `Duplicate descriptions: ${descriptionDuplicates.length}.`,
    `Canonical mismatches: ${canonicalMismatches.length}.`,
    `Broken internal links: ${internalLinkFailures.length}.`,
    `Redirect checks passed: ${redirectResults.filter((item) => item.passed).length}/${redirectResults.length}.`,
    `404 check passed: ${result.notFound.passed}.`,
  ];

  writeFileSync(new URL('./marketing-seo-validation.txt', OUTPUT_DIR), `${summaryLines.join('\n')}\n`);
  console.log(summaryLines.join('\n'));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
