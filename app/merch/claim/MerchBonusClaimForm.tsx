/** Interactive order-number form for claiming merchandise-earned Studio time. */

'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';

import styles from './claim.module.css';

/** Submits only the public receipt number; account identity stays server-side. */
export default function MerchBonusClaimForm() {
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Keep the submit control inert until React owns the form. Without this
    // guard, a very fast tap during hydration could trigger the browser's
    // default GET submission before the protected JSON request is attached.
    setHydrated(true);
  }, []);

  async function claimBonus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    // Read the receipt number from the submitted form itself. Keeping this
    // field uncontrolled prevents an unrelated account-provider rerender from
    // replacing a number the shopper just typed during page startup.
    const submittedOrderNumber = new FormData(event.currentTarget).get('orderNumber');
    const orderNumber = typeof submittedOrderNumber === 'string'
      ? submittedOrderNumber.trim().toUpperCase()
      : '';
    if (!orderNumber) {
      setMessage('Enter the order number shown on your merchandise receipt.');
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      const response = await fetch('/api/merch-bonus/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber }),
      });
      const result: unknown = await response.json();
      const error =
        typeof result === 'object'
        && result !== null
        && 'error' in result
        && typeof result.error === 'string'
          ? result.error
          : null;
      const checkoutUrl =
        typeof result === 'object'
        && result !== null
        && 'checkoutUrl' in result
        && typeof result.checkoutUrl === 'string'
          ? result.checkoutUrl
          : null;
      const successMessage =
        typeof result === 'object'
        && result !== null
        && 'message' in result
        && typeof result.message === 'string'
          ? result.message
          : null;

      if (!response.ok || error) throw new Error(error ?? 'The claim could not be completed.');
      if (checkoutUrl) {
        window.location.assign(checkoutUrl);
        return;
      }
      setMessage(successMessage ?? 'Your Studio time is ready.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'The claim could not be completed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.accountGate}>
        <span>Sign in first so we can match the order to your account.</span>
        <Link className={styles.signInLink} href="/sign-in?redirect_url=/merch/claim">
          Sign in
        </Link>
      </div>
      <form className={styles.claimForm} onSubmit={claimBonus}>
        <label htmlFor="merch-order-number">Merchandise order number</label>
        <div>
          <input
            id="merch-order-number"
            name="orderNumber"
            autoComplete="off"
            inputMode="text"
            maxLength={32}
            placeholder="Shown on your receipt"
            required
          />
          <button type="submit" disabled={!hydrated || submitting}>
            {!hydrated
              ? 'Preparing claim…'
              : submitting
                ? 'Checking order…'
                : 'Claim my Studio time'}
          </button>
        </div>
        {message && <p role="status">{message}</p>}
      </form>
    </>
  );
}
