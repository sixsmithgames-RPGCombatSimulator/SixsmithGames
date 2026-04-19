import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import StructuredDataScript from '@/components/StructuredDataScript';
import { getHelpTopicContent } from '@/lib/helpContent';
import { buildPageMetadata } from '@/lib/metadata';
import {
  HELP_TOPIC_ORDER,
  HELP_TOPIC_TITLES,
  MARKETING_LAST_UPDATED,
  PRODUCT_DEFINITIONS,
  PRODUCT_DEFINITIONS_BY_SLUG,
} from '@/lib/productContent';
import { pageGutter } from '@/lib/responsive';
import { createBreadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return PRODUCT_DEFINITIONS.flatMap((product) =>
    HELP_TOPIC_ORDER.map((topic) => ({ product: product.slug, topic })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string; topic: string }>;
}): Promise<Metadata> {
  const { product, topic } = await params;
  const definition = PRODUCT_DEFINITIONS_BY_SLUG[product as keyof typeof PRODUCT_DEFINITIONS_BY_SLUG];
  const isValidTopic = HELP_TOPIC_ORDER.includes(topic as (typeof HELP_TOPIC_ORDER)[number]);

  if (!definition || !isValidTopic) {
    return buildPageMetadata({
      title: 'Help | Sixsmith Games',
      description: 'Public help pages for Sixsmith Games products.',
      path: '/help',
    });
  }

  return buildPageMetadata({
    title: `${definition.name} ${HELP_TOPIC_TITLES[topic as keyof typeof HELP_TOPIC_TITLES]} | Sixsmith Games Help`,
    description: `Read ${HELP_TOPIC_TITLES[topic as keyof typeof HELP_TOPIC_TITLES].toLowerCase()} guidance for ${definition.name}.`,
    path: `/help/${definition.slug}/${topic}`,
  });
}

export default async function HelpTopicPage({
  params,
}: {
  params: Promise<{ product: string; topic: string }>;
}) {
  const { product, topic } = await params;
  const definition = PRODUCT_DEFINITIONS_BY_SLUG[product as keyof typeof PRODUCT_DEFINITIONS_BY_SLUG];
  const isValidTopic = HELP_TOPIC_ORDER.includes(topic as (typeof HELP_TOPIC_ORDER)[number]);

  if (!definition || !isValidTopic) {
    notFound();
  }

  const content = getHelpTopicContent(definition, topic as (typeof HELP_TOPIC_ORDER)[number]);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Help', href: '/help' },
    { label: definition.name, href: definition.helpPath },
    { label: HELP_TOPIC_TITLES[topic as keyof typeof HELP_TOPIC_TITLES], href: `/help/${definition.slug}/${topic}` },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <StructuredDataScript
        data={createBreadcrumbSchema(
          breadcrumbItems.map((item) => ({ name: item.label, url: `${SITE_URL}${item.href}` })),
        )}
      />

      <section style={{ background: definition.theme.dark, color: 'white', padding: '78px 0 56px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: `0 ${pageGutter}` }}>
          <Breadcrumbs items={breadcrumbItems} tone="dark" />
          <div style={{ maxWidth: '760px' }}>
            <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, lineHeight: 1.08 }}>
              {content.title}
            </h1>
            <p style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.86)', lineHeight: 1.85, fontSize: '1.05rem' }}>{content.summary}</p>
            <LastUpdated date={MARKETING_LAST_UPDATED} tone="dark" />
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: `2.5rem ${pageGutter} 4rem` }}>
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph} style={{ margin: 0, color: '#334155', lineHeight: 1.85 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.7rem', fontWeight: 900, color: '#0f172a' }}>{HELP_TOPIC_TITLES[topic as keyof typeof HELP_TOPIC_TITLES]}</h2>
          <ul style={{ margin: 0, paddingLeft: '1.15rem', color: '#334155', lineHeight: 1.8 }}>
            {content.bullets.map((bullet) => (
              <li key={bullet} style={{ marginBottom: '0.55rem' }}>
                {bullet}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.7rem', fontWeight: 900, color: '#0f172a' }}>Next official pages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <Link href={definition.officialPath} style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              {definition.name} product page
            </Link>
            <Link href={definition.pricingPath} style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              {definition.name} pricing
            </Link>
            <Link href={definition.helpPath} style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              {definition.name} help landing page
            </Link>
            <Link href={definition.supportPath} style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>
              Support
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
