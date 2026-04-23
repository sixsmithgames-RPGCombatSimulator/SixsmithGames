import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import FacebookViewContent from '@/components/FacebookViewContent';
import LaunchAppButton from '@/components/LaunchAppButton';
import LaunchAppLink from '@/components/LaunchAppLink';
import ModernBackground from '@/components/ModernBackground';
import StructuredDataScript from '@/components/StructuredDataScript';
import { fluidGrid, pageGutter } from '@/lib/responsive';
import { createBreadcrumbSchema, createFaqSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

import { virtualCombatSimulatorProductDefinition } from '../marketing';

export const dynamic = 'force-static';

const product = virtualCombatSimulatorProductDefinition;
const CHARACTER_SHEET_DEEP_LINK = '/character/edit/new';

const CLOUDINARY_BASE =
  'https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto,w_1600/sixsmith-games/vcs';

function shotUrl(filename: string) {
  return `${CLOUDINARY_BASE}/${filename}`;
}

interface SheetZone {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  image: {
    filename: string;
    alt: string;
    caption?: string;
  };
  inlineCtaLabel?: string;
}

const sheetPages: Array<{ title: string; description: string }> = [
  {
    title: 'Summary page',
    description:
      'Identity, Armor Class, Hit Points with hit dice and death saves, the secondary stats row, weapons, the ability / skill grid, proficiencies, equipment, and wealth. The page the game master looks at during a turn.',
  },
  {
    title: 'Reference page',
    description:
      'Class features, features, species traits, and feats — each as a structured entry with an inline edit button so a ruling can be checked and corrected without leaving the sheet.',
  },
  {
    title: 'Spellbook page',
    description:
      'Spellcasting modifier, save DC, attack bonus, spell slots for levels 1-9, and a 15-row Known & Prepared Spells table with concentration / ritual / material flags and descriptions.',
  },
  {
    title: 'Character details page',
    description:
      'Character background & personality, physical description, storage, relationships, and political standing — each a collapsible panel, so the sheet stays scannable during combat.',
  },
];

const sheetZones: SheetZone[] = [
  {
    id: 'summary',
    title: 'The summary page — identity, combat, and weapons',
    summary:
      'The summary page opens with a top toolbar (Roster, Dashboard, Print Sheet, Smart Paste, Preview, Save Character) and puts everything a game master needs in a fight above the fold: the identity block, Armor Class with shield toggle, Hit Points with current / max / temporary / hit dice and death saves, the secondary stats row, and the weapons table.',
    bullets: [
      'Roster selector switches between Hero and NPC character pools',
      'Identity block: Character Name, Background, Class, Species, Subclass, plus Level and XP circles',
      'Combat row: Armor Class (with shield toggle), Hit Points (Cur / Max / Tmp), HD Max / HD Spent, and Death Saves',
      'Secondary stats row: Prof Bonus, Inspiration, Initiative, Speed, Size, Passive Perception',
      'Weapons table columns: Name / Atk Bonus · DC / Damage & Type / Range / Mastery / Notes — strict weapon eligibility, 2024 weapon mastery properties supported',
      'Multiclass-friendly hit dice expressions like "3d8 + 10d6 + 26" render correctly',
    ],
    image: {
      filename: 'character-sheet-overview.png',
      alt: 'Virtual Combat Simulator D&D character sheet editor summary page with identity, Armor Class, Hit Points, hit dice, death saves, secondary stats, and weapons table',
      caption: 'Summary page top half — identity, combat row, secondary stats, weapons.',
    },
    inlineCtaLabel: 'Build your character now →',
  },
  {
    id: 'abilities-proficiencies',
    title: 'Ability scores, skills, proficiencies, and portrait',
    summary:
      'Below the combat row, the summary page splits into a sidebar and a main column. The sidebar holds the six ability scores — each block paired with its saving throw and the skills tied to that ability. Next to it sits the Equipment Training & Other Proficiencies panel, and under the ability grid you can upload or pick a character portrait.',
    bullets: [
      'STR / DEX / CON / INT / WIS / CHA laid out as a compact 3 × 2 grid',
      'Each ability shows score, modifier, saving throw, and its associated skills with proficiency indicators',
      'Athletics under STR; Acrobatics, Sleight of Hand, Stealth under DEX; Arcana, History, Investigation, Nature, Religion under INT; and so on',
      'Equipment Training & Other Proficiencies panel: Armor Training (Light / Medium / Heavy / Shields), Weapon Proficiencies (Simple / Martial + specific list), three Tool Proficiency slots, three Language slots',
      'Portrait panel with Upload Image and Choose Existing buttons, plus an asset vault indicator for free and Game Master tiers',
    ],
    image: {
      filename: 'character-sheet-abilities-proficiencies.png',
      alt: 'Ability scores grid with skills, Equipment Training and Other Proficiencies panel, and character portrait panel on the VCS character sheet',
      caption: 'Ability grid, proficiencies, and portrait — all on one summary page.',
    },
    inlineCtaLabel: 'Start building my character →',
  },
  {
    id: 'equipment-wealth',
    title: 'Equipment and wealth',
    summary:
      'Carried gear and coin live side by side at the bottom of the summary page. The Equipment table has eight rows of Item / Qty / Weight so your pack is always ready, and the Wealth & Valuables panel breaks coin into Copper / Silver / Electrum / Gold / Platinum with optional named gems and valuables.',
    bullets: [
      'Equipment table with three columns: Item / Qty / Weight',
      'At least eight editable rows so the next piece of gear is always one click away',
      'Carried gear lives here; long-term storage lives on the Character details page',
      'Wealth & Valuables: CP / SP / EP / GP / PP coin cards',
      'Named gems and valuables render as a readable list with quantity prefixes (e.g. "3x Ruby")',
    ],
    image: {
      filename: 'character-sheet-equipment-wealth.png',
      alt: 'Equipment table and Wealth & Valuables panel on the VCS character sheet',
      caption: 'Equipment and wealth — carried gear and coin in one place.',
    },
  },
  {
    id: 'spellbook',
    title: 'Spellbook — casting stats, slots, and spells table',
    summary:
      'Spellcasters get a dedicated spellbook page. The Spellcasting Ability & Spell Slots block puts casting Modifier, Save DC, and Atk Bonus on the left, and a grid of spell slots for levels 1 through 9 (used / total) on the right. Below it, the Known & Prepared Spells table has 15 rows of full spell detail.',
    bullets: [
      'Casting Modifier, Save DC, and Atk Bonus — computed from ability + proficiency when not overridden',
      'Spell slots Lvl 1 – Lvl 9 as pairs of "used / total" inputs',
      'Known & Prepared Spells columns: Lvl / Prep / Spell Name / Time / Range / C · R · M / Description',
      'Concentration, Ritual, and Material flags inline per spell',
      '15 rows so a prepared wizard fits without scrolling',
    ],
    image: {
      filename: 'character-sheet-spellbook.png',
      alt: 'Spellbook page of the VCS character sheet with spellcasting stats, spell slots, and the known and prepared spells table',
      caption: 'Spellbook page — casting stats, slots 1-9, and 15-row spells table.',
    },
    inlineCtaLabel: 'Open the spellbook →',
  },
  {
    id: 'reference-background',
    title: 'Features, feats, and character background',
    summary:
      'The reference page holds your free-form Class Features, Species Traits, and Feats notes as three preformatted textareas, and flows into the Character Background & Personality panel — Personality Traits, Motivations, Ideals, Flaws, Backstory, and Bonds, each in its own labeled textarea.',
    bullets: [
      'Reference Page Notes: Class Features (Notes), Species Traits (Notes), Feats (Notes) in three dedicated textareas',
      'CHARACTER BACKGROUND & PERSONALITY: Personality Traits, Motivations, Ideals, Flaws, Backstory, Bonds — six labeled blocks',
      'Structured Class Features, Species Traits, Feats, and Features lists render above these notes with inline ✎ edit buttons',
      'Long-form prose rejects landing in the compact identity fields — it goes here instead',
    ],
    image: {
      filename: 'character-sheet-reference-background.png',
      alt: 'Reference Page Notes and Character Background & Personality panel on the VCS character sheet',
      caption: 'Reference notes and character background — where the prose lives.',
    },
  },
  {
    id: 'character-details',
    title: 'Physical description, storage, relationships, and political standing',
    summary:
      'The rest of the Character details page is made of four collapsible panels. Physical Description holds Appearance and Identifying Features. Storage & Additional Equipment tracks gear kept somewhere other than on the character. Relationships splits into Allies & Friends, Foes & Enemies, and Family. Political & Social Standing splits into Deeds & Titles, Political Influence, Political Knowledge, and Political Preferences.',
    bullets: [
      'PHYSICAL DESCRIPTION: Appearance + Identifying Features (scars, tattoos, unique markings)',
      'STORAGE & ADDITIONAL EQUIPMENT: items owned but not currently carried',
      'RELATIONSHIPS: Allies & Friends, Foes & Enemies, Family — three textareas',
      'POLITICAL & SOCIAL STANDING: Deeds & Titles, Political Influence, Political Knowledge, Political Preferences',
      'Each panel is collapsible so the default view stays focused',
    ],
    image: {
      filename: 'character-sheet-character-details.png',
      alt: 'Physical Description, Storage, Relationships, and Political & Social Standing collapsibles on the VCS character sheet character details page',
      caption: 'Character details — physical, storage, relationships, political standing.',
    },
  },
];

const sheetFaq = [
  {
    question: 'Is the Virtual Combat Simulator character sheet tied to D&D 5e?',
    answer:
      'Yes. The character sheet uses D&D 5e 2024 structure — the six ability scores, the 2024 weapon mastery column, the classic skill-under-ability layout, and the identity block fields are all D&D-shaped. Homebrew values are welcome, but the shape of the sheet is D&D 5e 2024.',
  },
  {
    question: 'Do I need an account to try the character sheet?',
    answer:
      'You can view this page and tour the character sheet without signing in. To actually save a character, upload a portrait, use Smart Paste, or print a real sheet, Virtual Combat Simulator asks you to sign in first — and then lands you right back on the character sheet editor.',
  },
  {
    question: 'What happens when I click "Open the character sheet editor" while signed out?',
    answer:
      'You get a sign-in modal. After you sign in or create a free account, you are sent straight to a blank character sheet in the Virtual Combat Simulator app, not dropped off at a generic dashboard. Signed-in users skip the modal and go directly to the editor.',
  },
  {
    question: 'Does the character sheet support multiclass characters?',
    answer:
      'Yes. Multiclass characters such as Rogue 3 / Wizard 10 are treated as first-class citizens. Mixed hit dice expressions like "3d8 + 10d6 + 26" display correctly, and class features, feats, and spell slots come from the canonical character model instead of a single-class assumption.',
  },
  {
    question: 'What does Smart Paste do?',
    answer:
      'Smart Paste takes a block of text from a character builder, PDF, or notes app and classifies it into the canonical character model. Ability scores go to the ability grid, compact identity goes to the identity header, weapons go to the weapons table, spells go to the spells table, and long prose goes to the Character details page instead of landing in the Background field. Smart Paste is strict on purpose — the weapon table and the identity fields reject content that does not match their shape.',
  },
  {
    question: 'Is the character sheet the same as the token on the battle map?',
    answer:
      'Yes. The character sheet and the battle-room token read and write to the same canonical character model. Hit points, conditions, and initiative set on the sheet show up on the token, and changes on the token show up on the sheet. One character, two surfaces.',
  },
  {
    question: 'Can I print or export the character sheet?',
    answer:
      'Yes. The Preview button locks every input and shows the exact printable layout. The Print Sheet button runs the browser print dialog against that layout, so the summary, reference, spellbook, and details pages each print as their own portrait-oriented page.',
  },
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/tools' },
  { label: product.name, href: product.officialPath },
  { label: 'Character sheet', href: '/apps/virtual-combat-simulator/character-sheet' },
];

function Figure({
  filename,
  alt,
  caption,
  priority = false,
  clickable = false,
}: {
  filename: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  clickable?: boolean;
}) {
  const img = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={shotUrl(filename)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        background: '#0f172a',
      }}
    />
  );

  const figureContent = (
    <figure
      style={{
        margin: 0,
        borderRadius: '18px',
        overflow: 'hidden',
        background: '#0f172a',
        border: `1px solid ${product.theme.lightBorder}`,
        boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
      }}
    >
      {img}
      {caption ? (
        <figcaption
          style={{
            padding: '0.75rem 1rem',
            fontSize: '0.9rem',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.82)',
            background: 'rgba(15,23,42,0.92)',
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );

  if (!clickable) return figureContent;

  return (
    <LaunchAppLink
      appSlug={product.slug}
      deepLinkPath={CHARACTER_SHEET_DEEP_LINK}
      trackingSurface="character_sheet_figure"
      ariaLabel={`Open the character sheet editor — ${alt}`}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit', width: '100%' }}
    >
      {figureContent}
    </LaunchAppLink>
  );
}

function heroLaunchButtonStyle(): React.CSSProperties {
  return {
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
  };
}

function inlineLaunchButtonStyle(): React.CSSProperties {
  return {
    background: product.theme.accent,
    color: 'white',
    padding: '0.75rem 1.2rem',
    borderRadius: '999px',
    fontSize: '0.95rem',
    fontWeight: 800,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
    border: 'none',
    cursor: 'pointer',
  };
}

export default function VcsCharacterSheetPage() {
  return (
    <div style={{ background: '#f8fafc' }}>
      <FacebookViewContent
        contentId={`${product.slug}-character-sheet`}
        contentName={`${product.name} character sheet`}
        contentType="product"
      />
      <StructuredDataScript data={createFaqSchema(sheetFaq)} />
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
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: `0 ${pageGutter}`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Breadcrumbs items={breadcrumbItems} tone="dark" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: fluidGrid('320px'),
              gap: '2.25rem',
              alignItems: 'center',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
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
                Deep dive — Character sheet
              </div>
              <h1
                style={{
                  fontSize: 'clamp(2.1rem, 5.5vw, 3.6rem)',
                  lineHeight: 1.08,
                  fontWeight: 900,
                  margin: '0 0 1rem',
                }}
              >
                The Virtual Combat Simulator D&amp;D character sheet editor
              </h1>
              <p
                style={{
                  fontSize: '1.14rem',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.92)',
                  margin: '0 0 1rem',
                }}
              >
                Build your adventurer in one place — identity, combat stats, weapons, ability scores, skills, spells, equipment, wealth, features, and long-form character details — then hand them to a token on the battle map.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.86)', margin: '0 0 1.5rem' }}>
                Click the sheet to open the editor. Signed in? You land on a blank character sheet. Not signed in? A quick sign-in modal pops up, and we send you right back to that blank sheet the moment you finish.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                <LaunchAppButton
                  appSlug={product.slug}
                  deepLinkPath={CHARACTER_SHEET_DEEP_LINK}
                  style={heroLaunchButtonStyle()}
                >
                  Open the character sheet editor
                </LaunchAppButton>
                <Link
                  href={product.officialPath}
                  style={{
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
                  }}
                >
                  Back to Virtual Combat Simulator
                </Link>
              </div>
            </div>
            <div>
              <LaunchAppLink
                appSlug={product.slug}
                deepLinkPath={CHARACTER_SHEET_DEEP_LINK}
                trackingSurface="character_sheet_hero_media"
                ariaLabel="Open the Virtual Combat Simulator character sheet editor"
                style={{ display: 'block', textDecoration: 'none', color: 'inherit', width: '100%' }}
              >
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
                    src={shotUrl('character-sheet-overview.png')}
                    alt="Virtual Combat Simulator D&D character sheet editor with identity, combat stats, and weapons table"
                    loading="eager"
                    decoding="async"
                    style={{ display: 'block', width: '100%', height: 'auto', background: '#0f172a' }}
                  />
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
                    Click to open the editor
                    <span aria-hidden="true">→</span>
                  </figcaption>
                </figure>
              </LaunchAppLink>
            </div>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `3rem ${pageGutter} 5rem` }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>
            Four pages, one character
          </h2>
          <p style={{ margin: '0 0 1.25rem', color: '#334155', lineHeight: 1.85, fontSize: '1rem' }}>
            The character sheet is a single document made of four portrait-oriented pages. Each page owns a different kind of information, so the summary page stays fast to scan during combat and the long-form prose has its own home.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: fluidGrid('240px'), gap: '1rem' }}>
            {sheetPages.map((page) => (
              <article
                key={page.title}
                style={{
                  background: 'white',
                  border: `1px solid ${product.theme.lightBorder}`,
                  borderRadius: '18px',
                  padding: '1rem 1.1rem',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  {page.title}
                </h3>
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {page.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {sheetZones.map((zone, index) => {
          const imageFirst = index % 2 === 0;
          const textBlock = (
            <div key={`${zone.id}-text`}>
              <h2
                style={{
                  fontSize: '1.7rem',
                  fontWeight: 900,
                  color: '#0f172a',
                  margin: '0 0 0.85rem',
                  lineHeight: 1.2,
                }}
              >
                {zone.title}
              </h2>
              <p
                style={{
                  margin: '0 0 1rem',
                  color: '#334155',
                  lineHeight: 1.85,
                  fontSize: '1rem',
                }}
              >
                {zone.summary}
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1.2rem',
                  color: '#334155',
                  lineHeight: 1.8,
                  display: 'grid',
                  gap: '0.35rem',
                }}
              >
                {zone.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {zone.inlineCtaLabel ? (
                <div style={{ marginTop: '1.1rem' }}>
                  <LaunchAppButton
                    appSlug={product.slug}
                    deepLinkPath={CHARACTER_SHEET_DEEP_LINK}
                    style={inlineLaunchButtonStyle()}
                  >
                    {zone.inlineCtaLabel}
                  </LaunchAppButton>
                </div>
              ) : null}
            </div>
          );
          const imageBlock = (
            <div key={`${zone.id}-image`}>
              <Figure
                filename={zone.image.filename}
                alt={zone.image.alt}
                caption={zone.image.caption}
                clickable
                priority={index === 0}
              />
            </div>
          );
          return (
            <section
              key={zone.id}
              id={zone.id}
              style={{
                marginBottom: '3rem',
                display: 'grid',
                gridTemplateColumns: fluidGrid('360px'),
                gap: '1.75rem',
                alignItems: 'center',
                scrollMarginTop: '5rem',
              }}
            >
              {imageFirst ? (
                <>
                  {imageBlock}
                  {textBlock}
                </>
              ) : (
                <>
                  {textBlock}
                  {imageBlock}
                </>
              )}
            </section>
          );
        })}

        <section
          style={{
            marginBottom: '3rem',
            background: product.theme.dark,
            color: 'white',
            borderRadius: '22px',
            padding: '2rem',
            boxShadow: '0 20px 48px rgba(15,23,42,0.2)',
            display: 'grid',
            gridTemplateColumns: fluidGrid('320px'),
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.65rem' }}>
              Ready to build your character?
            </h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.86)', lineHeight: 1.8, fontSize: '1rem' }}>
              The character sheet editor is free to open and free to use. Sign in once and every sheet you build is saved to your Virtual Combat Simulator library, ready to drop onto a battle map.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <LaunchAppButton
              appSlug={product.slug}
              deepLinkPath={CHARACTER_SHEET_DEEP_LINK}
              style={{
                background: 'white',
                color: product.theme.accent,
                padding: '0.9rem 1.4rem',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 32px rgba(0,0,0,0.3)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Open the character sheet editor
            </LaunchAppButton>
            <Link
              href={product.officialPath}
              style={{
                background: 'rgba(255,255,255,0.14)',
                color: 'white',
                padding: '0.9rem 1.4rem',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.24)',
              }}
            >
              Back to VCS overview
            </Link>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>
            Frequently asked questions
          </h2>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {sheetFaq.map((entry) => (
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
                <summary style={{ cursor: 'pointer', fontWeight: 800, color: '#0f172a' }}>
                  {entry.question}
                </summary>
                <p style={{ margin: '0.9rem 0 0', color: '#475569', lineHeight: 1.8 }}>{entry.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          style={{
            marginBottom: '1rem',
            background: 'white',
            border: `1px solid ${product.theme.lightBorder}`,
            borderRadius: '22px',
            padding: '1.75rem',
            boxShadow: '0 18px 40px rgba(15,23,42,0.06)',
          }}
        >
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.75rem' }}>
            Three ways in
          </h2>
          <p style={{ margin: '0 0 1.25rem', color: '#475569', lineHeight: 1.8 }}>
            The editor is free. Pricing gets you storage, premium tools, and more asset vault capacity when you need it.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <LaunchAppButton
              appSlug={product.slug}
              deepLinkPath={CHARACTER_SHEET_DEEP_LINK}
              style={{
                background: product.theme.accent,
                color: 'white',
                padding: '0.9rem 1.35rem',
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
              }}
            >
              Open the character sheet editor
            </LaunchAppButton>
            <Link
              href={product.officialPath}
              style={{
                background: product.theme.tint,
                border: `1px solid ${product.theme.lightBorder}`,
                color: product.theme.dark,
                padding: '0.9rem 1.35rem',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Back to Virtual Combat Simulator
            </Link>
            <Link
              href={product.pricingPath}
              style={{
                background: product.theme.dark,
                color: 'white',
                padding: '0.9rem 1.35rem',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              See pricing
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
