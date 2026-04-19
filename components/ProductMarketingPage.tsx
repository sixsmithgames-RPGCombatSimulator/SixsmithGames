import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import LaunchAppButton from '@/components/LaunchAppButton';
import ModernBackground from '@/components/ModernBackground';
import StructuredDataScript from '@/components/StructuredDataScript';
import SubscribeButton from '@/components/SubscribeButton';
import { getArticleBySlug } from '@/lib/blog';
import { type ProductDefinition } from '@/lib/productContent';
import { cardPadding, fluidGrid, pageGutter } from '@/lib/responsive';
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createSoftwareApplicationSchema,
} from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

interface ProductMarketingPageProps {
  product: ProductDefinition;
}

function renderButton(product: ProductDefinition, tone: 'primary' | 'secondary') {
  const cta = tone === 'primary' ? product.primaryCta : product.secondaryCta;
  if (!cta) return null;

  const commonStyle: React.CSSProperties =
    tone === 'primary'
      ? {
          background: 'white',
          color: product.theme.accent,
          padding: '0.95rem 1.5rem',
          borderRadius: '999px',
          fontSize: '1rem',
          fontWeight: 800,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 32px rgba(15,23,42,0.18)',
          border: 'none',
          cursor: 'pointer',
        }
      : {
          background: 'rgba(255,255,255,0.12)',
          color: 'white',
          padding: '0.95rem 1.5rem',
          borderRadius: '999px',
          fontSize: '1rem',
          fontWeight: 800,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.2)',
        };

  if (cta.kind === 'launch' && cta.appSlug) {
    return (
      <LaunchAppButton appSlug={cta.appSlug} style={commonStyle}>
        {cta.label}
      </LaunchAppButton>
    );
  }

  if (cta.kind === 'subscribe') {
    return (
      <SubscribeButton
        planId={cta.planId}
        allowAccessRedirect={cta.allowAccessRedirect}
        hideForAnonymous={cta.hideForAnonymous}
        style={commonStyle}
      >
        {cta.label}
      </SubscribeButton>
    );
  }

  if (cta.href) {
    return (
      <Link href={cta.href} style={commonStyle}>
        {cta.label}
      </Link>
    );
  }

  return null;
}

function renderOfficialLink(href: string, label: string, description: string) {
  const isExternal = href.startsWith('http');
  const style: React.CSSProperties = {
    display: 'block',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '18px',
    padding: '1.1rem 1.2rem',
    textDecoration: 'none',
    color: 'inherit',
    boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
  };

  const content = (
    <>
      <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{label}</h3>
      <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>{description}</p>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} style={style}>
      {content}
    </Link>
  );
}

