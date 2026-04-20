import type { ProductDefinition } from '@/lib/productContent';
import { APP_URLS } from '@/lib/subscription';

export const contentCraftProductDefinition: ProductDefinition = {
  slug: 'contentcraft',
  name: 'ContentCraft',
  descriptor: 'Worldbuilding and writing tool for canon continuity',
  h1: 'ContentCraft for writers, worldbuilders, and game masters',
  title: 'ContentCraft | Worldbuilding and Writing Tool for Canon Continuity',
  metaDescription:
    'ContentCraft helps writers and game masters organize lore, canon continuity, characters, factions, and story workflow in one workspace.',
  heroEyebrow: 'Writing Tool and Worldbuilding Workspace',
  heroValue:
    'Your world should get richer the longer you work on it — not harder to keep straight.',
  heroSummary:
    'ContentCraft is for writers, worldbuilders, and game masters whose projects outgrew memory and outgrew folders. The world lives in one place, and the next chapter builds on everything you have already established.',
  oneSentence:
    'ContentCraft helps writers and game masters organize lore, continuity, and project content in one place.',
  category: 'Worldbuilding and writing tool with canon continuity support',
  primaryAudience: 'Writers, novelists, worldbuilders, and game masters',
  platform: 'Browser-based web app',
  pricingModel: '$9.99/month or $99/year. Includes the full workspace, canon tracking, and built-in AI usage',
  availability: 'Subscribe to get full access. No free tier — the whole tool is inside the subscription',
  applicationCategory: 'WritingApplication',
  operatingSystem: 'Web browser',
  offerPrice: 9.99,
  officialPath: '/apps/contentcraft',
  pricingPath: '/pricing#contentcraft',
  helpPath: '/help/contentcraft',
  supportPath: '/support',
  appUrl: APP_URLS.contentcraft,
  relatedProducts: ['virtual-combat-simulator'],
  supportingArticleSlugs: [
    'what-is-contentcraft',
    'how-to-keep-lore-consistent',
    'worldbuilding-workflow-for-writers-and-game-masters',
  ],
  theme: {
    gradient: 'linear-gradient(135deg, #3f0d12 0%, #7f1d1d 46%, #dc2626 100%)',
    accent: '#b91c1c',
    tint: '#fef2f2',
    dark: '#450a0a',
    lightBorder: '#fca5a5',
  },
  primaryCta: {
    kind: 'subscribe',
    label: 'Start your subscription',
    planId: 'contentcraft',
    allowAccessRedirect: true,
  },
  secondaryCta: {
    kind: 'link',
    label: 'See pricing',
    href: '/pricing#contentcraft',
  },
  whatItIs: [
    'Every writer or game master with a project worth finishing runs into the same wall. The story gets bigger than memory can hold, and the world starts to drift. A faction\'s motives shift between chapters. A character says the wrong name. The bustling port town on page forty is a sleepy village by page two hundred. ContentCraft is built for that moment — when you want the project to keep growing without the continuity giving out.',
    'This is not a folder system with an AI bolted on. It is a workspace where the people, places, factions, timelines, and rules of your world live together and stay connected. You write against your canon, not against your memory.',
    'The writers and game masters who fit best here are the ones building something they want to return to: a novel that needs a second book, a campaign that runs for a year, a setting that outlives the first thing you wrote for it.',
  ],
  whoItIsFor: [
    'Writers and novelists working on projects that span multiple chapters, books, or years — where readers will notice if the villain\'s backstory quietly shifts between volumes.',
    'Worldbuilders whose settings have become the point of the project. Factions, geography, history, culture, technology. The kind of world a reader or player wants to step back into because it actually holds together.',
    'Game masters running long campaigns with recurring NPCs, growing factions, and places the party keeps coming back to. Prep for session twelve should be easier than prep for session two, not harder.',
  ],
  problemItSolves: [
    'Creative projects rarely fail in one dramatic moment. They fail in the slow drift of names, motivations, timelines, and rules that were supposed to stay fixed. By the time you catch the contradictions, untangling them costs more than writing the next chapter.',
    'Generic AI tools make this worse, not better. They generate fast and forget everything. What a serious project needs is a workspace that remembers your world — so new material builds on what already exists instead of quietly overwriting it.',
  ],
  howItWorks: [
    'Bring in the project you are already working on. The characters that matter, the places the story keeps returning to, the factions whose choices drive the plot, the rules the world is supposed to follow.',
    'Write against that canon. Draft, review, and revise in the same workspace where your world already lives, with AI assistance available when you want it and invisible when you don\'t.',
    'Add new canon as the project grows. The world gets richer over time instead of harder to navigate, and the next chapter inherits everything the last one established.',
    'For setup steps, project templates, and detailed workflows, see the help pages and the articles on building a campaign bible, keeping recurring elements consistent, and moving from notes to usable session content.',
  ],
  keyFeatures: [
    {
      title: 'Projects and shared library',
      description:
        'Keep campaigns, settings, chapters, articles, and supporting canon in one workspace instead of splitting them across unrelated tools.',
    },
    {
      title: 'Canon and continuity tracking',
      description:
        'Track characters, locations, items, factions, arcs, timelines, and references so story details stay consistent over time.',
    },
    {
      title: 'Draft in deliberate steps',
      description:
        'Move from outline to draft to review at your own pace instead of turning the whole project over to one blind prompt.',
    },
    {
      title: 'Relationship mapping',
      description:
        'Keep people, places, groups, and plot threads connected so the world reads like a system instead of a pile of notes.',
    },
    {
      title: 'Catch contradictions early',
      description:
        'Review new material against the existing canon before it becomes settled so inconsistencies get caught while they are still easy to fix.',
    },
    {
      title: 'Export without losing history',
      description:
        'Preserve history and diffs alongside export-ready outputs so context does not disappear every time material leaves the workspace.',
    },
  ],
  pricingAndAccess: [
    'ContentCraft is $9.99 per month or $99 per year. It is the one product in the Sixsmith Games lineup that requires a subscription from the start — the whole workspace comes together only when the canon, the project structure, and the drafting tools are in the same place.',
    'AI assistance is included, but the real value is the world you build inside the workspace. The AI helps when you want it. The canon, the connections, and the project memory are yours whether you use the AI features or not.',
  ],
  faq: [
    {
      question: 'What is ContentCraft?',
      answer:
        'ContentCraft is a writing tool and worldbuilding workspace for projects that need canon continuity. ContentCraft helps writers and game masters keep characters, locations, factions, lore, and timelines organized in one place.',
    },
    {
      question: 'Who is ContentCraft for?',
      answer:
        'ContentCraft is for writers, novelists, worldbuilders, and game masters. ContentCraft is not generic productivity software. It is built for projects where connected lore, story organization, and continuity matter.',
    },
    {
      question: 'Does ContentCraft replace my normal writing workflow?',
      answer:
        'ContentCraft is built around complex creative work, not a flat generic editor. It works best when the project needs a real canon layer, connected lore, and a way to review new material against what already exists.',
    },
    {
      question: 'How does ContentCraft help with canon continuity?',
      answer:
        'ContentCraft keeps core world details in a shared library and ties new work back to what the project has already established. That makes it easier to keep names, places, relationships, and rules consistent as the project grows.',
    },
    {
      question: 'Is AI required to use ContentCraft?',
      answer:
        'No. ContentCraft includes AI-assisted drafting, but the value goes beyond AI. The product is also about organization, canon continuity, review flow, and keeping creative work coherent.',
    },
    {
      question: 'How does pricing work for ContentCraft?',
      answer:
        'ContentCraft is $9.99 per month or $99 per year. The subscription includes some built-in AI usage, with additional AI usage handled through bring-your-own or purchased credits when needed.',
    },
  ],
  gettingStarted: [
    'Start by defining the project you are actually building, such as a campaign, a setting, a novel, or a series of connected articles.',
    'Add the core canon assets first: important characters, locations, factions, timelines, items, and rules the project must respect.',
    'Expand the project in reviewable steps instead of asking for one giant generation pass.',
    'When you are ready, subscribe to unlock the full workspace. The pricing page covers what is included.',
  ],
  commonUseCases: [
    'Writing a novel series where readers will remember what the villain said three books ago.',
    'Running a year-long campaign where the party has every NPC promise and every faction grudge on file.',
    'Developing a setting that holds together across chapters, supplements, short stories, and the next project you haven\'t started yet.',
    'Building a world rich enough that returning to it feels like coming home — not like reconstructing a crime scene.',
  ],
  scopeNotes: [
    'ContentCraft is a writing tool and worldbuilding workspace, not generic office productivity software.',
    'ContentCraft is strongest when the project has real continuity demands: repeated references, expanding lore, shared canon, or linked creative assets.',
    'ContentCraft is AI-assisted, but the canon, review, and project-organization layers stand on their own whether or not you use the AI features.',
  ],
};
