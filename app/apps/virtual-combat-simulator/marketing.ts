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
    'Run faster encounters with one browser-based space for battle maps, tokens, initiative, hit points, and encounter flow.',
  heroSummary:
    'Virtual Combat Simulator is a browser-based combat management tool for tabletop roleplaying games, with a strong focus on D&D-adjacent encounter play.',
  oneSentence:
    'Virtual Combat Simulator is a browser-based combat management tool for tabletop roleplaying games.',
  category: 'D&D combat simulator and battle map tool',
  primaryAudience: 'Game masters and tabletop RPG players, especially D&D-adjacent groups',
  platform: 'Browser-based web app',
  pricingModel: 'Free core access plus a $9.99/month Game Master subscription',
  availability: 'Public marketing page plus a free-to-start browser app with an optional paid upgrade',
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
    label: 'Play now',
    appSlug: 'virtual-combat-simulator',
  },
  secondaryCta: {
    kind: 'link',
    label: 'See pricing',
    href: '/pricing#virtual-combat-simulator',
  },
  whatItIs: [
    'Virtual Combat Simulator is a focused combat simulator for tabletop RPG encounters. It is built around the part of play that often slows a session down: battle maps, tokens, initiative, hit points, conditions, and the moment-to-moment flow of combat.',
    'Virtual Combat Simulator is not positioned as an all-purpose campaign manager or a giant everything-in-one virtual tabletop. The product is designed to keep combat clear, synchronized, and easy to run for a game master who wants tactical clarity without burying the table under extra interface weight.',
    'The current public messaging and feature set center on D&D-style encounter management. The language on the site should stay true to that tabletop RPG audience instead of drifting into generic gaming-platform claims.',
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
      title: 'Map-first encounter control',
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
    'Virtual Combat Simulator is positioned as a free-to-start combat management tool. The public pricing page describes a free core path for signed-in users and a paid Game Master plan at $9.99 per month for groups that want more storage and additional GM-oriented capability.',
    'That model keeps the entry point focused: a group can understand what the product is, try the combat workflow, and then decide whether the paid layer matches how often they run encounters.',
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
        'Virtual Combat Simulator overlaps with part of the VTT space, but the positioning is narrower. Virtual Combat Simulator is best understood as a combat simulator and encounter control room, not as a full campaign-management VTT that tries to cover every part of tabletop play.',
    },
    {
      question: 'Who is Virtual Combat Simulator for?',
      answer:
        'Virtual Combat Simulator is for game masters and tabletop RPG groups, especially D&D-adjacent tables that care about battle maps, initiative, tokens, and encounter flow. The copy should stay focused on that audience rather than broadening into generic gaming language.',
    },
    {
      question: 'Can players use Virtual Combat Simulator too?',
      answer:
        'Yes. The product supports shared table state, so players can follow the same encounter view while the game master runs the fight. The site positions the product around the game master workflow, but the encounter view is meant to keep the whole table aligned.',
    },
    {
      question: 'Does Virtual Combat Simulator work for online and hybrid games?',
      answer:
        'Yes. Virtual Combat Simulator is especially useful when a group is online or split between in-person and remote play, because maps, tokens, initiative, and combat state all stay visible in one browser-based tool.',
    },
    {
      question: 'How does pricing work for Virtual Combat Simulator?',
      answer:
        'The current public pricing model presents Virtual Combat Simulator as free to start, with an optional $9.99 per month Game Master subscription. The free path covers the core encounter use case, while the paid tier is positioned as the upgrade for more storage and expanded GM capability.',
    },
  ],
  gettingStarted: [
    'Open the official Virtual Combat Simulator landing page to confirm the product fits D&D-style encounter management rather than broader campaign tooling.',
    'Launch the browser app, prepare a battle map, and place the tokens or encounter state you need for the session.',
    'Use initiative, turn order, hit points, and conditions from the same combat view so the table can follow the fight without side tools.',
    'If the product becomes part of your regular game master workflow, review the pricing page for the Game Master upgrade path.',
  ],
  commonUseCases: [
    'Running faster D&D combats online when the group needs maps, tokens, initiative, and hit points in one place.',
    'Managing hybrid combats where some players are remote and everyone needs the same encounter view.',
    'Handling boss fights or set-piece encounters where conditions, movement, and turn order can become hard to track verbally.',
    'Keeping combat clear in rules-heavy sessions while leaving story, rulings, and narrative pacing to the game master.',
  ],
  scopeNotes: [
    'Virtual Combat Simulator is marketed around combat management, not as a general campaign wiki or universal gaming platform.',
    'Virtual Combat Simulator focuses on battle maps, tokens, initiative, encounter flow, and related combat state. The site should not imply that the product replaces every tabletop tool a group might use.',
    'The public copy is intentionally D&D-adjacent and tabletop RPG-specific because that is the actual audience fit described in the product messaging and docs.',
  ],
};
