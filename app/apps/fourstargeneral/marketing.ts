import type { ProductDefinition } from '@/lib/productContent';
import { APP_URLS } from '@/lib/subscription';

export const fourStarGeneralProductDefinition: ProductDefinition = {
  slug: 'fourstargeneral',
  name: 'Four Star General',
  descriptor: 'WWII tactical strategy game with deterministic tactics',
  h1: 'Four Star General for serious WWII tactical strategy',
  title: 'Four Star General | WWII Tactical Strategy Game with Deterministic Tactics',
  metaDescription:
    'Four Star General is a WWII tactical strategy game focused on supply, reserves, urgent command decisions, and deterministic tactical resolution.',
  heroEyebrow: 'WWII Tactical Strategy',
  heroValue:
    'Make deliberate command decisions about deployment, reserves, supply, and mission objectives in a browser-based WWII tactical strategy game.',
  heroSummary:
    'Four Star General is a browser-based WWII tactical strategy game built around deterministic resolution, battlefield tension, and mission-driven command decisions.',
  oneSentence:
    'Four Star General is a browser-based WWII tactical strategy game with deterministic battlefield resolution.',
  category: 'WWII tactical strategy game',
  primaryAudience: 'Players of serious WWII tactical strategy and digital wargames',
  platform: 'Browser-based web game',
  pricingModel: 'Free to play the tactical core. Unlock more scenarios, units, and content for $1.99/month',
  availability: 'Jump into the tactical prototype right now. Paid content adds more to play, not access to start',
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
    gradient: 'linear-gradient(135deg, #1f2a1b 0%, #3f5f2d 52%, #6b8f3d 100%)',
    accent: '#4d7c0f',
    tint: '#f7fee7',
    dark: '#1a2e05',
    lightBorder: '#bef264',
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
    'Four Star General is a deterministic tactical battle experience where you plan operations, coordinate units, and work through authored scenarios where every command decision has real consequences. Deterministic means the rules are visible and the outcome follows from your decisions, not hidden randomness.',
    'Four Star General is a browser-based tactical wargame for players who like serious WWII strategy, authored scenarios, and a rules model where outcomes follow from deployment, logistics, and command choices.',
  ],
  whoItIsFor: [
    'Four Star General is for players who enjoy serious WWII tactical strategy and digital wargames more than fast arcade action.',
    'Four Star General is for players who want battlefield tension to come from supply, reserves, positioning, and mission objectives instead of hidden randomness or spectacle-first pacing.',
    'Four Star General is for people who like authored scenarios, deterministic tactics, and command decisions that can be studied, tested, and improved over repeat play.',
  ],
  problemItSolves: [
    'A lot of strategy-game marketing talks about "epic warfare" without telling the player how the game actually creates tension. Four Star General is the opposite: deterministic tactics, hard command decisions, supply, reserves, and mission profiles do the work.',
    'For serious tactical play, the important question is not whether a game looks war-like. The important question is whether command decisions matter. Four Star General answers that with systems you already recognize: deployment, logistics, reserve management, and timed objectives.',
  ],
  howItWorks: [
    'Choose and deploy forces for the scenario while considering terrain, objectives, reserve posture, and how the situation will tighten over the battle.',
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
      title: 'Battlefield tension',
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
        'Authored scenarios and clear objectives give battles a purpose beyond simply deleting enemy units.',
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
    'Four Star General is playable now, with optional paid content unlocks at $1.99 per month. This is not "pay to start." Start with the tactical core, then expand content if the game fits you.',
    'Serious strategy players want to understand the systems first. Optional paid content works when the base tactical experience is already clear, and the added value is more units, more scenarios, and broader campaign-style content.',
  ],
  faq: [
    {
      question: 'What is Four Star General?',
      answer:
        'Four Star General is a WWII tactical strategy game. Four Star General focuses on deterministic tactics, mission objectives, supply, reserves, and command decisions rather than on arcade-style action.',
    },
    {
      question: 'What does deterministic tactics mean in Four Star General?',
      answer:
        'In Four Star General, deterministic tactics means the game is built so battlefield outcomes follow visible rules and command decisions. That makes deployment, timing, reserves, and supply discipline important because the player can study and improve the result.',
    },
    {
      question: 'Who is Four Star General for?',
      answer:
        'Four Star General is for players of serious WWII tactical strategy and digital wargames. It is not a broad arcade shooter or a generic action title.',
    },
    {
      question: 'Does Four Star General use supply and reserves as real systems?',
      answer:
        'Yes. Supply and reserves are core to how battlefield tension is built. The game rewards players who think about logistics, tempo, and commitment windows, not just attack values.',
    },
    {
      question: 'What is the current scope of Four Star General?',
      answer:
        'Four Star General is a tactical battle prototype with authored scenarios, deployment flow, reserve management, and deterministic resolution. That is what you can play today.',
    },
    {
      question: 'How does pricing work for Four Star General?',
      answer:
        'Four Star General is playable now with optional $1.99 per month unlocks for more units, scenarios, and expanded content. Free core play with optional expansion content, not a hard paywall.',
    },
  ],
  gettingStarted: [
    'Start with the expectation that Four Star General is a serious WWII tactical strategy game, not an arcade action title.',
    'Launch the browser build and start with the tactical battle layer so you can learn how deployment, objectives, and deterministic resolution fit together.',
    "Pay attention to mission objectives, reserve timing, supply posture, and terrain because those systems are the heart of the game's command model.",
    'If the tactical core fits you, check the pricing page for optional content expansion.',
  ],
  commonUseCases: [
    'Playing authored WWII tactical scenarios that reward planning more than reflexes.',
    'Studying how supply, reserves, and timed objectives shape battlefield decisions.',
    'Comparing tactical approaches across repeat runs because the underlying rules are deterministic.',
    'Using a browser-based strategy game when you want wargame-style tactical challenge without physical setup time.',
  ],
  scopeNotes: [
    'Four Star General is a serious WWII tactical strategy game, not generic "gaming" entertainment.',
    'Current scope is tactical battle play with authored scenarios, deployment, reserve management, and deterministic resolution.',
    'Command decisions, mission profiles, supply, and urgent battlefield choices are what make this a real tactical wargame instead of surface-level war flavor.',
  ],
};
