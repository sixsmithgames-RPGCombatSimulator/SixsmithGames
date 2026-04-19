import type { ProductDefinition } from '@/lib/productContent';
import { APP_URLS } from '@/lib/subscription';

export const gravityProductDefinition: ProductDefinition = {
  slug: 'gravity',
  name: 'Gravity',
  descriptor: 'Early beta simultaneous-turn strategy game with ship systems pressure',
  h1: 'Gravity early beta for simultaneous-turn strategy and ship systems command',
  title: 'Gravity | Early Beta Simultaneous-Turn Strategy Game with Ship Systems Command',
  metaDescription:
    'Gravity is an early beta simultaneous-turn strategy game where captains route power, assign crew actions, and resolve tactical turns at once.',
  heroEyebrow: 'Early Beta Strategy and Board-Game Style Tactics',
  heroValue:
    'Plan orders in parallel, route power across a damaged ship, and survive a turn where every captain commits before the board resolves.',
  heroSummary:
    'Gravity is an early beta browser-based simultaneous-turn strategy game for players who want clear systems, locked orders, and ship-level tactical tradeoffs.',
  oneSentence:
    'Gravity is an early beta browser-based simultaneous-turn strategy game built around ship systems management and locked tactical orders.',
  category: 'Simultaneous-turn strategy game with ship systems management',
  primaryAudience: 'Strategy and board-game players who like deterministic system pressure',
  platform: 'Browser-based web game',
  pricingModel: 'Early beta with no public signup or public paid plan yet',
  availability: 'Public marketing page only for most visitors; browser access is currently limited to hardwired dummy paid test accounts',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web browser',
  officialPath: '/apps/gravity',
  pricingPath: '/pricing#gravity',
  helpPath: '/help/gravity',
  supportPath: '/support',
  appUrl: APP_URLS.gravity,
  relatedProducts: ['fourstargeneral'],
  supportingArticleSlugs: [],
  theme: {
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #14b8a6 100%)',
    accent: '#0ea5e9',
    tint: '#eff6ff',
    dark: '#082f49',
    lightBorder: '#93c5fd',
  },
  primaryCta: {
    kind: 'launch',
    label: 'Coming Soon',
    appSlug: 'gravity',
  },
  secondaryCta: {
    kind: 'link',
    label: 'See product access notes',
    href: '/pricing#gravity',
  },
  whatItIs: [
    'Gravity is an early beta simultaneous-turn strategy game where captains commit orders in parallel and the turn resolves once those orders are locked. Gravity is built for players who like tactical systems that can be read, planned, and argued about clearly rather than for players who want twitch action or vague spectacle.',
    'The central idea is ship systems pressure. Power routing, damage control, crew roles, repairs, maneuvering, attacks, environmental hazards, and escape timing all compete inside the same decision window. That makes Gravity feel closer to a strategy or board-game rules engine than to a cinematic action game.',
    'Gravity also stands out because the digital client is described as mirroring the tabletop rules. That means the visible marketing language should emphasize system clarity, turn structure, and ship-level tradeoffs instead of abstract brand language. Because Gravity is still early beta, the public site should set expectations clearly: read the marketing page now, but do not expect broad public access yet.',
  ],
  whoItIsFor: [
    'Gravity is for strategy and board-game players who enjoy simultaneous planning, shared resolution, and visible tactical tradeoffs.',
    'Gravity is for players who like managing systems pressure across a ship or tactical board state instead of relying on reflexes.',
    'Gravity is for solo and multiplayer players who want a rules-forward strategy experience with clear order locking and resolution timing.',
  ],
  problemItSolves: [
    'Sequential-turn strategy can flatten tension because each player reacts to a fully resolved board. Gravity solves that by making captains commit in parallel. The pressure comes from planning against uncertainty and then watching the turn answer back once everyone locks orders.',
    'The game also solves the "strategy without systems" problem. Gravity gives the player concrete ship-level decisions about power, crew, repairs, maneuver, attacks, hazards, and escape timing so each turn has a meaningful resource tradeoff.',
  ],
  howItWorks: [
    'Plan actions for your captain, crew, and ship systems while thinking about the same locked resolution window as every other player.',
    'Route power, repair damage, maneuver, scan, acquire, attack, launch, retaliate, and handle other actions before the turn resolves.',
    'Resolve the turn simultaneously so the consequences of every order appear together under the same transparent rules.',
    'Adapt to hazards, object movement, and escape pressure as the tactical state changes from one locked turn to the next.',
  ],
  keyFeatures: [
    {
      title: 'Simultaneous-turn resolution',
      description:
        'Gravity resolves tactical turns after orders lock, so the game pressure comes from commitment and timing instead of initiative drift.',
    },
    {
      title: 'Ship systems management',
      description:
        'Power routing, conduits, shields, life support, repairs, and overload risk make the ship feel like a real tactical system.',
    },
    {
      title: 'Crew roles and captain differences',
      description:
        'Captains, officers, crew, and specialists change how you recover, maneuver, repair, revive, scan, and attack.',
    },
    {
      title: 'Tabletop rules parity',
      description:
        'The digital client mirrors the tabletop rules so outcomes stay clear, consistent, and explainable.',
    },
    {
      title: 'Environmental and orbital pressure',
      description:
        'Hazards, object movement, and escape timing keep the board from becoming a passive stand-and-trade exercise.',
    },
    {
      title: 'Solo and multiplayer modes',
      description:
        'Single-player supports immediate iteration, while multiplayer keeps the simultaneous-planning tension intact.',
    },
  ],
  pricingAndAccess: [
    'Gravity does not currently have a public paid tier listed on the pricing page. Gravity should be described honestly as an early beta product with public marketing pages but without general public access.',
    'For now, the browser build is limited to the hardwired dummy paid test accounts used for internal validation. Real paid accounts and other visitors should get the marketing page and a clear coming-soon state instead of a live launch path.',
  ],
  faq: [
    {
      question: 'What is Gravity?',
      answer:
        'Gravity is an early beta simultaneous-turn strategy game. Gravity asks captains to route power, assign crew actions, lock tactical orders, and then watch the turn resolve under the same visible rules for every ship.',
    },
    {
      question: 'Who is Gravity for?',
      answer:
        'Gravity is for strategy and board-game players who enjoy simultaneous planning, ship systems management, and rules-forward tactical pressure. Gravity should not be described with vague generic gaming language because the actual audience is more specific than that.',
    },
    {
      question: 'How do simultaneous turns work in Gravity?',
      answer:
        'In Gravity, players plan in parallel and the turn resolves once orders are locked. That means the tension comes from commitment and timing rather than from a long sequential initiative ladder.',
    },
    {
      question: 'Is Gravity single-player or multiplayer?',
      answer:
        'Gravity supports both. The product docs describe instant solo resolution for fast iteration and multiplayer resolution once all captains lock their orders.',
    },
    {
      question: 'Is Gravity based on tabletop rules?',
      answer:
        'Yes. The public Gravity docs describe the digital client as mirroring the current tabletop rules. That parity is part of the product identity because it tells players the digital rules engine is meant to stay transparent and consistent.',
    },
    {
      question: 'How does pricing work for Gravity?',
      answer:
        'The current public pricing page does not list a separate paid plan for Gravity. The safest public statement is that Gravity is in early beta, has a public marketing page, and is not yet open broadly beyond the hardwired dummy paid test accounts.',
    },
  ],
  gettingStarted: [
    'Start from the product page so the simultaneous-turn model, ship systems focus, and early beta status are clear before expecting access.',
    'Use the public page to understand how orders are planned, locked, and resolved in a shared turn window.',
    'Pay attention to power routing, repairs, maneuvering, crew roles, and hazards because those systems create the real tactical pressure.',
    'Review the pricing page for the current access note, since Gravity is not broadly open yet.',
  ],
  commonUseCases: [
    'Playing a rules-forward strategy game where simultaneous planning is the core source of tension.',
    'Testing solo tactical loops quickly because single-player turns resolve immediately.',
    'Using a browser-based strategy game that feels closer to a board-game rules engine than to a reflex game.',
    'Exploring ship systems management, power routing, and environmental pressure inside a shared tactical turn.',
  ],
  scopeNotes: [
    'Gravity should be described concretely as an early beta simultaneous-turn strategy game with ship systems management, not as abstract brand language.',
    'The public product framing depends on rules clarity, tabletop parity, and tactical tradeoffs, so those points should stay visible.',
    'The public access model for Gravity is currently limited to an early beta note rather than a public signup or standalone listed paid plan, and the page should say that plainly.',
  ],
};
