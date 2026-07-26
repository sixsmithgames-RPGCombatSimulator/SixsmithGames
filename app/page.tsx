/**
 * GameMaster Studio flagship landing page.
 *
 * The copy speaks directly to tabletop GMs and stays within verified product
 * behavior. In particular, it describes the current GMC-to-VCS workflow as a
 * deliberate handoff rather than claiming an automatic sync that is not yet in
 * the customer interface.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import MarketingLink from '@/components/MarketingLink';
import StructuredDataScript from '@/components/StructuredDataScript';
import SubscribeButton from '@/components/SubscribeButton';
import { buildPageMetadata } from '@/lib/metadata';
import { productScreenshots } from '@/lib/screenshots';
import { createFaqSchema } from '@/lib/schema';
import styles from './flagship.module.css';

export const metadata: Metadata = buildPageMetadata({
  title: 'GameMaster Studio | Campaign Prep and VTT Combat for Game Masters',
  description:
    'Keep campaign lore, NPCs, factions, maps, tokens, initiative, hit points, and conditions under control with GameMasterCraft and Virtual Combat Simulator.',
  path: '/',
});

const gmcScreenshot = productScreenshots.gameMasterCraft[2];
const vcsScreenshot = productScreenshots.virtualCombatSimulator[0];

const faq = [
  {
    question: 'What is GameMaster Studio?',
    answer:
      'GameMaster Studio brings GameMasterCraft and Virtual Combat Simulator together for game masters. GameMasterCraft holds the campaign side of the work. VCS handles the live encounter side.',
  },
  {
    question: 'Can I subscribe to GameMasterCraft or VCS on its own?',
    answer:
      'Yes. GameMasterCraft AI is $9.99 per month, and the Virtual Combat Simulator GM plan is $9.99 per month. The full GameMaster Studio plan includes both for $14.99 per month.',
  },
  {
    question: 'Does combat automatically change my campaign notes?',
    answer:
      'Not yet. The handoff foundation is in place, but the customer-facing workflow is still being finished. Today, you choose what encounter details belong in campaign history and carry those consequences into your next prep.',
  },
  {
    question: 'Can I start without paying?',
    answer:
      'Yes. You can open the tools and get a feel for the workflow before choosing a paid plan. Paid plans unlock the AI-assisted GameMasterCraft features and the paid Game Master tools in VCS.',
  },
];

const workflowSteps = [
  {
    number: '01',
    title: 'Build the campaign',
    body: 'Keep the NPCs, factions, places, lore, and loose threads you will need again in GameMasterCraft.',
  },
  {
    number: '02',
    title: 'Prep what matters tonight',
    body: 'Pull together the people, stakes, and encounter details that are likely to reach the table.',
  },
  {
    number: '03',
    title: 'Run the fight in VCS',
    body: 'Keep the map, tokens, initiative, hit points, conditions, and combat controls in one battle room.',
  },
  {
    number: '04',
    title: 'Carry the consequences forward',
    body: 'Save the combat record, decide what becomes campaign truth, and start the next session with the fallout already in mind.',
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <StructuredDataScript data={createFaqSchema(faq)} />

      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>GameMaster Studio</p>
          <h1>
            Keep the campaign straight.
            <span>Run the fight.</span>
          </h1>
          <p className={styles.heroLead}>
            GameMasterCraft keeps hold of the people, places, factions, and lore.
            Virtual Combat Simulator keeps the map, tokens, initiative, hit
            points, and conditions moving when the dice hit the table.
          </p>
          <div className={styles.heroActions}>
            <MarketingLink
              href="/sign-up"
              className={styles.goldButton}
              eventName="studio_signup_click"
              eventData={{ placement: 'hero', plan: 'free_start' }}
            >
              Start free
            </MarketingLink>
            <MarketingLink
              href="#workflow"
              className={styles.ghostButton}
              eventName="studio_workflow_click"
              eventData={{ placement: 'hero' }}
            >
              See the workflow
            </MarketingLink>
          </div>
          <p className={styles.heroNote}>
            Free to start. Choose Studio or subscribe to either module on its own.
          </p>
        </div>

        <div className={styles.heroVisual} aria-label="GameMaster Studio product views">
          <div className={`${styles.screenCard} ${styles.campaignScreen}`}>
            <span>Campaign side · GameMasterCraft</span>
            <Image
              src={gmcScreenshot.src}
              alt={gmcScreenshot.alt}
              width={gmcScreenshot.width}
              height={gmcScreenshot.height}
              priority
              sizes="(max-width: 900px) 92vw, 46vw"
            />
          </div>
          <div className={`${styles.screenCard} ${styles.combatScreen}`}>
            <span>Table side · VCS</span>
            <Image
              src={vcsScreenshot.src}
              alt={vcsScreenshot.alt}
              width={vcsScreenshot.width}
              height={vcsScreenshot.height}
              priority
              sizes="(max-width: 900px) 92vw, 46vw"
            />
          </div>
        </div>
      </section>

      <div className={styles.tableStrip}>
        <span>Browser-based</span>
        <span>Free to start</span>
        <span>Campaign prep + encounter control</span>
        <span>Keep the final call in the GM&apos;s hands</span>
      </div>

      <section id="why-studio" className={styles.problemSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>The part nobody misses</p>
          <h2>Your notes know the villain. Your VTT does not.</h2>
          <p>
            The session starts, five tabs open, and the one detail you need is
            buried in last month&apos;s notes. Studio gives the campaign and the
            encounter a clear place to live.
          </p>
        </div>
        <div className={styles.problemGrid}>
          <article>
            <span aria-hidden="true">✦</span>
            <h3>Stop rebuilding context</h3>
            <p>
              Keep recurring NPCs, factions, places, and consequences where you
              can find them before the recap turns into archaeology.
            </p>
          </article>
          <article>
            <span aria-hidden="true">⚔</span>
            <h3>Keep combat on one screen</h3>
            <p>
              Run the battle map, turn order, tokens, hit points, conditions,
              and the active combatant from a shared encounter view.
            </p>
          </article>
          <article>
            <span aria-hidden="true">◆</span>
            <h3>Decide what becomes canon</h3>
            <p>
              A dropped sword can be forgotten. A dead rival cannot. You decide
              which table events belong in the campaign&apos;s future.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.modulesSection}>
        <div className={styles.moduleCopy}>
          <p className={styles.eyebrow}>Campaign side</p>
          <h2>GameMasterCraft remembers what the party changed.</h2>
          <p>
            Keep NPCs, factions, locations, lore, timelines, recaps, and the
            hooks you promised yourself you would remember in one campaign
            workspace. Add AI help when you want a faster first pass at prep.
          </p>
          <Link href="/apps/gamemastercraft">See GameMasterCraft →</Link>
        </div>
        <div className={styles.moduleImage}>
          <Image
            src={gmcScreenshot.src}
            alt={gmcScreenshot.alt}
            width={gmcScreenshot.width}
            height={gmcScreenshot.height}
            sizes="(max-width: 900px) 92vw, 48vw"
          />
        </div>

        <div className={`${styles.moduleCopy} ${styles.combatCopy}`}>
          <p className={styles.eyebrow}>Table side</p>
          <h2>VCS keeps the fight readable when the turn gets messy.</h2>
          <p>
            Put the battle map, tokens, initiative, hit points, conditions,
            character context, fog, measuring, and combat controls together so
            everyone can see what matters now.
          </p>
          <Link href="/apps/virtual-combat-simulator">See VCS →</Link>
        </div>
        <div className={`${styles.moduleImage} ${styles.combatImage}`}>
          <Image
            src={vcsScreenshot.src}
            alt={vcsScreenshot.alt}
            width={vcsScreenshot.width}
            height={vcsScreenshot.height}
            sizes="(max-width: 900px) 92vw, 48vw"
          />
        </div>
      </section>

      <section id="workflow" className={styles.workflowSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>One GM rhythm</p>
          <h2>From “what did they do?” to “roll initiative.”</h2>
          <p>
            The current workflow keeps you in control of the handoff. Automation
            will not quietly rewrite the campaign behind your screen.
          </p>
        </div>
        <ol className={styles.workflowGrid}>
          {workflowSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.pricingSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Pick the piece you need</p>
          <h2>One Studio. Two modules. No forced bundle.</h2>
          <p>
            Use the full loop for $14.99 a month, or keep GameMasterCraft and VCS
            as individual subscriptions for $9.99 a month each.
          </p>
        </div>

        <div className={styles.priceGrid}>
          <article>
            <p className={styles.planName}>GameMasterCraft AI</p>
            <p className={styles.price}><strong>$9.99</strong> / month</p>
            <ul>
              <li>Campaign workspace</li>
              <li>AI-assisted prep</li>
              <li>NPC, faction, place, and lore support</li>
            </ul>
            <SubscribeButton planId="ai-features" className={styles.planButton}>
              Choose GameMasterCraft
            </SubscribeButton>
          </article>

          <article className={styles.featuredPlan}>
            <span className={styles.bestValue}>Best value</span>
            <p className={styles.planName}>GameMaster Studio</p>
            <p className={styles.price}><strong>$14.99</strong> / month</p>
            <ul>
              <li>Everything in GameMasterCraft AI</li>
              <li>VCS paid Game Master tools</li>
              <li>Save $5 compared with both separately</li>
            </ul>
            <SubscribeButton planId="bundle" className={styles.planButton}>
              Choose Studio
            </SubscribeButton>
          </article>

          <article>
            <p className={styles.planName}>VCS Game Master</p>
            <p className={styles.price}><strong>$9.99</strong> / month</p>
            <ul>
              <li>Battle map and token tools</li>
              <li>Initiative and turn control</li>
              <li>Paid storage and GM tools</li>
            </ul>
            <SubscribeButton
              planId="virtual-combat-simulator"
              className={styles.planButton}
            >
              Choose VCS
            </SubscribeButton>
          </article>
        </div>
        <Link href="/pricing" className={styles.pricingLink}>
          Compare the plans in full →
        </Link>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Before you commit</p>
          <h2>Straight answers for game masters.</h2>
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

      <section className={styles.finalCta}>
        <p className={styles.eyebrow}>Your next session is coming</p>
        <h2>Spend the prep on the game, not on finding the prep.</h2>
        <p>
          Start free, bring over one campaign, and see whether the Studio rhythm
          fits the way you run.
        </p>
        <MarketingLink
          href="/sign-up"
          className={styles.goldButton}
          eventName="studio_signup_click"
          eventData={{ placement: 'final_cta', plan: 'free_start' }}
        >
          Start free
        </MarketingLink>
      </section>
    </div>
  );
}
