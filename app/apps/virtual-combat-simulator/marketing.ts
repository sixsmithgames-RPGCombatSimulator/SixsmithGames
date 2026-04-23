import type { ProductDefinition } from '@/lib/productContent';
import { APP_URLS } from '@/lib/subscription';

export const virtualCombatSimulatorProductDefinition: ProductDefinition = {
  slug: 'virtual-combat-simulator',
  name: 'Virtual Combat Simulator',
  descriptor: 'D&D combat simulator and battle map control room',
  h1: 'Virtual Combat Simulator for D&D combat management',
  title: 'Virtual Combat Simulator | D&D Combat Simulator and Battle Map Tool',
  metaDescription:
    'Virtual Combat Simulator keeps battle maps, tokens, initiative, and encounter flow together for game masters and tabletop RPG groups.',
  heroEyebrow: 'Tabletop RPG Combat Management',
  heroValue:
    'Build your D&D character, then run the fight in one tab — a full character sheet editor, battle maps, tokens, initiative, HP, and conditions where you actually need them.',
  heroSummary:
    'Virtual Combat Simulator is for game masters and players who want combat to run cleanly. Build your character with the editor pictured here, hand them to a token on the battle map, and keep the whole group synchronized without flipping between a character builder, a map app, a dice app, and a scratch-paper initiative tracker.',
  oneSentence:
    'Virtual Combat Simulator is a browser-based combat management tool for tabletop roleplaying games.',
  category: 'D&D combat simulator and battle map tool',
  primaryAudience: 'Game masters and tabletop RPG players, especially D&D-adjacent groups',
  platform: 'Browser-based web app',
  pricingModel: 'Free to start. Upgrade to the Game Master plan at $9.99/month for more storage and expanded GM features',
  availability: 'Open in your browser and run combats right away. The paid upgrade is there when you need it, not before',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web browser',
  offerPrice: 9.99,
  officialPath: '/apps/virtual-combat-simulator',
  pricingPath: '/pricing#virtual-combat-simulator',
  helpPath: '/help/virtual-combat-simulator',
  supportPath: '/support',
  appUrl: APP_URLS['virtual-combat-simulator'],
  relatedProducts: ['contentcraft'],
  supportingArticleSlugs: [
    'what-is-virtual-combat-simulator',
    'how-to-run-faster-dnd-combats-online',
    'combat-simulator-vs-full-vtt',
  ],
  theme: {
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #06b6d4 100%)',
    accent: '#2563eb',
    tint: '#eff6ff',
    dark: '#0f172a',
    lightBorder: '#bfdbfe',
  },
  primaryCta: {
    kind: 'launch',
    label: 'Build your character — it’s free',
    appSlug: 'virtual-combat-simulator',
  },
  secondaryCta: {
    kind: 'link',
    label: 'Tour the character sheet',
    href: '/apps/virtual-combat-simulator/character-sheet',
  },
  primaryDeepLinkPath: '/character/edit/new',
  heroMedia: {
    src: 'https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto,w_1600/sixsmith-games/vcs/character-sheet-overview.png',
    alt: 'Virtual Combat Simulator D&D character sheet editor with identity, combat stats, and weapons table',
    overlayLabel: 'Open the character sheet editor',
    deepLinkPath: '/character/edit/new',
    caption:
      'The D&D Character Sheet Editor — click anywhere on the sheet to start building your adventurer. Not signed in yet? You will get a quick sign-in, then land right back on a blank character sheet.',
  },
  whatItIs: [
    'Virtual Combat Simulator is a focused combat simulator for tabletop RPG encounters. It is built around the part of play that often slows a session down: battle maps, tokens, initiative, hit points, conditions, and the moment-to-moment flow of combat.',
    'Virtual Combat Simulator is not an all-purpose campaign manager or a giant everything-in-one virtual tabletop. It is built to keep combat clear, synchronized, and easy to run for a game master who wants tactical clarity without burying the table under extra interface weight.',
    'Virtual Combat Simulator is built around D&D-style encounter management. That is the tabletop RPG audience it speaks to, and that is what the rest of this page focuses on.',
  ],
  whoItIsFor: [
    'Virtual Combat Simulator is for game masters who want a cleaner way to run tactical combats without bouncing between battle maps, initiative trackers, notes, and character references.',
    'Virtual Combat Simulator is for tabletop RPG groups that play online or in hybrid setups and need shared positioning, clear turn order, token control, and combat state in one place.',
    'Virtual Combat Simulator is for encounter-heavy campaigns where D&D combat management, battle-map visibility, and fast initiative handling matter more than sprawling world or campaign administration.',
  ],
  problemItSolves: [
    'Combat loses energy when the game master has to juggle too many disconnected tools. Players wait while someone checks initiative, finds the right token, updates hit points, or explains who can act next. That friction is exactly the problem Virtual Combat Simulator is meant to reduce.',
    'Virtual Combat Simulator also solves the visibility problem that shows up in hybrid or online play. When the battle map, tokens, and combat state live in different places, players stop reading the situation clearly. A single encounter view keeps the fight readable and helps the group stay engaged.',
  ],
  howItWorks: [
    'Set up or load the encounter map, place tokens, and establish the battle space the table will use.',
    'Track initiative, turn order, action flow, hit points, conditions, and other combat state from the same encounter control room.',
    'Keep players synced to the same battle state so everyone can follow movement, token positions, and the current turn without extra bookkeeping.',
    'Use the product as the combat layer of the session while the game master keeps the narrative, rulings, and pacing in motion.',
  ],
  keyFeatures: [
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
      title: 'Import-ready sheets and data',
      description:
        'Use import flows and visible stats so character and monster information is close to the encounter instead of hidden in another system.',
    },
    {
      title: 'Game Master upgrade path',
      description:
        'Start with the core encounter tools, then move into the paid Game Master tier when you need more storage and expanded capability.',
    },
  ],
  pricingAndAccess: [
    'Virtual Combat Simulator is free to start. Signed-in users get the core combat management tool, and a paid Game Master plan at $9.99 per month adds more storage and additional GM-oriented capability for groups that run encounters often.',
    'Try the core tool first, then decide whether the paid layer matches how often you run encounters.',
  ],
  faq: [
    {
      question: 'What is Virtual Combat Simulator?',
      answer:
        'Virtual Combat Simulator is a browser-based combat simulator for tabletop RPG encounters. Virtual Combat Simulator keeps battle maps, tokens, initiative, hit points, and encounter flow together so a game master can run combat with less bookkeeping.',
    },
    {
      question: 'Is Virtual Combat Simulator a VTT?',
      answer:
        'Virtual Combat Simulator overlaps with part of the VTT space, but the focus is narrower. Virtual Combat Simulator is best understood as a combat simulator and encounter control room, not as a full campaign-management VTT that tries to cover every part of tabletop play.',
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
        'Virtual Combat Simulator is free to start, with an optional $9.99 per month Game Master subscription. The free path covers the core encounter use case, while the paid tier is the upgrade for more storage and expanded GM capability.',
    },
  ],
  gettingStarted: [
    'Open the Virtual Combat Simulator page to confirm it fits D&D-style encounter management rather than broader campaign tooling.',
    'Launch the browser app, prepare a battle map, and place the tokens or encounter state you need for the session.',
    'Use initiative, turn order, hit points, and conditions from the same combat view so the table can follow the fight without side tools.',
    'If it becomes part of your regular game master workflow, check the pricing page for the Game Master upgrade.',
  ],
  commonUseCases: [
    'Running faster D&D combats online when the group needs maps, tokens, initiative, and hit points in one place.',
    'Managing hybrid combats where some players are remote and everyone needs the same encounter view.',
    'Handling boss fights or set-piece encounters where conditions, movement, and turn order can become hard to track verbally.',
    'Keeping combat clear in rules-heavy sessions while leaving story, rulings, and narrative pacing to the game master.',
  ],
  scopeNotes: [
    'Virtual Combat Simulator is a combat management tool, not a general campaign wiki or universal gaming platform.',
    'Virtual Combat Simulator focuses on battle maps, tokens, initiative, encounter flow, and related combat state. It is not meant to replace every tabletop tool a group might use.',
    'Virtual Combat Simulator is intentionally D&D-adjacent and tabletop RPG-specific because that is who the product is built for.',
  ],
  featureDeepDives: [
    {
      title: 'Character sheet',
      description:
        'A full tour of the Virtual Combat Simulator character sheet — ability scores, combat stats, spells, actions, features, equipment, biography, SmartPaste import, and the link to tokens in the battle room.',
      href: '/apps/virtual-combat-simulator/character-sheet',
      linkLabel: 'Tour the character sheet',
    },
  ],
};