export default async function ProductMarketingPage({ product }: ProductMarketingPageProps) {
  const supportingArticles = (
    await Promise.all(product.supportingArticleSlugs.map((slug) => getArticleBySlug(slug)))
  ).filter(Boolean);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/tools' },
    { label: product.name, href: product.officialPath },
  ];

  return (
    <div style={{ background: '#f8fafc' }}>
      <StructuredDataScript data={createSoftwareApplicationSchema(product)} />
      <StructuredDataScript data={createFaqSchema(product.faq)} />
      <StructuredDataScript
        data={createBreadcrumbSchema(
          breadcrumbItems.map((item) => ({ name: item.label, url: `${SITE_URL}${item.href}` })),
        )}
      />

      <section
        style={{
          background: product.theme.gradient,
          color: 'white',
          padding: '84px 0 76px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ModernBackground />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.14)', zIndex: 1 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${pageGutter}`, position: 'relative', zIndex: 2 }}>
          <Breadcrumbs items={breadcrumbItems} tone="dark" />
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('320px'), gap: '2rem', alignItems: 'start' }}>
            <div>
              <div
                style={{
                  display: 'inline-block',
                  marginBottom: '1rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {product.heroEyebrow}
              </div>
              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 6vw, 4rem)',
                  lineHeight: 1.08,
                  fontWeight: 900,
                  margin: '0 0 1rem',
                }}
              >
                {product.h1}
              </h1>
              <p style={{ fontSize: '1.14rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.92)', margin: '0 0 1rem' }}>
                {product.heroValue}
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.86)', margin: '0 0 1.5rem' }}>
                {product.heroSummary}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '1rem' }}>
                {renderButton(product, 'primary')}
                {renderButton(product, 'secondary')}
              </div>
            </div>

            <aside
              style={{
                background: 'rgba(255,255,255,0.14)',
                backdropFilter: 'blur(20px)',
                borderRadius: '26px',
                padding: cardPadding,
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 20px 60px rgba(15,23,42,0.22)',
              }}
            >
              <h2 style={{ margin: '0 0 1rem', fontSize: '1.3rem', fontWeight: 800 }}>About this product</h2>
              <div style={{ display: 'grid', gap: '0.7rem' }}>
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  {product.oneSentence}
                </p>
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  <strong>Category:</strong> {product.category}.
                </p>
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  <strong>Primary audience:</strong> {product.primaryAudience}.
                </p>
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  <strong>Platform:</strong> {product.platform}.
                </p>
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  <strong>Pricing model:</strong> {product.pricingModel}.
                </p>
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  <strong>Current availability:</strong> {product.availability}.
                </p>
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  <strong>Official URL:</strong> {SITE_URL + product.officialPath}.
                </p>
                <p style={{ margin: 0, lineHeight: 1.7 }}>
                  <strong>Support:</strong> {SITE_URL + product.supportPath}.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `3rem ${pageGutter} 5rem` }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>What it is</h2>
          <div style={{ display: 'grid', gap: '0.95rem' }}>
            {product.whatItIs.map((paragraph) => (
              <p key={paragraph} style={{ margin: 0, color: '#334155', lineHeight: 1.85, fontSize: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Who it is for</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {product.whoItIsFor.map((paragraph) => (
              <div
                key={paragraph}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '18px',
                  padding: '1rem 1.1rem',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                }}
              >
                <p style={{ margin: 0, color: '#334155', lineHeight: 1.8 }}>{paragraph}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>What problem it solves</h2>
          <div style={{ display: 'grid', gap: '0.95rem' }}>
            {product.problemItSolves.map((paragraph) => (
              <p key={paragraph} style={{ margin: 0, color: '#334155', lineHeight: 1.85, fontSize: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>How it works</h2>
          <ol style={{ display: 'grid', gap: '0.9rem', paddingLeft: '1.25rem', margin: 0, color: '#334155' }}>
            {product.howItWorks.map((step) => (
              <li key={step} style={{ lineHeight: 1.8, paddingLeft: '0.2rem' }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Key features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('260px'), gap: '1rem' }}>
            {product.keyFeatures.map((feature) => (
              <article
                key={feature.title}
                style={{
                  background: 'white',
                  border: `1px solid ${product.theme.lightBorder}`,
                  borderRadius: '18px',
                  padding: '1rem 1.1rem',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  {feature.title}
                </h3>
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.75 }}>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Pricing and access</h2>
          <div style={{ display: 'grid', gap: '0.95rem' }}>
            {product.pricingAndAccess.map((paragraph) => (
              <p key={paragraph} style={{ margin: 0, color: '#334155', lineHeight: 1.85, fontSize: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
          <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <Link
              href={product.pricingPath}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.9rem 1.35rem',
                borderRadius: '999px',
                background: product.theme.dark,
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
              }}
            >
              Review {product.name} pricing
            </Link>
            <Link
              href={product.helpPath}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.9rem 1.35rem',
                borderRadius: '999px',
                background: product.theme.tint,
                border: `1px solid ${product.theme.lightBorder}`,
                color: product.theme.dark,
                textDecoration: 'none',
                fontWeight: 800,
              }}
            >
              Read {product.name} help
            </Link>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Frequently asked questions</h2>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {product.faq.map((entry) => (
              <details
                key={entry.question}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '18px',
                  padding: '0.9rem 1rem',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 800, color: '#0f172a' }}>{entry.question}</summary>
                <p style={{ margin: '0.9rem 0 0', color: '#475569', lineHeight: 1.8 }}>{entry.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Official links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('240px'), gap: '1rem', marginBottom: '1.5rem' }}>
            {renderOfficialLink(product.pricingPath, `${product.name} pricing`, `See current pricing and how to get started with ${product.name}.`)}
            {renderOfficialLink(product.appUrl, `Try ${product.name}`, `Open the official ${product.name} app or play experience.`)}
            {renderOfficialLink(product.helpPath, `${product.name} help`, `Read getting-started notes, core features, common use cases, and current scope for ${product.name}.`)}
            {renderOfficialLink(product.supportPath, 'Support and contact', 'Reach the Sixsmith Games support team for help, product questions, and contact details.')}
          </div>

          {supportingArticles.length > 0 ? (
            <>
              <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Helpful guides</h3>
              <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('250px'), gap: '1rem', marginBottom: '1.5rem' }}>
                {supportingArticles.map((article) => (
                  <Link
                    key={article!.slug}
                    href={`/articles/${article!.slug}`}
                    style={{
                      display: 'block',
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '18px',
                      padding: '1rem 1.1rem',
                      textDecoration: 'none',
                      boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                    }}
                  >
                    <h4 style={{ margin: '0 0 0.45rem', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{article!.title}</h4>
                    <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>{article!.excerpt}</p>
                  </Link>
                ))}
              </div>
            </>
          ) : null}

          {product.relatedProducts.length > 0 ? (
            <>
              <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Related products</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                {product.relatedProducts.map((slug) => (
                  <Link
                    key={slug}
                    href={slug === 'contentcraft' ? '/apps/contentcraft' : `/apps/${slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '999px',
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      color: '#0f172a',
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    {slug === 'contentcraft'
                      ? 'Worldbuilding app for writers and game masters'
                      : slug === 'fourstargeneral'
                        ? 'WWII tactical strategy game'
                        : slug === 'gravity'
                          ? 'Simultaneous-turn strategy game'
                          : 'Related product'}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </section>
      </main>
    </div>
  );
}
