import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredDataScript from '@/components/StructuredDataScript';
import { buildPageMetadata } from '@/lib/metadata';
import {
  HELP_TOPIC_ORDER,
  HELP_TOPIC_TITLES,
  PRODUCT_DEFINITIONS,
  PRODUCT_DEFINITIONS_BY_SLUG,
} from '@/lib/productContent';
import { pageGutter } from '@/lib/responsive';
import { createBreadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return PRODUCT_DEFINITIONS.map((product) => ({ product: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product } = await params;
  const definition = PRODUCT_DEFINITIONS_BY_SLUG[product as keyof typeof PRODUCT_DEFINITIONS_BY_SLUG];

  if (!definition) {
    return buildPageMetadata({
      title: 'Help | Sixsmith Games',
      description: 'Help pages for Sixsmith Games products.',
      path: '/help',
    });
  }

  return buildPageMetadata({
    title: `${definition.name} Help | Getting Started, Core Features, and Product Scope`,
    description: `Read help for ${definition.name}, including getting started, core features, common use cases, current scope, and pricing basics.`,
    path: definition.helpPath,
  });
}

export default async function ProductHelpIndexPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const definition = PRODUCT_DEFINITIONS_BY_SLUG[product as keyof typeof PRODUCT_DEFINITIONS_BY_SLUG];

  if (!definition) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Help', href: '/help' },
    { label: definition.name, href: definition.helpPath },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <StructuredDataScript
        data={createBreadcrumbSchema(
          breadcrumbItems.map((item) => ({ name: item.label, url: `${SITE_URL}${item.href}` })),
        )}
      />

      <section style={{ background: definition.theme.dark, color: 'white', padding: '78px 0 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <Breadcrumbs items={breadcrumbItems} tone="dark" />
          <div style={{ maxWidth: '780px' }}>
            <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2.1rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.08 }}>
              {definition.name} help
            </h1>
            <p style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.86)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              {definition.oneSentence} This help landing page points to the core reference pages for getting started, features, common use cases, current scope, and pricing or account basics.
            </p>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: `2.5rem ${pageGutter} 4rem` }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>What {definition.name} is for</h2>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {definition.whoItIsFor.map((paragraph) => (
              <p key={paragraph} style={{ margin: 0, color: '#334155', lineHeight: 1.85 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>Help topics</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {HELP_TOPIC_ORDER.map((topic) => (
              <article key={topic} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '22px', padding: '1.1rem 1.2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.04)' }}>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  <Link href={`/help/${definition.slug}/${topic}`} style={{ color: '#0f172a', textDecoration: 'none' }}>
                    {HELP_TOPIC_TITLES[topic]}
                  </Link>
                </h3>
                <p style={{ margin: '0 0 0.75rem', color: '#475569', lineHeight: 1.8 }}>
                  {topic === 'getting-started'
                    ? `Start using ${definition.name} with a simple onboarding summary and first-step guidance.`
                    : topic === 'core-features'
                      ? `Review the feature set that defines what ${definition.name} is today.`
                      : topic === 'common-use-cases'
                        ? `See the real situations where ${definition.name} fits best.`
                        : topic === 'current-scope'
                          ? `Understand what ${definition.name} covers right now and what is still to come.`
                          : `Review pricing, access, account basics, and where to go for support with ${definition.name}.`}
                </p>
                <Link href={`/help/${definition.slug}/${topic}`} style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
                  Open {HELP_TOPIC_TITLES[topic].toLowerCase()}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
