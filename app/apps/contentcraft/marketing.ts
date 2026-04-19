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
    'Build connected stories, campaigns, and settings in one place without losing track of canon, continuity, or what your project already established.',
  heroSummary:
    'ContentCraft is a browser-based writing tool and worldbuilding workspace for projects where lore, characters, factions, and canon details keep growing and need to stay connected.',
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
    label: 'Subscribe',
    planId: 'contentcraft',
    allowAccessRedirect: true,
  },
  secondaryCta: {
    kind: 'link',
    label: 'See pricing',
    href: '/pricing#contentcraft',
  },
  whatItIs: [
    'ContentCraft is a writing tool and worldbuilding workspace for projects that outgrow loose notes, disconnected documents, and one-off AI chats. It is built for story-rich work where characters, factions, timelines, locations, and canon details need to stay aligned as the project expands.',
    'ContentCraft keeps project organization, canon tracking, and AI-assisted drafting in one place so writers and game masters can move from ideas and notes into working material without losing the world rules, lore details, or narrative links that make the work feel coherent.',
    'ContentCraft is especially well matched to campaign prep, long-form fiction, setting development, and any creative project where relationships between people, places, items, arcs, and timelines matter as much as the text itself.',
  ],
  whoItIsFor: [
    'ContentCraft is for writers and novelists who need story organization, lore organization, and canon continuity across chapters, series, or large narrative projects.',
    'ContentCraft is for worldbuilders who want a workspace that treats factions, locations, items, character relationships, and timelines as connected project assets instead of scattered notes.',
    'ContentCraft is for game masters who build campaign content, recurring NPCs, locations, and factions and want a tool that remembers those connections as the campaign grows.',
  ],
  problemItSolves: [
    'Long-form creative work drifts when the canon is stored across folders, notebooks, wikis, chats, and half-finished drafts. Writers and game masters end up re-checking old material, duplicating work, or accidentally contradicting details they already established.',
    "Generic AI tools make that problem worse because they generate quickly but do not reliably track what the project has already established. ContentCraft is meant to address both problems at once by keeping the canon, the project structure, and the generation process in the same place.",
  ],
  howItWorks: [
    'Create or organize a project around campaigns, settings, articles, chapters, supplements, or other connected creative work.',
    'Build a canon library for characters, factions, locations, items, encounters, arcs, and the other world details the project needs to remember.',
    'Move from outline to draft to review in deliberate steps so each output can be checked against what the project already has instead of accepted blindly.',
    'Review, revise, and export from the same workspace so the project stays coherent even as the scope expands.',
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
    'ContentCraft is $9.99 per month or $99 per year. It is the one product in the lineup that requires a subscription from the start, because the whole value is in the workspace — lore organization, canon management, and AI-assisted drafting working together.',
    'ContentCraft includes built-in AI usage for writers who want it, but the value is bigger than AI. The product is grounded in writing and worldbuilding: the AI helps when you want it, and the canon and organization layer is there whether you use it or not.',
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
    'Keeping lore consistent across a long campaign, novel, or multi-part story project.',
    'Organizing NPCs, factions, locations, and campaign content for game master prep.',
    'Managing story organization for a long-form writing project with repeated references and interlocking canon.',
    'Building a reusable world library that can support future chapters, sessions, supplements, or spin-off material.',
  ],
  scopeNotes: [
    'ContentCraft is a writing tool and worldbuilding workspace, not generic office productivity software.',
    'ContentCraft is strongest when the project has real continuity demands: repeated references, expanding lore, shared canon, or linked creative assets.',
    'ContentCraft is AI-assisted, but the canon, review, and project-organization layers stand on their own whether or not you use the AI features.',
  ],
};
