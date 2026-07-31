/**
 * Sixsmith Games merchandise storefront.
 *
 * The page leads with the three real products and their direct purchase paths.
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
    'Shop Master Your Stories hoodies and the Gateway Wyrm Desk Mat, with a separate GameMaster Studio coupon earned after purchase.',
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
    question: 'How does the GameMaster Studio coupon work?',
    answer:
      'After a qualifying paid order is confirmed, use the same email for your merchandise order and Sixsmith Games account, then enter the receipt number on the claim page. A desk mat earns a one-use coupon covering one Studio month; either hoodie earns three months. Qualifying items in the same order add together. The coupon is claimed separately and does not change the merchandise price. If it starts a new Studio subscription, regular monthly billing begins after the coupon ends unless you cancel first. The coupon has no cash value and cannot be transferred.',
  },
  {
    question: 'When is my gear made?',
    answer:
      'Your hoodie or desk mat is made after you order it. You will see shipping choices, tax, and your final total before you pay.',
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
 * Renders the live collection and accepts only known checkout return flags.
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
        <p>Wear the story. Set the scene.</p>
      </header>

      <section className={styles.catalogSection} aria-label="Merchandise">
        <MerchStore storefront={storefront} checkoutStatus={checkoutStatus} />
      </section>

      <section className={styles.orderFacts} aria-label="How orders work">
        <div>
          <strong>Made for your next session</strong>
          <span>Choose your gear. We will make it for you.</span>
        </div>
        <div>
          <strong>Secure checkout</strong>
          <span>Your payment stays protected.</span>
        </div>
        <div>
          <strong>Separate Studio coupon</strong>
          <span><a href="/merch/claim">Claim it after purchase with your order number.</a></span>
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
