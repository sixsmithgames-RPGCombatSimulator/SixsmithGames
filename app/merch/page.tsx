/**
 * Sixsmith Games merchandise storefront.
 *
 * The page leads with the two real products and their direct purchase paths.
 * Supporting information stays compact so a visitor can see the gear, price,
 * and next action before reading policy details.
 */

import type { Metadata } from 'next';

import MerchStore from '@/components/MerchStore';
import StructuredDataScript from '@/components/StructuredDataScript';
import { buildPageMetadata } from '@/lib/metadata';
import { createFaqSchema, createMerchCollectionSchema } from '@/lib/schema';
import {
  confirmMerchCheckoutSession,
  getMerchStorefront,
} from '@/lib/merchStorefront.server';
import styles from './merch.module.css';

export const metadata: Metadata = buildPageMetadata({
  title: 'Tabletop RPG Merchandise | Sixsmith Games',
  description:
    'Shop the Master Your Stories Hoodie and Gateway Wyrm Desk Mat, made for Game Masters and tabletop RPG tables.',
  path: '/merch',
});

const REFUND_POLICY_URL =
  'https://sixsmith-games-shop.fourthwall.com/pages/refund-return-policy';
const TERMS_OF_SALE_URL =
  'https://sixsmith-games-shop.fourthwall.com/pages/terms-of-sale';

interface MerchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/*
 * These answers stay visible in the compact accordion near the page footer.
 * The same wording powers the FAQ schema, keeping search markup honest.
 */
const faq = [
  {
    question: 'When is my order made?',
    answer:
      'Fourthwall prints each item after you order it. Shipping choices, tax, and your final total appear before you pay.',
  },
  {
    question: 'What if it arrives damaged or printed wrong?',
    answer:
      'Contact the shop within 30 days with your order number and clear photos. Verified damage, misprints, wrong items, and lost packages are covered.',
  },
  {
    question: 'Can I return the wrong size?',
    answer:
      'Made-to-order items are final sale for a change of mind or the wrong size, so check the hoodie size guide before ordering.',
  },
];

/**
 * Renders the approved collection and accepts only known checkout return flags.
 */
export default async function MerchPage({ searchParams }: MerchPageProps) {
  // Start the storefront request before parsing the URL so independent work
  // overlaps instead of creating a server-side waterfall.
  const storefrontPromise = getMerchStorefront();
  const rawSearchParams = await searchParams;
  const rawCheckoutStatus = rawSearchParams.checkout;
  const checkoutValue = Array.isArray(rawCheckoutStatus)
    ? rawCheckoutStatus[0]
    : rawCheckoutStatus;
  const rawSessionId = rawSearchParams.session_id;
  const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;
  const [storefront, checkoutConfirmed] = await Promise.all([
    storefrontPromise,
    checkoutValue === 'thanks'
      ? confirmMerchCheckoutSession(sessionId ?? null)
      : Promise.resolve(false),
  ]);
  const checkoutStatus =
    checkoutValue === 'thanks'
      ? checkoutConfirmed
        ? 'confirmed'
        : 'unconfirmed'
      : checkoutValue === 'cancelled'
        ? 'cancelled'
        : null;

  return (
    <div className={styles.page}>
      <StructuredDataScript data={createFaqSchema(faq)} />
      <StructuredDataScript
        data={createMerchCollectionSchema(
          storefront.products.map((product) => ({
            name: product.name,
            slug: product.slug,
            description: product.description,
          })),
        )}
      />

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Sixsmith Games merchandise</p>
        <h1>Gear for the game table.</h1>
        <p>Two approved pieces. Both ready to order.</p>
      </header>

      <section className={styles.catalogSection} aria-label="Merchandise">
        <MerchStore storefront={storefront} checkoutStatus={checkoutStatus} />
      </section>

      <section className={styles.orderFacts} aria-label="How orders work">
        <div>
          <strong>Made to order</strong>
          <span>Printed after you choose it.</span>
        </div>
        <div>
          <strong>Secure checkout</strong>
          <span>Fourthwall handles payment.</span>
        </div>
        <div>
          <strong>See the total first</strong>
          <span>Shipping and tax appear before payment.</span>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqHeading}>
          <div>
            <p className={styles.eyebrow}>Before you buy</p>
            <h2>The short version.</h2>
          </div>
          <p>
            <a href={TERMS_OF_SALE_URL}>Terms of Sale</a>
            <span aria-hidden="true"> · </span>
            <a href={REFUND_POLICY_URL}>Refund &amp; Return Policy</a>
          </p>
        </div>
        <div className={styles.faqList}>
          {faq.map((entry) => (
            <details key={entry.question}>
              <summary>{entry.question}</summary>
              <p>{entry.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
