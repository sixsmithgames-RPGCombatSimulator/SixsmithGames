/**
 * Flagship pricing page.
 *
 * Only GameMaster Studio and its two standalone modules belong here. Prices and
 * plan IDs reuse the existing Stripe setup; this page changes the presentation,
 * not the billing contract.
 */

import type { Metadata } from 'next';

import StructuredDataScript from '@/components/StructuredDataScript';
import SubscribeButton from '@/components/SubscribeButton';
import { buildPageMetadata } from '@/lib/metadata';
import { createFaqSchema } from '@/lib/schema';
import styles from './pricing.module.css';

export const metadata: Metadata = buildPageMetadata({
  title: 'GameMaster Studio Pricing | Studio, GameMasterCraft, or VCS',
  description:
    'Choose GameMaster Studio for $14.99 a month, GameMasterCraft AI for $9.99 a month, or Virtual Combat Simulator GM for $9.99 a month.',
  path: '/pricing',
});

const plans = [
  {
    id: 'ai-features',
    name: 'GameMasterCraft AI',
    eyebrow: 'Campaign side',
    price: '$9.99',
    description:
      'For GMs who want campaign memory and AI-assisted prep, but already have the table side covered.',
    features: [
      'Campaign workspace for NPCs, factions, places, lore, and recaps',
      'AI-assisted brainstorming and prep',
      'Keep using the core campaign workspace without the VCS plan',
    ],
    cta: 'Choose GameMasterCraft',
  },
  {
    id: 'bundle',
    name: 'GameMaster Studio',
    eyebrow: 'Campaign + table',
    price: '$14.99',
    description:
      'For GMs who want the full rhythm: prepare the campaign in GameMasterCraft and run the encounter in VCS.',
    features: [
      'Everything in GameMasterCraft AI',
      'VCS paid Game Master tools',
      'Save $5 each month compared with both standalone plans',
    ],
    cta: 'Choose Studio',
    featured: true,
  },
  {
    id: 'virtual-combat-simulator',
    name: 'VCS Game Master',
    eyebrow: 'Table side',
    price: '$9.99',
    description:
      'For GMs who need a cleaner battle room without adding a campaign planning subscription.',
    features: [
      'Battle map, tokens, fog, grid, and measurement tools',
      'Initiative, hit points, conditions, and turn control',
      'Paid storage and Game Master tools',
    ],
    cta: 'Choose VCS',
  },
];

const faq = [
  {
    question: 'Do I have to buy the full Studio plan?',
    answer:
      'No. GameMasterCraft AI and VCS Game Master stay available as individual $9.99 monthly subscriptions. Choose Studio only when you want both.',
  },
  {
    question: 'Why is Studio $14.99 instead of $19.98?',
    answer:
      'Studio bundles the two $9.99 plans and saves you $5 each month. It is the better fit when both campaign prep and encounter control are part of your regular GM work.',
  },
  {
    question: 'Can I try the tools before subscribing?',
    answer:
      'Yes. Both tools are free to open and try. Choose a paid plan when you want GameMasterCraft AI features, the paid VCS Game Master tools, or both.',
  },
  {
    question: 'Can I cancel later?',
    answer:
      'Subscriptions are monthly. You can manage your plan from your account and stop the next renewal when you no longer need it.',
  },
  {
    question: 'Does Studio automatically sync every campaign and combat change?',
    answer:
      'Not yet. The handoff foundation is built, while the customer-facing connection is still being finished. Today, the GM chooses what encounter details become campaign history.',
  },
];

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <StructuredDataScript data={createFaqSchema(faq)} />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Simple monthly plans</p>
        <h1>Bring the whole Studio, or take the module you need.</h1>
        <p>
          No need to pay for both if your current setup already handles half the
          job. GameMasterCraft and VCS remain available on their own.
        </p>
      </section>

      <main>
        <section className={styles.planSection} aria-labelledby="plans-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Choose your side of the screen</p>
            <h2 id="plans-heading">Three plans. One honest difference.</h2>
          </div>

          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={plan.featured ? styles.featured : undefined}
              >
                {plan.featured && <span className={styles.valueFlag}>Best value</span>}
                <p className={styles.planEyebrow}>{plan.eyebrow}</p>
                <h3>{plan.name}</h3>
                <p className={styles.price}>
                  <strong>{plan.price}</strong>
                  <span> / month</span>
                </p>
                <p className={styles.description}>{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <SubscribeButton planId={plan.id} className={styles.planButton}>
                  {plan.cta}
                </SubscribeButton>
              </article>
            ))}
          </div>
          <p className={styles.finePrint}>
            Prices are in US dollars and renew monthly until canceled.
          </p>
        </section>

        <section className={styles.comparisonSection} aria-labelledby="comparison-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>At a glance</p>
            <h2 id="comparison-heading">What lives in each plan</h2>
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th scope="col">What you get</th>
                  <th scope="col">GameMasterCraft</th>
                  <th scope="col">Studio</th>
                  <th scope="col">VCS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Campaign workspace</th>
                  <td><span className={styles.yes}>Yes</span></td>
                  <td><span className={styles.yes}>Yes</span></td>
                  <td>—</td>
                </tr>
                <tr>
                  <th scope="row">GameMasterCraft AI help</th>
                  <td><span className={styles.yes}>Yes</span></td>
                  <td><span className={styles.yes}>Yes</span></td>
                  <td>—</td>
                </tr>
                <tr>
                  <th scope="row">VCS encounter room</th>
                  <td>—</td>
                  <td><span className={styles.yes}>Yes</span></td>
                  <td><span className={styles.yes}>Yes</span></td>
                </tr>
                <tr>
                  <th scope="row">VCS paid GM tools</th>
                  <td>—</td>
                  <td><span className={styles.yes}>Yes</span></td>
                  <td><span className={styles.yes}>Yes</span></td>
                </tr>
                <tr>
                  <th scope="row">Monthly price</th>
                  <td>$9.99</td>
                  <td><strong>$14.99</strong></td>
                  <td>$9.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Questions before the session</p>
            <h2 id="faq-heading">The details, without the fog.</h2>
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
      </main>
    </div>
  );
}
