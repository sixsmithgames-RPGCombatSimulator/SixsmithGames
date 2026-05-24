import Link from 'next/link';
import Image from 'next/image';

import Breadcrumbs from '@/components/Breadcrumbs';
import FacebookViewContent from '@/components/FacebookViewContent';
import LaunchAppButton from '@/components/LaunchAppButton';
import ModernBackground from '@/components/ModernBackground';
import StructuredDataScript from '@/components/StructuredDataScript';
import SubscribeButton from '@/components/SubscribeButton';
import { getArticleBySlug } from '@/lib/blog';
import { type ProductDefinition } from '@/lib/productContent';
import { fluidGrid, pageGutter } from '@/lib/responsive';
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createSoftwareApplicationSchema,
} from '@/lib/schema';
import { getProductScreenshots, type Screenshot } from '@/lib/screenshots';
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
      <LaunchAppButton
        appSlug={cta.appSlug}
        style={commonStyle}
        deepLinkPath={tone === 'primary' ? product.primaryDeepLinkPath : undefined}
        openPublic={tone === 'primary' ? product.primaryOpenPublic : undefined}
      >
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

function renderScreenshotShowcase(product: ProductDefinition, screenshots: Screenshot[]) {
  if (screenshots.length === 0) return null;

  if (product.slug === 'virtual-combat-simulator') {
    return renderVirtualCombatSimulatorShowcase(product, screenshots);
  }

  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>
        See {product.name} in action
      </h2>
      <p style={{ margin: '0 0 1.25rem', color: '#475569', lineHeight: 1.8 }}>
        These product screenshots show the actual {product.name} interface near the features and workflows they support.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('320px'), gap: '1.25rem' }}>
        {screenshots.map((shot) => (
          <figure
            key={shot.src}
            style={{
              margin: 0,
              background: 'white',
              border: `1px solid ${product.theme.lightBorder}`,
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 14px 36px rgba(15,23,42,0.08)',
            }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 1024px) 560px, 100vw"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
              }}
            />
            <figcaption
              style={{
                padding: '0.85rem 1rem',
                color: '#334155',
                lineHeight: 1.65,
                fontSize: '0.95rem',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function renderVirtualCombatSimulatorShowcase(product: ProductDefinition, screenshots: Screenshot[]) {
  const heroShot = screenshots[0];
  const snippets = [
    {
      title: 'Initiative beside the battlefield',
      copy:
        'Turn order, active combatant, movement, actions, and combat state stay next to the battle map so the GM is not managing the encounter from a separate spreadsheet.',
      shot: screenshots[2] ?? heroShot,
      objectPosition: 'left center',
    },
    {
      title: 'Fog, grid, and layer tools in reach',
      copy:
        'Reveal space, measure movement, snap tokens, and adjust map layers without breaking the flow of D&D combat.',
      shot: screenshots[1] ?? heroShot,
      objectPosition: 'center 32%',
    },
    {
      title: 'Token-linked character context',
      copy:
        'Click a token and the relevant sheet context appears where the ruling happens: AC, hit points, ability scores, conditions, and actions.',
      shot: screenshots[3] ?? heroShot,
      objectPosition: 'right center',
    },
    {
      title: 'Player-safe shared view',
      copy:
        'Remote players can follow the same tactical situation while GM-only controls and hidden information stay out of their way.',
      shot: screenshots[4] ?? heroShot,
      objectPosition: 'center center',
    },
  ];

  return (
    <section
      style={{
        margin: '0 calc(50% - 50vw) 3.5rem',
        background: '#080b12',
        color: 'white',
        overflow: 'hidden',
        borderTop: '1px solid rgba(148,163,184,0.22)',
        borderBottom: '1px solid rgba(148,163,184,0.22)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `4rem ${pageGutter}` }}>
        <div style={{ maxWidth: '760px', marginBottom: '1.75rem' }}>
          <p
            style={{
              margin: '0 0 0.75rem',
              color: '#d6b574',
              fontSize: '0.82rem',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            D&D combat tracker with battle map
          </p>
          <h2 style={{ margin: '0 0 0.9rem', fontSize: '2.35rem', lineHeight: 1.12, fontWeight: 900 }}>
            Run the fight from one readable combat room.
          </h2>
          <p style={{ margin: 0, color: 'rgba(226,232,240,0.88)', fontSize: '1rem', lineHeight: 1.85 }}>
            Virtual Combat Simulator is built for game masters who need the tactical layer of a VTT without the sprawl:
            battle map, tokens, initiative, HP, conditions, fog, measurements, and player visibility in the same browser-based encounter view.
          </p>
        </div>

        <figure
          style={{
            margin: 0,
            position: 'relative',
            minHeight: '620px',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#0f172a',
            border: '1px solid rgba(214,181,116,0.42)',
            boxShadow: '0 28px 80px rgba(0,0,0,0.45)',
          }}
        >
          <Image
            src={heroShot.src}
            alt={heroShot.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(8,11,18,0.9) 0%, rgba(8,11,18,0.62) 32%, rgba(8,11,18,0.16) 68%, rgba(8,11,18,0.58) 100%)',
            }}
          />
          <figcaption
            style={{
              position: 'relative',
              zIndex: 1,
              minHeight: '620px',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '2rem',
            }}
          >
            <div style={{ maxWidth: '520px' }}>
              <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.55rem', lineHeight: 1.18, fontWeight: 900 }}>
                The encounter view is the product.
              </h3>
              <p style={{ margin: 0, color: 'rgba(241,245,249,0.9)', lineHeight: 1.75 }}>
                This is where VCS earns its keep: the GM can read the battlefield, advance turns, check token-linked stats,
                and keep online or hybrid players oriented without sending map screenshots around.
              </p>
            </div>
          </figcaption>
        </figure>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: fluidGrid('250px'),
            gap: '1rem',
            marginTop: '1.25rem',
          }}
        >
          {snippets.map((snippet) => (
            <article
              key={snippet.title}
              style={{
                background: 'rgba(15,23,42,0.88)',
                border: '1px solid rgba(214,181,116,0.32)',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 18px 44px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ position: 'relative', minHeight: '160px', overflow: 'hidden', background: '#0f172a' }}>
                <Image
                  src={snippet.shot.src}
                  alt={snippet.shot.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, 100vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: snippet.objectPosition,
                  }}
                />
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.45rem', color: '#f8fafc', fontSize: '1rem', fontWeight: 900 }}>
                  {snippet.title}
                </h3>
                <p style={{ margin: 0, color: 'rgba(226,232,240,0.82)', lineHeight: 1.65, fontSize: '0.94rem' }}>
                  {snippet.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function ProductMarketingPage({ product }: ProductMarketingPageProps) {
  const supportingArticles = (
    await Promise.all(product.supportingArticleSlugs.map((slug) => getArticleBySlug(slug)))
  ).filter(Boolean);
  const screenshots = getProductScreenshots(product.slug);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/tools' },
    { label: product.name, href: product.officialPath },
  ];

  return (
    <div style={{ background: '#f8fafc' }}>
      <FacebookViewContent
        contentId={product.slug}
        contentName={product.name}
        contentType="product"
        currency={product.offerPrice ? 'USD' : undefined}
        value={product.offerPrice}
      />
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: product.heroMedia ? fluidGrid('320px') : '1fr',
              gap: '2.25rem',
              alignItems: 'center',
            }}
          >
            <div style={{ maxWidth: '860px' }}>
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
            {product.heroMedia ? (
              <div>
                <figure
                  style={{
                    margin: 0,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.22)',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
                    position: 'relative',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.heroMedia.src}
                    alt={product.heroMedia.alt}
                    loading="eager"
                    decoding="async"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      background: '#0f172a',
                    }}
                  />
                  {product.heroMedia.overlayLabel ? (
                    <figcaption
                      style={{
                        position: 'absolute',
                        left: '0.9rem',
                        bottom: '0.9rem',
                        padding: '0.5rem 0.85rem',
                        borderRadius: '999px',
                        background: 'rgba(15,23,42,0.78)',
                        color: 'white',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      {product.heroMedia.overlayLabel}
                    </figcaption>
                  ) : null}
                </figure>
                {product.heroMedia.caption ? (
                  <p
                    style={{
                      margin: '0.6rem 0 0',
                      color: 'rgba(255,255,255,0.82)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {product.heroMedia.caption}
                  </p>
                ) : null}
              </div>
            ) : null}
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
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>{product.problemItSolvesHeading}</h2>
          <div style={{ display: 'grid', gap: '0.95rem' }}>
            {product.problemItSolves.map((paragraph) => (
              <p key={paragraph} style={{ margin: 0, color: '#334155', lineHeight: 1.85, fontSize: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {renderScreenshotShowcase(product, screenshots)}

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

        {product.featureDeepDives && product.featureDeepDives.length > 0 ? (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>Feature deep dives</h2>
            <p style={{ margin: '0 0 1.25rem', color: '#475569', lineHeight: 1.8 }}>
              Go deeper on specific parts of {product.name}.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('260px'), gap: '1rem' }}>
              {product.featureDeepDives.map((deepDive) => (
                <Link
                  key={deepDive.href}
                  href={deepDive.href}
                  style={{
                    display: 'block',
                    background: 'white',
                    border: `1px solid ${product.theme.lightBorder}`,
                    borderRadius: '18px',
                    padding: '1.1rem 1.2rem',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                  }}
                >
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    {deepDive.title}
                  </h3>
                  <p style={{ margin: '0 0 0.6rem', color: '#475569', lineHeight: 1.75 }}>
                    {deepDive.description}
                  </p>
                  <span style={{ color: product.theme.accent, fontWeight: 800, fontSize: '0.95rem' }}>
                    {deepDive.linkLabel ?? 'Read the deep dive'} →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

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
                      : slug === 'gamemastercraft'
                        ? 'Campaign planning and worldbuilding for game masters'
                        : slug === 'sagacraft'
                          ? 'Novel writing and story continuity for fiction writers'
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
