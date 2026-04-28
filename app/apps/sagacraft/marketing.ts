import type { ProductDefinition } from '@/lib/productContent';
import { APP_URLS } from '@/lib/subscription';

export const sagaCraftProductDefinition: ProductDefinition = {
  slug: 'sagacraft',
  name: 'SagaCraft',
  descriptor: 'Novel writing and story continuity tool for fiction writers',
  h1: 'SagaCraft for stories that keep getting bigger',
  title: 'SagaCraft | Novel Writing and Story Continuity Tool for Fiction Writers',
  metaDescription:
    'SagaCraft helps novelists and fiction writers organize characters, plots, chapters, settings, timelines, lore, and story continuity in one focused writing workspace.',
  heroEyebrow: 'Novel Writing and Story Continuity Tool',
  heroValue:
    'Your story should get clearer as it grows, not harder to manage.',
  heroSummary:
    'SagaCraft helps fiction writers organize characters, plots, chapters, settings, timelines, lore, and continuity in one focused writing workspace.',
  oneSentence:
    'SagaCraft helps novelists and fiction writers organize characters, plots, chapters, settings, timelines, lore, and story continuity in one connected workspace.',
  category: 'Novel writing and story continuity workspace',
  primaryAudience: 'Novelists, amateur writers, serial fiction authors, and worldbuilders',
  platform: 'Browser-based web app',
  pricingModel: 'Core writing workspace free. AI drafting help $9.99/month when you want it',
  availability: 'Start your story now — characters, plots, chapters, and timelines are free. Add AI assistance for drafting, outlining, and revision whenever you are ready.',
  applicationCategory: 'WritingApplication',
  operatingSystem: 'Web browser',
  officialPath: '/apps/sagacraft',
  pricingPath: '/pricing#sagacraft',
  helpPath: '/help/sagacraft',
  supportPath: '/support',
  appUrl: APP_URLS.sagacraft,
  relatedProducts: ['gamemastercraft'],
  supportingArticleSlugs: [],
  theme: {
    gradient: 'linear-gradient(135deg, #0c1a3a 0%, #1e3a8a 46%, #2563eb 100%)',
    accent: '#2563eb',
    tint: '#eff6ff',
    dark: '#1e3a8a',
    lightBorder: '#93c5fd',
  },
  primaryCta: {
    kind: 'launch',
    label: 'Start Writing Your Story',
    appSlug: 'sagacraft',
  },
  primaryOpenPublic: true,
  secondaryCta: {
    kind: 'link',
    label: 'Explore Features',
    href: '#features',
  },
  whatItIs: [
    'Every serious story eventually becomes bigger than the first idea. A side character becomes important. A place mentioned once turns into a major setting. A secret introduced early needs to pay off later. A rule of the world, once established, has to remain true unless the story deliberately breaks it.',
    'SagaCraft is built for that moment. It gives fiction writers one place to organize the characters, locations, plot threads, timelines, lore, chapter notes, and unresolved promises that make a story feel whole. Instead of relying on scattered documents, old notes, and memory, you can build from the story\'s existing canon.',
    'This is not a generic notes app with a writing label. It is a structured story workspace for writers who want their novel, series, or fictional world to stay coherent as it grows.',
  ],
  whoItIsFor: [
    'Novelists and amateur writers building stories with connected characters, layered plots, and details that need to stay consistent across chapters, books, or an entire series.',
    'Fantasy, science fiction, mystery, thriller, romance, adventure, and serial fiction writers whose worlds have rules, histories, and recurring elements that readers will notice if they drift.',
    'Worldbuilders and indie authors planning a series or shared fictional universe who need their creative material organized well enough to return to and build on.',
  ],
  problemItSolvesHeading: 'The story remembers what you built',
  problemItSolves: [
    'SagaCraft is designed around the way fiction actually develops. You do not just generate text. You make choices. You decide what a character wants. You decide what the reader should know and when. You decide which promises matter, which details should return, and which scenes need more weight.',
    'SagaCraft supports that process. It helps you keep the moving parts of a story connected, so drafting, outlining, revising, and worldbuilding all feed the same project instead of becoming separate piles of material.',
    'Good story organization is not about trapping the book in an outline. It is about giving yourself enough structure to write freely without losing the thread.',
  ],
  howItWorks: [
    'Start with whatever you have — a novel idea, a main character, a first chapter, a fantasy world, a mystery premise, a pile of notes, or a finished draft that needs revision.',
    'Add the core pieces of your story: characters, chapters, plot arcs, settings, timelines, and lore. Connect them as the story takes shape.',
    'Use AI assistance to help brainstorm scenes, expand character ideas, develop setting details, test plot options, summarize notes, outline chapters, or explore revision possibilities — all in the context of your story.',
    'Let the project build on itself over time. Revision becomes cleaner. New chapters inherit everything the earlier ones established. The story stays coherent as it grows.',
  ],
  keyFeatures: [
    {
      title: 'Characters who stay consistent',
      description:
        'Track names, roles, goals, fears, secrets, relationships, backstories, voice notes, and character arcs. Keep the person on the page connected to the person you planned.',
    },
    {
      title: 'Plots with visible shape',
      description:
        'Organize main plots, subplots, mysteries, reveals, twists, conflicts, promises, payoffs, and unresolved threads so the story has a clear working structure.',
    },
    {
      title: 'Chapters that connect to the larger story',
      description:
        'Plan, draft, and review chapters with awareness of what came before and what still needs to happen. Keep scenes tied to character movement, plot progress, and reader expectation.',
    },
    {
      title: 'Settings that feel lived in',
      description:
        'Build towns, kingdoms, starships, schools, cities, cultures, magic systems, technologies, histories, and recurring locations without losing the details that make them believable.',
    },
    {
      title: 'Timelines that hold together',
      description:
        'Track what happened, when it happened, who knew about it, and what changed afterward. Prevent accidental timeline drift before it becomes revision pain.',
    },
    {
      title: 'Lore that supports the story',
      description:
        'Organize rules, myths, histories, factions, social structures, prophecies, family lines, and world details so they serve the novel instead of overwhelming it.',
    },
  ],
  pricingAndAccess: [
    'SagaCraft is free to start inside Sixsmith Games. Create a writing workspace and begin organizing your characters, chapters, plot arcs, settings, timelines, and lore.',
    'AI assistance is available to help you brainstorm, draft, expand, and organize story material in the context of your project. You stay in control of voice, canon, pacing, theme, and final decisions.',
  ],
  faq: [
    {
      question: 'What is SagaCraft?',
      answer:
        'SagaCraft is a novel writing and story continuity tool for fiction writers. It helps organize characters, plots, chapters, settings, timelines, lore, relationships, and story details in one connected workspace.',
    },
    {
      question: 'Is SagaCraft only for fantasy writers?',
      answer:
        'No. Fantasy and science fiction writers may get obvious value from the worldbuilding tools, but SagaCraft also fits mystery, thriller, romance, adventure, historical fiction, serial fiction, and any story where continuity matters.',
    },
    {
      question: 'Does SagaCraft write the novel for me?',
      answer:
        'No. SagaCraft is designed to support the writer, not replace the writer. AI assistance can help with brainstorming, outlining, drafting options, summarizing notes, and revision support, but the story remains yours.',
    },
    {
      question: 'Can SagaCraft help with a series?',
      answer:
        'Yes. SagaCraft is especially useful when one book becomes several. It helps preserve characters, settings, timelines, lore, unresolved threads, and important continuity details across a larger fictional world.',
    },
    {
      question: 'Is this just another notes app?',
      answer:
        'No. SagaCraft is focused on fiction structure and continuity. It is built around the parts of a story that need to stay connected: characters, places, timelines, chapters, arcs, relationships, lore, and references.',
    },
    {
      question: 'Can I use SagaCraft if I am still outlining?',
      answer:
        'Yes. SagaCraft works for early planning, outlining, drafting, revision, and series development. You can start with a single idea or import structure from an existing project.',
    },
    {
      question: 'Can I use it for short stories?',
      answer:
        'Yes, especially if the short stories share characters, locations, lore, or a larger fictional setting. It is most valuable when the material needs continuity across more than one scene, draft, or story.',
    },
    {
      question: 'How is SagaCraft different from GameMasterCraft?',
      answer:
        'SagaCraft is for fiction writers organizing novels, series, characters, chapters, timelines, and story continuity. GameMasterCraft is for tabletop RPG game masters preparing campaigns, sessions, NPCs, factions, locations, and campaign lore.',
    },
  ],
  gettingStarted: [
    'Create a writing workspace and start with the core pieces: your main character, the central conflict, and the first setting or plot thread that matters.',
    'Add chapters, characters, and lore as you write. Capture decisions, changes, and unresolved threads so the story can build on itself instead of drifting.',
    'Connect the pieces as the project grows. Let side characters, settings, and plot threads find a place in the workspace instead of getting lost between drafts.',
    'Use AI assistance when you want to move faster — to brainstorm a scene, expand a character, outline a chapter, or explore a revision option in context.',
  ],
  commonUseCases: [
    'Writing a novel series where readers will remember what a character said or believed three books ago.',
    'Organizing a fantasy or science fiction world with custom factions, locations, magic systems, and a history the story is actively building on.',
    'Managing a serial fiction project where each installment inherits characters, lore, and unresolved threads from the last.',
    'Revising a complex draft where tracking what changed, why it changed, and what else the change affects matters.',
  ],
  scopeNotes: [
    'SagaCraft is a novel writing and story continuity workspace for fiction writers, not a generic productivity or document editor.',
    'SagaCraft is strongest when the project has real continuity demands: recurring characters, layered plots, expanding lore, or a world that needs to stay consistent across chapters and drafts.',
    'SagaCraft is AI-assisted, but the character structure, story organization, and continuity layers stand on their own whether or not you use the AI features.',
  ],
};
