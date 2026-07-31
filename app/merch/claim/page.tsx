/** Customer page for claiming the separate Studio coupon earned from merchandise. */

import type { Metadata } from 'next';

import { buildPageMetadata } from '@/lib/metadata';
import MerchBonusClaimForm from './MerchBonusClaimForm';
import styles from './claim.module.css';

export const metadata: Metadata = buildPageMetadata({
  title: 'Claim Merchandise Studio Time | Sixsmith Games',
  description: 'Claim the separate GameMaster Studio coupon earned from qualifying Sixsmith Games merchandise.',
  path: '/merch/claim',
});

/** Explains the earned time; the interactive form handles sign-in state. */
export default function MerchBonusClaimPage() {
  return (
    <main className={styles.page}>
      <section className={styles.claimCard}>
        <p className={styles.eyebrow}>Your merch bonus</p>
        <h1>Bring your Studio time to the table.</h1>
        <p>
          Your paid order unlocks a separate, one-use Studio coupon. Enter the
          receipt number using the same email as your Sixsmith Games account.
        </p>
        <ul>
          <li>Gateway Wyrm Desk Mat: one Studio month</li>
          <li>Either Master Your Stories hoodie: three Studio months</li>
          <li>Qualifying items add together</li>
        </ul>
        <MerchBonusClaimForm />
        <p className={styles.helpText}>
          Existing Studio subscriptions get the earned time added. If the coupon
          starts a new subscription, standard monthly billing begins after the
          coupon ends unless you cancel first. The coupon has no cash value and
          cannot be transferred.
        </p>
        <p className={styles.helpText}>
          Already have a different Sixsmith Games plan? Contact{' '}
          <a href="mailto:info@sixsmithgames.com">info@sixsmithgames.com</a>{' '}
          with the order number so we can add the time without starting a
          second subscription.
        </p>
      </section>
    </main>
  );
}
