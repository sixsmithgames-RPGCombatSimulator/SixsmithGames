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
    'ContentCraft is a browser-based writing tool and worldbuilding workspace for projects that need structured lore, continuity, and staged AI-assisted workflows.',
  oneSentence:
    'ContentCraft helps writers and game masters organize lore, continuity, and project content in one place.',
  category: 'Worldbuilding and writing tool with canon continuity support',
  primaryAudience: 'Writers, novelists, worldbuilders, and game masters',
  platform: 'Browser-based web app',
  pricingModel: '$9.99/month or $99/year subscription',
  availability: 'Public marketing page plus subscription access to the app',
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
    'ContentCraft is a structured writing tool and worldbuilding workspace for projects that grow beyond loose notes, disconnected documents, or one-off AI chats. ContentCraft is designed for story-rich work where characters, factions, timelines, locations, and canon details need to stay aligned as the project expands.',
    'ContentCraft blends project organization with canon continuity and staged AI-assisted workflows. The point is not generic productivity. The point is helping writers and game masters move from idea to draft to revision without losing the world rules, lore details, or narrative links that make the work feel coherent.',
    'ContentCraft is especially well matched to campaign prep, long-form fiction, setting development, and any creative project where relationships between people, places, items, arcs, and timelines matter as much as the text itself.',
  ],
  whoItIsFor: [
    'ContentCraft is for writers and novelists who need story organization, lore organization, and canon continuity across chapters, series, or large narrative projects.',
    'ContentCraft is for worldbuilders who want a workspace that treats factions, locations, items, character relationships, and timelines as connected project assets instead of scattered notes.',
    'ContentCraft is for game masters who build campaign content, recurring NPCs, locations, and factions and want a tool that remembers those connections as the campaign grows.',
  ],
  problemItSolves: [
    'Long-form creative work drifts when the canon is stored across folders, notebooks, wikis, chats, and half-finished drafts. Writers and game masters end up re-checking old material, duplicating work, or accidentally contradicting details they already established.',
    "Generic AI tools make that problem worse because they generate quickly but do not reliably track the project's source of truth. ContentCraft is meant to solve the continuity problem and the workflow problem at the same time by keeping the canon, the project structure, and the generation process connected.",
  ],
  howItWorks: [
    'Create or organize a project around campaigns, settings, articles, chapters, supplements, or other connected creative work.',
    'Store canon in a structured library for characters, factions, locations, items, encounters, arcs, and other world details the project needs to remember.',
    'Use staged workflows to move from outline to draft to review so every major output can be checked against the project instead of accepted blindly.',
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
      title: 'Stage-based AI workflows',
      description:
        'Move from outline to draft to review in deliberate steps instead of turning the whole project over to one blind prompt.',
    },
    {
      title: 'Relationship mapping',
      description:
        'Keep people, places, groups, and plot threads connected so the world reads like a system instead of a pile of notes.',
    },
    {
      title: 'Reviewable revision flow',
      description:
        'Use structured review points and checks so contradictions can be caught before they spread through the project.',
    },
    {
      title: 'Version-aware export workflow',
      description:
        'Preserve history, diffs, and export-ready outputs instead of losing context every time material leaves the tool.',
    },
  ],
  pricingAndAccess: [
    'ContentCraft is the premium creative platform in the Sixsmith Games lineup. The public pricing page lists ContentCraft at $9.99 per month or $99 per year, with messaging centered on structured organization, canon management, and AI-assisted creative workflows.',
    'The pricing copy also notes that ContentCraft includes built-in AI usage for people who want it, while keeping the overall positioning grounded in writing and worldbuilding rather than in vague automation language. The site should keep that creative-work audience focus intact.',
  ],
  faq: [
    {
      question: 'What is ContentCraft?',
      answer:
        'ContentCraft is a writing tool and worldbuilding workspace for projects that need canon continuity. ContentCraft helps writers and game masters keep characters, locations, factions, lore, timelines, and staged workflow outputs organized in one place.',
    },
    {
      question: 'Who is ContentCraft for?',
      answer:
        'ContentCraft is for writers, novelists, worldbuilders, and game masters. ContentCraft is not positioned as generic productivity software. The product is meant for projects where connected lore, story organization, and continuity matter.',
    },
    {
      question: 'Does ContentCraft replace my normal writing workflow?',
      answer:
        'ContentCraft is designed to support and organize complex creative work, not to flatten every part of writing into one generic editor. ContentCraft works best when you want a strong canon layer, project structure, and reviewable creative workflow around the text.',
    },
    {
      question: 'How does ContentCraft help with canon continuity?',
      answer:
        'ContentCraft keeps core world details in a shared library and ties new work back to that source of truth. That structure makes it easier to keep names, places, relationships, and established rules consistent as the project grows.',
    },
    {
      question: 'Is AI required to use ContentCraft?',
      answer:
        'No. ContentCraft includes AI-assisted workflow options, but the value proposition is broader than AI generation. The product is also about organization, canon continuity, review flow, and keeping creative work coherent.',
    },
    {
      question: 'How does pricing work for ContentCraft?',
      answer:
        'The public pricing page lists ContentCraft at $9.99 per month or $99 per year. The marketing copy describes some built-in AI usage, with additional AI usage handled through bring-your-own or purchased credits when needed.',
    },
  ],
  gettingStarted: [
    'Start by defining the project you are actually building, such as a campaign, a setting, a novel, or a series of connected articles.',
    'Add the core canon assets first: important characters, locations, factions, timelines, items, and rules the project must respect.',
    'Use staged workflows to expand the material in reviewable steps instead of asking for one giant generation pass.',
    'Check pricing when you are ready to move from the public overview into active subscription access.',
  ],
  commonUseCases: [
    'Keeping lore consistent across a long campaign, novel, or multi-part story project.',
    'Organizing NPCs, factions, locations, and campaign content for game master prep.',
    'Managing story organization for a long-form writing project with repeated references and interlocking canon.',
    'Building a reusable world library that can support future chapters, sessions, supplements, or spin-off material.',
  ],
  scopeNotes: [
    'ContentCraft is marketed as a writing tool and worldbuilding workspace, not as generic office productivity software.',
    'ContentCraft is strongest when the project has real continuity pressure: repeated references, expanding lore, shared canon, or linked creative assets.',
    'ContentCraft should be described as AI-assisted only when the surrounding explanation also makes the canon, review, and project-organization layers explicit.',
  ],
};
