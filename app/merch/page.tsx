/**
 * Sixsmith Games merchandise storefront.
 *
 * The page speaks to tabletop players in familiar game-night language and
 * points each approved product to Fourthwall, the live merchandise cart and
 * checkout. The guarded local Stripe cart remains closed so the site cannot
 * accidentally create a second physical-goods checkout.
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

const FOURTHWALL_SHOP_URL = 'https://sixsmith-games-shop.fourthwall.com/';
const REFUND_POLICY_URL =
  'https://sixsmith-games-shop.fourthwall.com/pages/refund-return-policy';
const TERMS_OF_SALE_URL =
  'https://sixsmith-games-shop.fourthwall.com/pages/terms-of-sale';

interface MerchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const faq = [
  {
    question: 'Can I order this gear today?',
    answer:
      'Yes. The Master Your Stories Hoodie and Gateway Wyrm Desk Mat are live in the Sixsmith Games Fourthwall shop. Each one is printed only after you order it.',
  },
  {
    question: 'Where will Sixsmith Games merchandise ship?',
    answer:
      'Fourthwall shows the destinations available for your address. Shipping, tax, and the final total appear in secure checkout before you place the order.',
  },
  {
    question: 'What if my order is damaged or printed wrong?',
    answer:
      'Contact the shop within 30 days and include your order number plus clear photos. Made-to-order items are final sale for a change of mind or the wrong size, but verified damage, misprints, wrong items, and lost packages are covered under the Refund & Return Policy.',
  },
  {
    question: 'Does merchandise include GameMaster Studio subscription time?',
    answer:
      'Not at launch. Merchandise and subscriptions remain separate. If a product later includes a free month, its product page will explain exactly who qualifies and how to claim it; buying merchandise will not start a recurring subscription.',
  },
];

/**
 * Renders the first-batch storefront and accepts only known checkout return flags.
 */
export default async function MerchPage({ searchParams }: MerchPageProps) {
  // Start storefront work immediately, then use the parsed query only to
  // decide whether a Stripe confirmation lookup is required.
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
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Sixsmith Games merchandise</p>
          <h1>
            Bring a little of the{' '}
            <span>game table with you.</span>
          </h1>
          <p className={styles.heroLead}>
            A warm hoodie for the GM who keeps one more scene moving. A
            dungeon-gateway desk mat for dice, notes, maps, and the usual table
            chaos. The first two pieces are live now.
          </p>
          <div className={styles.heroActions}>
            <a href="#first-batch" className={styles.goldButton}>
              Shop the launch gear
            </a>
            <a href="#how-orders-work" className={styles.ghostButton}>
              How orders work
            </a>
          </div>
          <ul className={styles.heroPromises}>
            <li>Printed to order</li>
            <li>Secure Fourthwall checkout</li>
            <li>Final total shown before you pay</li>
          </ul>
        </div>

        <div className={styles.heroTable} aria-hidden="true">
          <div className={styles.mapGrid} />
          <div className={styles.die}>
            <span>20</span>
          </div>
          <div className={styles.note}>
            <strong>SESSION NOTES</strong>
            <span>□ name the tavern</span>
            <span>□ remember the rival</span>
            <span>☑ bring snacks</span>
          </div>
          <div className={styles.cup}>
            <span>ROLL FOR</span>
            <strong>CONSEQUENCES</strong>
          </div>
          <div className={styles.pencil} />
        </div>
      </header>

      <section className={styles.statusStrip} aria-label="Store status">
        <strong>{storefront.ordersOpen ? 'Orders are open' : 'First-batch preview'}</strong>
        <p>{storefront.notice}</p>
      </section>

      <section id="first-batch" className={styles.catalogSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Ready for the table</p>
          <h2>The first two pieces are live.</h2>
          <p>
            Both designs use the artwork you see here. Choose your size or
            product in Fourthwall, then check shipping and tax before you pay.
          </p>
        </div>

        <MerchStore storefront={storefront} checkoutStatus={checkoutStatus} />
      </section>

      <section id="how-orders-work" className={styles.readinessSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Before you place the order</p>
          <h2>Know the deal before you roll.</h2>
          <p>
            Made-to-order gear works best when the size, address, and shop rules
            are clear before anyone clicks the last button.
          </p>
        </div>

        <ol className={styles.readinessGrid}>
          <li>
            <span>01</span>
            <h3>Choose the exact item</h3>
            <p>
              The hoodie page includes every size from S through 5XL. The desk
              mat page lists its 31.5 × 15.5-inch size and care instructions.
            </p>
          </li>
          <li>
            <span>02</span>
            <h3>See the full total</h3>
            <p>
              Fourthwall keeps the cart and checkout together. Shipping, tax,
              delivery choices, and the final total appear before payment.
            </p>
          </li>
          <li>
            <span>03</span>
            <h3>Speak up if something is wrong</h3>
            <p>
              Damage, a misprint, the wrong item, or a lost package is not your
              problem to swallow. Contact the shop within the policy window.
            </p>
          </li>
        </ol>
      </section>

      <section className={styles.tableTalkSection}>
        <div>
          <p className={styles.eyebrow}>The Sixsmith Games shop</p>
          <h2>Take the table with you.</h2>
        </div>
        <p>
          These are the first two approved pieces. More gear can join them
          later, but only after the artwork and the finished product earn a
          place beside your dice.
        </p>
        <a href={FOURTHWALL_SHOP_URL}>
          Open the full shop
        </a>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Before you buy</p>
          <h2>The shop rules, in plain language.</h2>
        </div>
        <p className={styles.policyLinks}>
          Read the{' '}
          <a href={TERMS_OF_SALE_URL}>Terms of Sale</a>
          {' '}and the separate{' '}
          <a href={REFUND_POLICY_URL}>Refund & Return Policy</a>.
        </p>
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
