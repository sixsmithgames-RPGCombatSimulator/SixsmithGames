import type { ProductDefinition } from '@/lib/productContent';
import { APP_URLS } from '@/lib/subscription';

export const fourStarGeneralProductDefinition: ProductDefinition = {
  slug: 'fourstargeneral',
  name: 'Four Star General',
  descriptor: 'WWII tactical strategy game with deterministic tactics',
  h1: 'Four Star General for serious WWII tactical strategy',
  title: 'Four Star General | WWII Tactical Strategy Game with Deterministic Tactics',
  metaDescription:
    'Four Star General is a WWII tactical strategy game focused on supply, reserves, battlefield pressure, and deterministic command decisions.',
  heroEyebrow: 'WWII Tactical Strategy',
  heroValue:
    'Make deliberate command decisions about deployment, reserves, supply, and mission pressure in a browser-based WWII tactical strategy game.',
  heroSummary:
    'Four Star General is a browser-based WWII tactical strategy game built around deterministic resolution, battlefield pressure, and mission-driven command decisions.',
  oneSentence:
    'Four Star General is a browser-based WWII tactical strategy game with deterministic battlefield resolution.',
  category: 'WWII tactical strategy game',
  primaryAudience: 'Players of serious WWII tactical strategy and digital wargames',
  platform: 'Browser-based web game',
  pricingModel: 'Free core play with optional $1.99/month content unlocks',
  availability: 'Public marketing page plus a playable browser build with optional paid expansion content',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web browser',
  offerPrice: 1.99,
  officialPath: '/apps/fourstargeneral',
  pricingPath: '/pricing#fourstargeneral',
  helpPath: '/help/fourstargeneral',
  supportPath: '/support',
  appUrl: APP_URLS.fourstargeneral,
  relatedProducts: ['gravity'],
  supportingArticleSlugs: [
    'what-is-four-star-general',
    'deterministic-tactics-in-a-wwii-strategy-game',
    'why-supply-and-reserves-matter-in-tactical-war-games',
  ],
  theme: {
    gradient: 'linear-gradient(135deg, #b45309 0%, #f59e0b 55%, #fb923c 100%)',
    accent: '#d97706',
    tint: '#fff7ed',
    dark: '#451a03',
    lightBorder: '#fdba74',
  },
  primaryCta: {
    kind: 'launch',
    label: 'Play now',
    appSlug: 'fourstargeneral',
  },
  secondaryCta: {
    kind: 'link',
    label: 'See pricing',
    href: '/pricing#fourstargeneral',
  },
  whatItIs: [
    'Four Star General is a WWII tactical strategy game for players who want battlefield decisions to be clear, consequential, and grounded in visible systems. Four Star General emphasizes command decisions, positioning, mission profiles, supply, and reserves instead of arcade-style spectacle.',
    'The current product messaging describes a deterministic tactical battle experience where the player plans operations, coordinates units, and works through authored scenarios with real battlefield pressure. That deterministic framing matters because it tells the audience what kind of strategy game this is and what kind of strategy game it is not.',
    'Four Star General is best described as a browser-based tactical wargame for players who like serious WWII strategy, authored scenarios, and a rules model where outcomes follow from deployment, resource pressure, and command choices.',
  ],
  whoItIsFor: [
    'Four Star General is for players who enjoy serious WWII tactical strategy and digital wargames more than fast arcade action.',
    'Four Star General is for players who want battlefield pressure to come from supply, reserves, positioning, and mission objectives instead of hidden randomness or spectacle-first pacing.',
    'Four Star General is for people who like authored scenarios, deterministic tactics, and command decisions that can be studied, tested, and improved over repeat play.',
  ],
  problemItSolves: [
    'A lot of strategy-game marketing talks about "epic warfare" without telling the player how the game actually creates tension. Four Star General solves that clarity problem by centering the public explanation on deterministic tactics, battlefield pressure, supply, reserves, and mission profiles.',
    'For players who care about serious tactical play, the important question is not whether a game looks war-like. The important question is whether command decisions matter. Four Star General answers that with systems the audience already recognizes: deployment, logistics, reserve management, and objective pressure.',
  ],
  howItWorks: [
    'Choose and deploy forces for the scenario while considering terrain, objectives, reserve posture, and how pressure will build over the battle.',
    'Work through authored mission profiles where battlefield tempo, supply, and available responses shape what you can do next.',
    'Resolve tactical outcomes through a deterministic rules model so the battle reflects the command decisions that led into it.',
    'Review the scenario, refine deployment and timing, and return with better tactical answers instead of relying on vague randomness.',
  ],
  keyFeatures: [
    {
      title: 'Deterministic tactics',
      description:
        'Outcomes are meant to follow from visible rules and command decisions, which gives the player a tactical model they can actually learn.',
    },
    {
      title: 'Battlefield pressure',
      description:
        'Each turn tightens the situation so positioning, tempo, and reserve discipline matter instead of feeling optional.',
    },
    {
      title: 'Supply and reserve management',
      description:
        'Supply tempo and reserve use create real strategic tradeoffs instead of serving as decorative flavor text.',
    },
    {
      title: 'Mission profiles and objectives',
      description:
        'Authored scenarios and objective pressure give battles a purpose beyond simply deleting enemy units.',
    },
    {
      title: 'Operationally meaningful unit mix',
      description:
        'Armor, infantry, artillery, air support, engineers, anti-air, recon, and logistics all matter because they change the tactical answer available to the player.',
    },
    {
      title: 'Current tactical battle prototype',
      description:
        'The current build focuses on a tactical battle prototype that highlights deployment, reserve management, and deterministic resolution in authored scenarios.',
    },
  ],
  pricingAndAccess: [
    'Four Star General is described on the public pricing page as playable now with optional paid content unlocks at $1.99 per month. The core message is not "pay to start." The core message is "start with the tactical core, then expand content if the game fits you."',
    'That model matches the audience. Serious strategy players want to understand the systems first. Optional paid content works when the base tactical experience is already clear and the added value is more units, more scenarios, and broader campaign-style content.',
  ],
  faq: [
    {
      question: 'What is Four Star General?',
      answer:
        'Four Star General is a WWII tactical strategy game. Four Star General focuses on deterministic tactics, mission pressure, supply, reserves, and command decisions rather than on arcade-style action.',
    },
    {
      question: 'What does deterministic tactics mean in Four Star General?',
      answer:
        'In Four Star General, deterministic tactics means the game is built so battlefield outcomes follow visible rules and command decisions. That makes deployment, timing, reserves, and supply pressure important because the player can study and improve the result.',
    },
    {
      question: 'Who is Four Star General for?',
      answer:
        'Four Star General is for players of serious WWII tactical strategy and digital wargames. The public copy should stay aligned with that audience instead of marketing the game like a broad arcade shooter or generic action title.',
    },
    {
      question: 'Does Four Star General use supply and reserves as real systems?',
      answer:
        'Yes. Supply and reserves are part of the public product framing because they are central to how battlefield pressure is created. The game is meant to reward players who think about logistics, tempo, and commitment windows, not just attack values.',
    },
    {
      question: 'What is the current scope of Four Star General?',
      answer:
        'The current docs describe Four Star General as a tactical battle prototype with authored scenarios, deployment flow, reserve management, and deterministic resolution. That is the clearest public statement of current scope and should stay visible on the marketing page.',
    },
    {
      question: 'How does pricing work for Four Star General?',
      answer:
        'The public pricing page presents Four Star General as playable now with optional $1.99 per month unlocks for more units, scenarios, and expanded content. The base idea is free core play with optional expansion content rather than a hard paywall.',
    },
  ],
  gettingStarted: [
    'Read the public overview with the expectation that Four Star General is a serious WWII tactical strategy game, not an arcade action title.',
    'Launch the browser build and start with the tactical battle layer so you can learn how deployment, objectives, and deterministic resolution fit together.',
    "Pay attention to mission pressure, reserve timing, supply posture, and terrain because those systems are the heart of the game's command model.",
    'If the tactical core fits you, review the pricing page for optional content expansion.',
  ],
  commonUseCases: [
    'Playing authored WWII tactical scenarios that reward planning more than reflexes.',
    'Studying how supply, reserves, and objective pressure alter battlefield decisions.',
    'Comparing tactical approaches across repeat runs because the underlying rules are deterministic.',
    'Using a browser-based strategy game when you want wargame-style pressure without physical setup time.',
  ],
  scopeNotes: [
    'Four Star General should be described as a serious WWII tactical strategy game, not as generic "gaming" entertainment.',
    'The current public scope is tactical battle play with authored scenarios, deployment, reserve management, and deterministic resolution.',
    'The product messaging should keep command decisions, mission profiles, supply, and battlefield pressure visible because those are the signals the audience actually cares about.',
  ],
};
