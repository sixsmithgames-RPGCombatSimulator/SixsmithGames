import type { ProductDefinition } from '@/lib/productContent';
import { APP_URLS } from '@/lib/subscription';

/**
 * Public VCS product story.
 *
 * SmartPaste is described as a reviewed intake workflow, not a promise of
 * perfect parsing or permission to copy protected material. This keeps the
 * strongest customer benefit aligned with the product's provenance controls.
 */
export const virtualCombatSimulatorProductDefinition: ProductDefinition = {
  slug: 'virtual-combat-simulator',
  name: 'Virtual Combat Simulator',
  descriptor: 'D&D combat simulator and battle map control room',
  h1: 'Paste the character. Review the sheet. Run the fight.',
  title: 'Virtual Combat Simulator | SmartPaste Character Import and D&D Combat Tracker',
  metaDescription:
    'Use SmartPaste to review character text, then run D&D-style encounters with the same character sheet, battle map, tokens, initiative, hit points, and conditions.',
  heroEyebrow: 'Tabletop RPG Combat Management',
  heroValue:
    'Bring in permitted character text with SmartPaste, review what VCS recognized, then run the fight with the sheet, map, tokens, initiative, HP, conditions, and action flow in one browser tab.',
  heroSummary:
    'Virtual Combat Simulator is for game masters and players who want D&D-style combat to run cleanly. SmartPaste sorts the abilities, weapons, spells, features, equipment, and notes it recognizes into a reviewable character sheet. Once you approve the result, that character is ready for the same focused room as the battle map, turn order, hit points, and conditions.',
  oneSentence:
    'Virtual Combat Simulator is a browser-based combat management tool for tabletop roleplaying games.',
  category: 'D&D combat tracker with battle map and initiative management',
  primaryAudience: 'Game masters and tabletop RPG players, especially D&D-adjacent groups',
  platform: 'Browser-based web app',
  pricingModel: 'Free to start. The founding Game Master price is $9.99/month while the early-GM offer is open; the planned standard price is $19.99/month',
  availability: 'Open in your browser and run combats right away. The paid upgrade is there when you need it, not before',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web browser',
  offerPrice: 9.99,
  officialPath: '/apps/virtual-combat-simulator',
  pricingPath: '/pricing#virtual-combat-simulator',
  helpPath: '/help/virtual-combat-simulator',
  supportPath: '/support',
  appUrl: APP_URLS['virtual-combat-simulator'],
  relatedProducts: [],
  supportingArticleSlugs: [
    'what-is-virtual-combat-simulator',
    'how-to-run-faster-dnd-combats-online',
    'combat-simulator-vs-full-vtt',
  ],
  theme: {
    gradient: 'linear-gradient(135deg, #2a1c14 0%, #4a2e1f 55%, #6f4b2a 100%)',
    accent: '#8f6a3a',
    tint: '#f4ead8',
    dark: '#241811',
    lightBorder: '#d3b27a',
  },
  primaryCta: {
    kind: 'launch',
    label: 'Open a combat room',
    appSlug: 'virtual-combat-simulator',
  },
  secondaryCta: {
    kind: 'link',
    label: 'Tour the character sheet',
    href: '/apps/virtual-combat-simulator/character-sheet',
  },
  primaryDeepLinkPath: '/battleroom',
  heroMedia: {
    src: 'https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto,w_1400/sixsmith-games/vcs/virtual-combat-simulator-dnd-battle-room-map-tokens-initiative-character-sheet.jpg',
    alt: 'Virtual Combat Simulator D&D battle room showing a tactical battle map with grid and tokens, initiative tracker, action panel, fog controls, and character sheet context',
    overlayLabel: 'Open the battle room',
    deepLinkPath: '/battleroom',
    caption:
      'The battle room brings the tactical parts of D&D combat into one view: map, tokens, initiative, actions, hit points, character context, fog, and player-safe visibility.',
  },
  whatItIs: [
    'Virtual Combat Simulator is a focused combat simulator for tabletop RPG encounters. It is built around the part of play that often slows a session down: battle maps, tokens, initiative, hit points, conditions, and the moment-to-moment flow of combat.',
    'Virtual Combat Simulator is not an all-purpose campaign manager or a giant everything-in-one virtual tabletop. It is built to keep combat clear, synchronized, and easy to run for a game master who wants tactical clarity without burying the table under extra interface weight.',
    'SmartPaste is the front door for character data. Paste text you created, own, licensed, or are otherwise permitted to use; review recognized and uncertain choices; then apply the approved result to the character sheet used beside the battle map.',
  ],
  whoItIsFor: [
    'Virtual Combat Simulator is for game masters who want a cleaner way to run tactical combats without bouncing between battle maps, initiative trackers, notes, and character references.',
    'Virtual Combat Simulator is for tabletop RPG groups that play online or in hybrid setups and need shared positioning, clear turn order, token control, and combat state in one place.',
    'Virtual Combat Simulator is for encounter-heavy campaigns where D&D combat management, battle-map visibility, and fast initiative handling matter more than sprawling world or campaign administration.',
  ],
  problemItSolvesHeading: 'Why combat slows down',
  problemItSolves: [
    'Combat loses energy when the game master has to juggle too many disconnected tools. Players wait while someone checks initiative, finds the right token, updates hit points, or explains who can act next. That friction is exactly what Virtual Combat Simulator is built to reduce.',
    'Virtual Combat Simulator also solves the visibility problem that shows up in hybrid or online play. When the battle map, tokens, and combat state live in different places, players stop reading the situation clearly. A single encounter view keeps the fight readable and helps everyone stay engaged.',
  ],
  howItWorks: [
    'Paste permitted character text into SmartPaste, review the abilities, weapons, spells, features, equipment, and longer notes it recognizes, and approve only what belongs on the sheet.',
    'Set up or load the encounter map, place the approved character on a token, and establish the battle space the table will use.',
    'Track initiative, turn order, action flow, hit points, conditions, and other combat state from the same encounter view.',
    'Keep players synced to the same battle state so everyone can follow movement, token positions, and the current turn without extra bookkeeping.',
    'Use the product as the combat layer of the session while the game master keeps the narrative, rulings, and pacing in motion.',
  ],
  keyFeatures: [
    {
      title: 'SmartPaste character import',
      description:
        'Paste character text you are permitted to use, review what VCS recognized or inferred, and apply the approved details to a character sheet instead of retyping the whole thing.',
    },
    {
      title: 'Battle map encounter control',
      description:
        'Upload or prepare the battle map, place tokens, and keep the physical or virtual battlefield readable at a glance.',
    },
    {
      title: 'Initiative and encounter flow',
      description:
        'Track initiative, turn order, and combat state without separate spreadsheets or side tools pulling attention away from the table.',
    },
    {
      title: 'Token-linked hit points and conditions',
      description:
        'Keep token placement, hit points, and condition tracking tied to the same encounter view so the game master can act quickly.',
    },
    {
      title: 'Shared table state',
      description:
        'Support online and hybrid play by giving players a shared combat view instead of a fragmented chain of screenshots and verbal corrections.',
    },
    {
      title: 'Game Master upgrade path',
      description:
        'Start with the core encounter tools, then move into the paid Game Master tier when you need more storage and expanded capability.',
    },
  ],
  pricingAndAccess: [
    'Virtual Combat Simulator is free to start. Signed-in users get the core combat management tool, and the current founding Game Master price of $9.99 per month adds more storage and additional GM-oriented capability for groups that run encounters often. The planned standard price is $19.99 per month; that is a future price, not a former price.',
    'Try the core tool first, then decide whether the paid layer matches how often you run encounters.',
  ],
  faq: [
    {
      question: 'What is Virtual Combat Simulator?',
      answer:
        'Virtual Combat Simulator is a browser-based combat simulator for tabletop RPG encounters. Virtual Combat Simulator keeps battle maps, tokens, initiative, hit points, and encounter flow together so a game master can run combat with less bookkeeping.',
    },
    {
      question: 'What does SmartPaste do?',
      answer:
        'SmartPaste takes character text you created, own, licensed, or are otherwise permitted to use and sorts the details it recognizes into the VCS character sheet. It labels source and certainty and asks you to review the result before applying it. Built-in rules text is limited to SRD-backed material.',
    },
    {
      question: 'Is Virtual Combat Simulator a VTT?',
      answer:
        'Virtual Combat Simulator overlaps with part of the VTT space, but the focus is narrower. Virtual Combat Simulator is best understood as a combat simulator and encounter view, not as a full campaign-management VTT that tries to cover every part of tabletop play.',
    },
    {
      question: 'Who is Virtual Combat Simulator for?',
      answer:
        'Virtual Combat Simulator is for game masters and tabletop RPG groups, especially D&D-adjacent tables that care about battle maps, initiative, tokens, and encounter flow.',
    },
    {
      question: 'Can players use Virtual Combat Simulator too?',
      answer:
        'Yes. The product supports shared table state, so players can follow the same encounter view while the game master runs the fight. The GM has the controls, but the encounter view keeps the whole table aligned.',
    },
    {
      question: 'Does Virtual Combat Simulator work for online and hybrid games?',
      answer:
        'Yes. Virtual Combat Simulator is especially useful when a group is online or split between in-person and remote play, because maps, tokens, initiative, and combat state all stay visible in one browser-based tool.',
    },
    {
      question: 'How does pricing work for Virtual Combat Simulator?',
      answer:
        'Virtual Combat Simulator is free to start, with an optional Game Master subscription at the current founding price of $9.99 per month. The free path covers the core encounter use case, while the paid tier is the upgrade for more storage and expanded GM capability. The planned standard price is $19.99 per month.',
    },
  ],
  gettingStarted: [
    'Open the character sheet and use SmartPaste with text you created, own, licensed, or are otherwise permitted to use.',
    'Review what VCS recognized, correct uncertain choices, and apply only the character details you approve.',
    'Prepare a battle map and place the approved character and other tokens you need for the session.',
    'Use initiative, turn order, hit points, and conditions from the same combat view so the table can follow the fight without side tools.',
    'If it becomes part of your regular game master workflow, check the pricing page for the Game Master upgrade.',
  ],
  commonUseCases: [
    'Bringing a character into the battle room without retyping every ability, weapon, spell, feature, item, and longer note by hand.',
    'Running faster D&D combats online when the group needs maps, tokens, initiative, and hit points in one place.',
    'Managing hybrid combats where some players are remote and everyone needs the same encounter view.',
    'Handling boss fights or set-piece encounters where conditions, movement, and turn order can become hard to track verbally.',
    'Keeping combat clear in rules-heavy sessions while leaving story, rulings, and narrative pacing to the game master.',
  ],
  scopeNotes: [
    'Virtual Combat Simulator is a combat management tool, not a general campaign wiki or universal gaming platform.',
    'Virtual Combat Simulator focuses on battle maps, tokens, initiative, encounter flow, and related combat state. It is not meant to replace every tabletop tool a group might use.',
    'Virtual Combat Simulator is intentionally D&D-adjacent and tabletop RPG-specific because that is who the product is built for.',
    'SmartPaste organizes user-permitted text and SRD-backed material for review. It does not grant rights to protected source text and does not promise a perfect import from every format.',
  ],
  featureDeepDives: [
    {
      title: 'Character sheet',
      description:
        'See how SmartPaste turns permitted character text into a reviewable VCS sheet, then tour the ability scores, combat stats, spells, actions, features, equipment, biography, and battle-room token link.',
      href: '/apps/virtual-combat-simulator/character-sheet',
      linkLabel: 'Tour the character sheet',
    },
  ],
};
