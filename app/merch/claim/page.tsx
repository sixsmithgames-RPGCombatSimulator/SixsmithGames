/** Customer page for claiming GameMaster Studio time included with merchandise. */

import type { Metadata } from 'next';

import { buildPageMetadata } from '@/lib/metadata';
import MerchBonusClaimForm from './MerchBonusClaimForm';
import styles from './claim.module.css';

export const metadata: Metadata = buildPageMetadata({
  title: 'Claim Merchandise Studio Time | Sixsmith Games',
  description: 'Claim the GameMaster Studio months included with qualifying Sixsmith Games merchandise.',
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
          Use the same email for your merchandise order and your Sixsmith Games
          account. Enter the order number from the paid receipt, and we will
          match the bonus to you.
        </p>
        <ul>
          <li>Gateway Wyrm Desk Mat: one free month</li>
          <li>Either Master Your Stories hoodie: three free months</li>
          <li>Qualifying items in the same order add together</li>
        </ul>
        <MerchBonusClaimForm />
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
