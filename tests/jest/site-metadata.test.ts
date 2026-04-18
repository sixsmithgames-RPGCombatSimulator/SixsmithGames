import fs from 'node:fs';
import path from 'node:path';

import { BLOG_POSTS } from '../../lib/blog';
import { fluidGrid } from '../../lib/responsive';
import { rootMetadata, rootViewport } from '../../lib/siteMetadata';
import { publicRoutes } from '../site-routes';

function discoverStaticPageRoutes(appDir: string): string[] {
  if (!fs.existsSync(appDir)) {
    throw new Error(
      `Cannot discover static routes because the app directory is missing: ${appDir}. ` +
      'Run the tests from the project root with the Next.js app directory available.',
    );
  }

  const routes = new Set<string>();

  function visit(currentDir: string, segments: string[], hasDynamicSegment: boolean) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(`Cannot read route directory "${currentDir}": ${detail}`);
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
          visit(path.join(currentDir, entry.name), segments, hasDynamicSegment);
          continue;
        }

        if (/^\[\[\.\.\..+\]\]$/.test(entry.name)) {
          visit(path.join(currentDir, entry.name), segments, hasDynamicSegment);
          continue;
        }

        if (/^\[.+\]$/.test(entry.name)) {
          visit(path.join(currentDir, entry.name), [...segments, entry.name], true);
          continue;
        }

        visit(path.join(currentDir, entry.name), [...segments, entry.name], hasDynamicSegment);
        continue;
      }

      if (entry.isFile() && entry.name === 'page.tsx' && !hasDynamicSegment) {
        const routeSegments = segments.filter((segment) => !segment.startsWith('['));
        const route = routeSegments.length === 0 ? '/' : `/${routeSegments.join('/')}`;
        routes.add(route);
      }
    }
  }

  visit(appDir, [], false);

  return [...routes].sort();
}

describe('site metadata', () => {
  it('exports a device-width viewport for mobile browsers', () => {
    expect(rootViewport).toMatchObject({
      width: 'device-width',
      initialScale: 1,
    });
  });

  it('keeps canonical metadata on the homepage', () => {
    expect(rootMetadata.alternates?.canonical).toBe('/');
    expect(rootMetadata.openGraph?.url).toBe('/');
  });
});

describe('responsive helpers', () => {
  it('builds overflow-safe grid templates', () => {
    expect(fluidGrid('320px')).toBe('repeat(auto-fit, minmax(min(100%, 320px), 1fr))');
  });
});

describe('route coverage', () => {
  it('covers every static app route in the Playwright sweep', () => {
    const staticRoutes = discoverStaticPageRoutes(path.join(process.cwd(), 'app'));
    const normalizedPublicRoutes = new Set(publicRoutes.map((route) => route.split('?')[0]));

    for (const route of staticRoutes) {
      expect(normalizedPublicRoutes).toContain(route);
    }
  });

  it('covers every seeded blog post and tag route', () => {
    for (const post of BLOG_POSTS) {
      expect(publicRoutes).toContain(`/blog/${post.slug}`);
      for (const tag of post.tags) {
        expect(publicRoutes).toContain(`/blog/tag/${encodeURIComponent(tag)}`);
      }
    }
  });

  it('does not contain duplicate routes', () => {
    expect(new Set(publicRoutes).size).toBe(publicRoutes.length);
  });
});
