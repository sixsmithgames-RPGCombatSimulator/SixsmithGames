import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import FacebookViewContent from '@/components/FacebookViewContent';
import LaunchAppButton from '@/components/LaunchAppButton';
import ModernBackground from '@/components/ModernBackground';
import StructuredDataScript from '@/components/StructuredDataScript';
import { fluidGrid, pageGutter } from '@/lib/responsive';
import { createBreadcrumbSchema, createFaqSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

import { virtualCombatSimulatorProductDefinition } from '../marketing';

export const dynamic = 'force-static';

const product = virtualCombatSimulatorProductDefinition;

const CLOUDINARY_BASE =
  'https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto,w_1600/sixsmith-games/vcs';

function shotUrl(filename: string) {
  return `${CLOUDINARY_BASE}/${filename}`;
}

interface SheetFeature {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  image: {
    filename: string;
    alt: string;
    caption?: string;
  };
}

const sheetPages: Array<{ title: string; description: string }> = [
  {
    title: 'Summary page',
    description:
      'The first page of the character sheet — identity block (name, background, class, species, subclass, level, XP), Armor Class, Hit Points with hit dice and death saves, the secondary stats row, the weapons table, the ability / skill grid, equipment training and other proficiencies, the equipment table, and wealth & valuables. This is the page the game master looks at during a turn.',
  },
  {
    title: 'Reference page',
    description:
      'A dedicated page for rulings — action economy, class features, features, species traits, and feats. Each entry is a structured name + description row with an inline edit button so a ruling can be checked and corrected without leaving the sheet.',
  },
  {
    title: 'Spellbook page',
    description:
      'A dedicated spellbook page for spellcasters — spellcasting modifier, save DC, attack bonus, spell slots for levels 1-9 as "used / total", and a 15-row Known & Prepared Spells table with level, prepared checkbox, name, casting time, range, concentration / ritual / material flags, and description.',
  },
  {
    title: 'Character details page',
    description:
      'The long-form details — character background & personality, physical description, storage & additional equipment, relationships, political & social standing, optional legendary / mythic / lair actions for monsters, minions & followers, and a free-form notes block. Collapsible so you only expand what you are editing.',
  },
];

const sheetFeatures: SheetFeature[] = [
  {
    id: 'toolbar',
    title: 'Toolbar — roster, print, smart paste, preview, save',
    summary:
      'Every destructive or exporting action lives in the top toolbar so nothing is buried. Switch between the Hero and NPC roster, go back to the dashboard, print the sheet, open Smart Paste to import a character from text, toggle Preview to see the printable layout, or save the character to your account.',
    bullets: [
      'Roster selector switches between Hero and NPC character pools',
      '← Dashboard returns to the Virtual Combat Simulator dashboard without losing work',
      '🖨️ Print Sheet runs the browser print dialog against the printable layout',
      '✨ Smart Paste opens the paste-to-import modal',
      '👁️ Preview toggles a read-only presentation of the sheet; ✏️ Edit returns to input mode',
      '💾 Save Character writes the canonical character to your library',
    ],
    image: {
      filename: 'character-sheet-toolbar.png',
      alt: 'Top toolbar of the Virtual Combat Simulator character sheet editor with Roster, Dashboard, Print Sheet, Smart Paste, Preview, and Save Character buttons',
      caption: 'Toolbar — roster, dashboard, print, Smart Paste, preview, save.',
    },
  },
  {
    id: 'identity',
    title: 'Identity block — name, class, species, subclass, level, XP',
    summary:
      'The top of the sheet holds the compact identity: Character Name across the top, Background and Class on the second row, Species and Subclass on the third, with Level and XP circles anchored on the right. Identity fields are intentionally compact so long narrative prose cannot silently land in the background slot.',
    bullets: [
      'Character Name as the main identity input',
      'Background (e.g. Soldier), Class (e.g. Fighter), Species (e.g. Human), Subclass (e.g. Rune Knight)',
      'Level and XP as circular badges on the right',
      'Compact shape rejects paragraph-style prose — backstory goes to the details page, not here',
    ],
    image: {
      filename: 'character-sheet-identity.png',
      alt: 'Identity block on the VCS character sheet with Character Name, Background, Class, Species, Subclass, Level, and XP',
      caption: 'Identity block — compact fields plus Level and XP circles.',
    },
  },
  {
    id: 'combat-row',
    title: 'Armor Class, Hit Points, Hit Dice, Death Saves — one row',
    summary:
      'The combat top row puts everything the game master needs on a single line: Armor Class (with a shield toggle), Hit Points (Current / Max / Temporary), Hit Dice (HD Max / HD Spent), and the Death Saves tracker (three Successes and three Failures).',
    bullets: [
      'Armor Class with integrated shield icon and shield-equipped checkbox',
      'Hit Points split into Current, Max, and Temporary',
      'Hit Dice as HD Max (e.g. 1d8) and HD Spent, ready for short rests',
      'Death Saves: three Successes and three Failures, click to increment',
      'Multiclass-friendly hit dice expressions like "3d8 + 10d6" render correctly',
    ],
    image: {
      filename: 'character-sheet-combat-row.png',
      alt: 'Combat row on the VCS character sheet with Armor Class, Hit Points, Hit Dice, and Death Saves',
      caption: 'Combat row — AC, HP, hit dice, and death saves on one line.',
    },
  },
  {
    id: 'secondary-stats',
    title: 'Secondary stats — Prof, Inspiration, Initiative, Speed, Size, Passive Perception',
    summary:
      'The six secondary stats that come up every turn live in a single row so the game master never has to hunt for them: Proficiency Bonus, Inspiration, Initiative, Speed, Size, and Passive Perception.',
    bullets: [
      'Proficiency Bonus with safe default derived from level when blank',
      'Inspiration as a single checkbox',
      'Initiative as a signed modifier, defaulting to the Dexterity modifier',
      'Speed in feet (default 30)',
      'Size dropdown from Tiny to Gargantuan',
      'Passive Perception defaulting to 10 + Wisdom modifier',
    ],
    image: {
      filename: 'character-sheet-secondary-stats.png',
      alt: 'Secondary stats row on the VCS character sheet with Prof Bonus, Inspiration, Initiative, Speed, Size, and Passive Perception',
      caption: 'Secondary stats — six numbers that come up every turn.',
    },
  },
  {
    id: 'weapons',
    title: 'Weapons table — real weapons only, with mastery',
    summary:
      'The weapons table has six columns built for combat: Name, Atk Bonus / DC, Damage & Type, Range, Mastery, and Notes. Weapon-table eligibility is enforced — generic concepts like "Spellcasting" cannot impersonate a weapon, and rows have to agree between their label and their mechanics.',
    bullets: [
      'Columns: Name / Atk Bonus / DC / Damage & Type / Range / Mastery / Notes',
      'Supports 2024 weapon mastery properties (Vex, Sap, Topple, etc.)',
      'At least four editable rows so the next weapon is always one click away',
      'Strict row eligibility — only real equipment, attack actions, and damaging cantrips belong here',
      'Damaging cantrips and action-economy entries live in their own sections instead of the weapon table',
    ],
    image: {
      filename: 'character-sheet-weapons.png',
      alt: 'Weapons table on the VCS character sheet with Name, Atk Bonus/DC, Damage & Type, Range, Mastery, and Notes columns',
      caption: 'Weapons table — six columns, mastery-aware, and strictly weapons.',
    },
  },
  {
    id: 'abilities-skills',
    title: 'Ability scores and skills in one 3 × 2 grid',
    summary:
      'The six ability scores are arranged as a 3 × 2 grid. Each ability block carries the score, the derived modifier, the saving throw, and the skills tied to that ability — Athletics under Strength, Acrobatics / Sleight of Hand / Stealth under Dexterity, Arcana / History / Investigation / Nature / Religion under Intelligence, and so on.',
    bullets: [
      'STR, DEX, CON, INT, WIS, CHA in a compact 3 × 2 grid',
      'Each ability shows score, modifier, saving throw, and its associated skills',
      'Skill proficiency is inferred when the bonus differs from the base ability modifier',
      'Saving throw bonuses are displayed as signed numbers (+2, -1) in one glance',
    ],
    image: {
      filename: 'character-sheet-abilities-skills.png',
      alt: 'Ability scores and skills grid on the VCS character sheet with saves and skills under each ability',
      caption: 'Ability grid — score, modifier, save, and skills in one tile.',
    },
  },
  {
    id: 'proficiencies',
    title: 'Equipment Training & Other Proficiencies',
    summary:
      'Armor training, weapon proficiencies, tool proficiencies, and languages get their own panel next to the ability grid, so the game master can answer "can I wear that?" or "do I speak this?" without leaving the page.',
    bullets: [
      'Armor Training: Light / Medium / Heavy / Shields checkboxes',
      'Weapon Proficiencies: Simple and Martial, plus a specific weapons list',
      'Tool Proficiencies with three named slots (e.g. Thieves\' Tools)',
      'Languages with three named slots (e.g. Common)',
    ],
    image: {
      filename: 'character-sheet-proficiencies.png',
      alt: 'Equipment Training and Other Proficiencies panel on the VCS character sheet with armor training, weapon, tool, and language proficiencies',
      caption: 'Proficiencies — armor, weapons, tools, and languages.',
    },
  },
  {
    id: 'action-economy',
    title: 'Action Economy — what you can actually do on your turn',
    summary:
      'The collapsible Action Economy panel shows the character\'s real options for a turn: actions, bonus actions, reactions, and legendary or mythic actions when they apply. Entries are derived from class features and equipment so the game master does not have to remember which feature granted which bonus action.',
    bullets: [
      'Actions, bonus actions, and reactions surfaced from the canonical character model',
      'Damaging cantrips appear here as attack entries with the right damage and scaling',
      'Monster characters get Legendary, Mythic, Lair, and Regional Effect entries when present',
      'Entries are editable through the same structured edit dialog as features and feats',
    ],
    image: {
      filename: 'character-sheet-action-economy.png',
      alt: 'Action Economy panel on the VCS character sheet with actions, bonus actions, and reactions',
      caption: 'Action Economy — actions, bonus actions, and reactions in one panel.',
    },
  },
  {
    id: 'artwork',
    title: 'Character portrait with asset vault',
    summary:
      'The artwork panel lets you upload a character portrait or pick one from your image library. Uploads are counted against the free asset vault cap, and Sixsmith Games Premium characters get unlimited portrait storage.',
    bullets: [
      'Upload Image for a PNG, JPG, or SVG portrait',
      'Choose Existing opens the image browser against your library',
      'Free tier shows a running "used / cap" indicator so you know when you are near the limit',
      'Premium characters bypass the cap and keep stocking their art vault',
    ],
    image: {
      filename: 'character-sheet-artwork.png',
      alt: 'Character portrait panel on the VCS character sheet with Upload Image and Choose Existing buttons and the asset vault indicator',
      caption: 'Portrait panel — upload, choose, and track your art vault.',
    },
  },
  {
    id: 'equipment',
    title: 'Equipment table — item, quantity, weight',
    summary:
      'A dedicated equipment table with Item, Quantity, and Weight columns sits below the ability grid. Carried gear belongs here; items kept at home or in a stash belong in the Storage section on the details page.',
    bullets: [
      'Three-column Item / Qty / Weight layout',
      'At least eight editable rows so your pack is always one click away',
      'Split between carried gear (this table) and stored gear (details page Storage block)',
    ],
    image: {
      filename: 'character-sheet-equipment.png',
      alt: 'Equipment table on the VCS character sheet with Item, Quantity, and Weight columns',
      caption: 'Equipment — carried gear with quantity and weight.',
    },
  },
  {
    id: 'wealth',
    title: 'Wealth & Valuables — coins and gems',
    summary:
      'Coins and other valuables get their own panel. Copper, Silver, Electrum, Gold, and Platinum each have a card, and named gems and valuables render below as a readable list.',
    bullets: [
      'Coin cards for CP, SP, EP, GP, PP',
      'Named gems and valuables list with quantity prefix ("3x Ruby")',
      'Prints as part of the summary page so the party treasurer never has to hunt for the numbers',
    ],
    image: {
      filename: 'character-sheet-wealth.png',
      alt: 'Wealth & Valuables panel on the VCS character sheet with coins and named valuables',
      caption: 'Wealth & Valuables — coin cards and a named gems list.',
    },
  },
  {
    id: 'reference',
    title: 'Reference page — features, feats, traits, and edit-in-place',
    summary:
      'Class features, features, species traits, and feats each get their own structured list on the reference page. Every entry is a name + description row with an inline ✎ edit button that opens a focused "Edit Class Feature" / "Edit Feat" dialog so you can fix a description without losing your place on the sheet.',
    bullets: [
      'Separate lists for Class Features, Features, Species Traits, and Feats',
      'Inline ✎ edit buttons open a focused name + description dialog',
      'Class Features (Notes), Species Traits (Notes), and Feats (Notes) as free-form fallbacks',
      'Action Economy mirrored here for print layouts',
    ],
    image: {
      filename: 'character-sheet-reference.png',
      alt: 'Reference page of the VCS character sheet showing class features, features, species traits, and feats',
      caption: 'Reference page — structured features with inline edit.',
    },
  },
  {
    id: 'spellbook',
    title: 'Spellbook page — casting stats, slots, and spells table',
    summary:
      'Spellcasters get a dedicated spellbook page. The Spellcasting Ability & Spell Slots block holds the casting modifier, save DC, and attack bonus on the left and a level-1-through-9 spell slot grid ("used / total") on the right. Below it, the Known & Prepared Spells table has 15 rows of full spell detail.',
    bullets: [
      'Casting Modifier, Save DC, and Attack Bonus computed from ability + proficiency when not overridden',
      'Spell slots Lvl 1 – Lvl 9 each with "used / total" inputs',
      'Known & Prepared Spells table columns: Lvl / Prep / Spell Name / Time / Range / C • R • M / Description',
      'Concentration (C), Ritual (R), and Material (M) flags inline per spell',
      '15 rows so a prepared wizard fits without scrolling',
    ],
    image: {
      filename: 'character-sheet-spellbook.png',
      alt: 'Spellbook page of the VCS character sheet with casting stats, spell slots, and the known and prepared spells table',
      caption: 'Spellbook page — casting stats, slots, and 15-row spells table.',
    },
  },
  {
    id: 'background',
    title: 'Character Background & Personality + Physical Description',
    summary:
      'The details page starts with the long-form character panels. CHARACTER BACKGROUND & PERSONALITY holds Personality Traits, Motivations, Ideals, Flaws, Backstory, and Bonds. PHYSICAL DESCRIPTION holds Appearance and Identifying Features. Everything is collapsible — expand only what you are editing.',
    bullets: [
      'CHARACTER BACKGROUND & PERSONALITY: Personality Traits, Motivations, Ideals, Flaws, Backstory, Bonds',
      'PHYSICAL DESCRIPTION: Appearance and Identifying Features',
      'Each field is a multi-line textarea sized for real prose',
      'Collapsible sections keep the page scannable during combat',
    ],
    image: {
      filename: 'character-sheet-background.png',
      alt: 'Character Background & Personality and Physical Description sections on the VCS character sheet details page',
      caption: 'Details page — background, personality, appearance, and features.',
    },
  },
  {
    id: 'relationships',
    title: 'Relationships + Political & Social Standing',
    summary:
      'RELATIONSHIPS splits into Allies & Friends, Foes & Enemies, and Family. POLITICAL & SOCIAL STANDING splits into Deeds & Titles, Political Influence, Political Knowledge, and Political Preferences. Each panel owns a focused piece of the character\'s place in the world.',
    bullets: [
      'RELATIONSHIPS: Allies & Friends, Foes & Enemies, Family — three textareas',
      'POLITICAL & SOCIAL STANDING: Deeds & Titles, Political Influence, Political Knowledge, Political Preferences',
      'Both sections are collapsible so the default view stays calm',
    ],
    image: {
      filename: 'character-sheet-relationships.png',
      alt: 'Relationships and Political & Social Standing sections on the VCS character sheet details page',
      caption: 'Relationships and political standing — each with its own panel.',
    },
  },
  {
    id: 'smartpaste',
    title: 'Smart Paste — turn a pasted sheet into a real character',
    summary:
      'Smart Paste takes a block of text from a character builder, PDF, or notes app and classifies it into the canonical character model. Ability scores go to the ability grid, compact identity goes to the identity header, weapons go to the weapons table, spells go to the spells table, and long prose goes to the details page instead of silently landing in the background field.',
    bullets: [
      'Compact-field shape validation — prose does not get written into Background, Class, Subclass, or Species',
      'Weapon-table eligibility — generic labels like "Spellcasting" cannot impersonate a weapon',
      'Row coherence — a row\'s name and its mechanics must come from the same kind of source',
      'Prose-detector reroutes paragraph-style background content into biography or a review state',
      'Requires sign-in before changes are applied',
    ],
    image: {
      filename: 'character-sheet-smartpaste.png',
      alt: 'Smart Paste modal on the VCS character sheet for importing a character from pasted text',
      caption: 'Smart Paste — paste a sheet, get a structured character.',
    },
  },
  {
    id: 'preview-print',
    title: 'Preview and Print — the same layout, read-only and on paper',
    summary:
      'Preview turns the entire sheet read-only without changing its structure — it is the exact same sheet, just with inputs locked. Print Sheet then hands that same layout to the browser print dialog, so what you see in preview is what comes out of the printer.',
    bullets: [
      '👁️ Preview locks every input and switches the sheet to presentation styling',
      '✏️ Edit flips back to input mode with all values preserved',
      '🖨️ Print Sheet runs the browser print dialog against the portrait-oriented printable layout',
      'Summary, Reference, Spellbook, and Details pages each print as their own page',
    ],
    image: {
      filename: 'character-sheet-print.png',
      alt: 'Print and preview output of the VCS character sheet with portrait-oriented printable layout',
      caption: 'Preview and print — the sheet you see is the sheet that prints.',
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
    question: 'Can I view the character sheet without an account?',
    answer:
      'The character sheet is visible on the public Virtual Combat Simulator experience. Actions that change real data — Smart Paste, Save Character, uploads, and library operations — prompt sign-in before they proceed, so the sheet is safe to explore as a visitor.',
  },
  {
    question: 'Does the character sheet support multiclass characters?',
    answer:
      'Yes. Multiclass characters such as Rogue 3 / Wizard 10 are treated as first-class citizens. Mixed hit dice expressions like "3d8 + 10d6 + 26" display correctly, and class features, feats, and spell slots come from the canonical character model instead of a single-class assumption.',
  },
  {
    question: 'What does Smart Paste do, exactly?',
    answer:
      'Smart Paste takes a block of text and classifies it into the canonical character model. Ability scores go to the ability grid, compact identity goes to the identity header, weapons go to the weapons table, spells go to the spells table, and long prose goes to the details page instead of landing in the background field. Smart Paste is strict on purpose — the weapon table and the identity fields reject content that does not match their shape.',
  },
  {
    question: 'Why are there multiple pages on the character sheet?',
    answer:
      'Each page owns a different kind of information. The summary page is for the numbers the GM needs every turn. The reference page is for features, feats, and traits. The spellbook page is for casters. The details page is for long-form prose like backstory, appearance, relationships, and political standing. Splitting them keeps the summary page fast to scan and gives the prose its own home.',
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
}: {
  filename: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
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
          <div style={{ maxWidth: '880px' }}>
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
            <p style={{ fontSize: '1.14rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.92)', margin: '0 0 1rem' }}>
              Build your adventurer in one place — identity, combat stats, weapons, ability scores, skills, spells, equipment, wealth, features, and long-form character details — then print or hand it to your token on the battle map.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.86)', margin: '0 0 1.5rem' }}>
              The character sheet is the source of truth for Virtual Combat Simulator. The battle room reads and writes the same canonical character model, so HP, conditions, and initiative stay in sync between the sheet and the token without anyone copying numbers across tabs. Smart Paste turns a pasted character from a PDF or builder into structured data, and Preview plus Print Sheet produce the printable layout directly from your browser.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
              <LaunchAppButton
                appSlug={product.slug}
                style={{
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
                }}
              >
                Open the character sheet
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
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: `3rem ${pageGutter} 5rem` }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>
            The whole sheet, in one glance
          </h2>
          <p style={{ margin: '0 0 1.25rem', color: '#334155', lineHeight: 1.85, fontSize: '1rem' }}>
            The sheet opens with a top toolbar (Roster, Dashboard, Print Sheet, Smart Paste, Preview, Save Character) and the summary page — identity, Armor Class, Hit Points with hit dice and death saves, the secondary stats row, and the weapons table. Everything else lives on its own page of the same sheet.
          </p>
          <Figure
            filename="character-sheet-overview.png"
            alt="Full overview of the Virtual Combat Simulator D&D character sheet editor with identity header, combat stats, and weapons table"
            caption="The Virtual Combat Simulator character sheet editor."
            priority
          />
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem' }}>
            How the sheet is laid out
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
                <h3
                  style={{
                    margin: '0 0 0.5rem',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: '#0f172a',
                  }}
                >
                  {page.title}
                </h3>
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {page.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {sheetFeatures.map((feature, index) => {
          const imageFirst = index % 2 === 0;
          const textBlock = (
            <div key={`${feature.id}-text`}>
              <h2
                style={{
                  fontSize: '1.7rem',
                  fontWeight: 900,
                  color: '#0f172a',
                  margin: '0 0 0.85rem',
                  lineHeight: 1.2,
                }}
              >
                {feature.title}
              </h2>
              <p
                style={{
                  margin: '0 0 1rem',
                  color: '#334155',
                  lineHeight: 1.85,
                  fontSize: '1rem',
                }}
              >
                {feature.summary}
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
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          );
          const imageBlock = (
            <div key={`${feature.id}-image`}>
              <Figure filename={feature.image.filename} alt={feature.image.alt} caption={feature.image.caption} />
            </div>
          );
          return (
            <section
              key={feature.id}
              id={feature.id}
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
            Open a character and try it
          </h2>
          <p style={{ margin: '0 0 1.25rem', color: '#475569', lineHeight: 1.8 }}>
            The character sheet is available directly in the Virtual Combat Simulator app. Open one to see every section live, or head back to the product page for the rest of the combat management tooling.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <LaunchAppButton
              appSlug={product.slug}
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
              Launch Virtual Combat Simulator
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
