import type { ProductDefinition } from '@/lib/productContent';
import { APP_URLS } from '@/lib/subscription';

export const gameMasterCraftProductDefinition: ProductDefinition = {
  slug: 'gamemastercraft',
  name: 'GameMasterCraft',
  descriptor: 'Campaign planning and worldbuilding tool for game masters',
  h1: 'GameMasterCraft for campaigns that keep growing',
  title: 'GameMasterCraft | Campaign Planning and Worldbuilding Tool for Game Masters',
  metaDescription:
    'GameMasterCraft helps tabletop RPG game masters organize NPCs, factions, locations, lore, session notes, timelines, and campaign continuity in one connected workspace.',
  heroEyebrow: 'Campaign Planning and Worldbuilding Tool for Game Masters',
  heroValue:
    'Your campaign should get easier to run as the world gets richer.',
  heroSummary:
    'GameMasterCraft helps you organize NPCs, factions, locations, lore, session notes, timelines, and campaign continuity in one connected tabletop RPG workspace.',
  oneSentence:
    'GameMasterCraft helps tabletop RPG game masters organize campaigns, NPCs, factions, locations, lore, and session continuity in one connected workspace.',
  category: 'Campaign planning and worldbuilding workspace',
  primaryAudience: 'Tabletop RPG game masters running long campaigns and homebrew worlds',
  platform: 'Browser-based web app',
  pricingModel: 'Core campaign tools free. AI assistance $9.99/month when you want it',
  availability: 'Start your campaign now — NPCs, factions, locations, and session notes are free. Add AI help for brainstorming and prep whenever you are ready.',
  applicationCategory: 'WritingApplication',
  operatingSystem: 'Web browser',
  officialPath: '/apps/gamemastercraft',
  pricingPath: '/pricing#gamemastercraft',
  helpPath: '/help/gamemastercraft',
  supportPath: '/support',
  appUrl: APP_URLS.gamemastercraft,
  relatedProducts: ['virtual-combat-simulator', 'sagacraft'],
  supportingArticleSlugs: [],
  theme: {
    gradient: 'linear-gradient(135deg, #1a0533 0%, #3b0764 46%, #7c3aed 100%)',
    accent: '#7c3aed',
    tint: '#f5f3ff',
    dark: '#2e1065',
    lightBorder: '#c4b5fd',
  },
  primaryCta: {
    kind: 'launch',
    label: 'Start Planning Your Campaign',
    appSlug: 'gamemastercraft',
  },
  primaryOpenPublic: true,
  secondaryCta: {
    kind: 'link',
    label: 'Explore Features',
    href: '#features',
  },
  whatItIs: [
    'Every long-running campaign reaches the point where memory is not enough. The party returns to a town you improvised six sessions ago. An NPC they ignored becomes important. A faction they insulted should probably respond. A clue from months back suddenly matters again.',
    'GameMasterCraft is built for that moment. It gives game masters one place to organize the people, places, factions, hooks, timelines, secrets, and session notes that make a campaign feel alive. Instead of digging through scattered documents or trying to remember what you meant three months ago, you can build from the campaign\'s existing canon.',
    'This is not a generic notes app with fantasy labels. It is a structured campaign workspace for game masters who want their world to stay coherent as it expands.',
  ],
  whoItIsFor: [
    'Game masters running long D&D campaigns, homebrew tabletop RPG settings, sandbox worlds, and political or faction-driven games where the party\'s choices have real consequences.',
    'Game masters who improvise often and want the campaign to remember what happened — so improvised characters, places, and threads can become material for future sessions instead of lost loose ends.',
    'Creators writing adventures, settings, or Patreon content who need their world organized well enough to return to and build on.',
  ],
  problemItSolvesHeading: 'The campaign remembers what happened',
  problemItSolves: [
    'GameMasterCraft is designed around the way tabletop campaigns actually grow. You do not just write lore. You react to players. You prepare a villain, then the party befriends the lieutenant. You create a town, then the players decide to adopt it as a base. You invent a rumor, then it becomes the center of the next story arc.',
    'GameMasterCraft helps you keep those moving parts connected, so the campaign can stay flexible without becoming messy. Use it to track NPCs, factions, locations, quests, session notes, homebrew lore, secrets, consequences, and the unresolved threads your players will absolutely remember at the worst possible time.',
    'Good campaign prep is not about controlling everything. It is about having enough structure that you can improvise confidently.',
  ],
  howItWorks: [
    'Start with whatever you have — a campaign idea, a homebrew region, a villain, a town, a dungeon, a session recap, or a pile of old notes that needs structure.',
    'Add the core pieces of your world: NPCs, factions, locations, lore, timelines, and session history. Connect them as the campaign takes shape.',
    'Use AI assistance to help draft NPCs, expand locations, generate rumors, develop factions, outline quests, suggest complications, or turn rough notes into cleaner prep — all in the context of your campaign.',
    'Let the campaign world build on itself over time. Improvisation becomes material. Session history becomes usable memory. The world gets richer as it grows.',
  ],
  keyFeatures: [
    {
      title: 'NPCs that do not vanish after one scene',
      description:
        'Track names, roles, motives, secrets, relationships, loyalties, rivalries, and unfinished business. When an improvised character becomes important, they have a place to live.',
    },
    {
      title: 'Factions with memory',
      description:
        'Organize guilds, cults, noble houses, armies, churches, thieves\' networks, rebel cells, monster clans, and political blocs. Keep track of what they want, who they oppose, and how they react to the party.',
    },
    {
      title: 'Locations that stay consistent',
      description:
        'Build towns, ruins, dungeons, regions, shops, temples, strongholds, wilderness sites, and hidden places with enough structure to return to them later.',
    },
    {
      title: 'Session notes that become campaign history',
      description:
        'Capture what happened at the table and turn it into useful campaign memory. Decisions, discoveries, deaths, promises, betrayals, and loose ends can all keep mattering.',
    },
    {
      title: 'Lore that supports play',
      description:
        'Organize gods, myths, laws, cultures, magic systems, customs, prophecies, ancient history, and homebrew rules without burying the details where you cannot use them.',
    },
    {
      title: 'Prep that starts from your world',
      description:
        'Create scenes, hooks, complications, rumors, encounters, and consequences from the material already in your campaign instead of starting from a blank page every session.',
    },
  ],
  pricingAndAccess: [
    'GameMasterCraft is free to start inside Sixsmith Games. Create a campaign workspace and begin organizing your NPCs, factions, locations, lore, and session notes.',
    'AI assistance is available to help you draft, expand, and organize campaign material in the context of your world. You stay in control of the campaign. The AI helps you move faster, fill gaps, and explore options.',
  ],
  faq: [
    {
      question: 'What is GameMasterCraft?',
      answer:
        'GameMasterCraft is a campaign planning and worldbuilding tool for tabletop RPG game masters. It helps organize NPCs, factions, locations, lore, timelines, session notes, quests, secrets, and campaign continuity in one connected workspace.',
    },
    {
      question: 'Is GameMasterCraft only for D&D?',
      answer:
        'No. It is designed for tabletop RPG campaigns generally. D&D game masters are a natural fit, but GameMasterCraft also works for other fantasy, science fiction, horror, mystery, and homebrew tabletop RPG campaigns.',
    },
    {
      question: 'Does GameMasterCraft replace my campaign notes?',
      answer:
        'It can replace scattered notes, but it does not force you into one prep style. The goal is to give your campaign structure and memory while leaving room for your own creative process.',
    },
    {
      question: 'Does it use AI?',
      answer:
        'Yes, AI assistance can help with brainstorming, drafting, expanding, and organizing campaign material. The important distinction is that GameMasterCraft is built around your campaign workspace, not disconnected one-off prompts.',
    },
    {
      question: 'Can I use it with published adventures?',
      answer:
        'Yes. GameMasterCraft can help organize modified published adventures, added NPCs, changed locations, player consequences, custom factions, session recaps, and homebrew material layered on top of the adventure.',
    },
    {
      question: 'Is this for worldbuilding or session prep?',
      answer:
        'Both. GameMasterCraft is meant to connect worldbuilding and session prep so lore, NPCs, factions, and locations can actively support the next game session.',
    },
    {
      question: 'How is GameMasterCraft different from Virtual Combat Simulator?',
      answer:
        'GameMasterCraft is for campaign planning, worldbuilding, lore, NPCs, factions, locations, and session continuity. Virtual Combat Simulator is for running tactical tabletop combat with maps, tokens, initiative, and encounter flow.',
    },
    {
      question: 'How is GameMasterCraft different from SagaCraft?',
      answer:
        'GameMasterCraft is for tabletop RPG game masters preparing campaigns and sessions. SagaCraft is for fiction writers organizing novels, series, characters, chapters, timelines, and story continuity.',
    },
  ],
  gettingStarted: [
    'Create a campaign workspace and start with the core pieces: your setting, a few key NPCs, and the first location or faction that matters.',
    'Add session notes as you play. Capture what happened, what changed, and what threads were left open.',
    'Connect the pieces as the campaign grows. Let improvised characters, places, and events find a home in the workspace instead of disappearing between sessions.',
    'Use AI assistance when you want to move faster — to draft an NPC, expand a location, or turn rough notes into usable prep material.',
  ],
  commonUseCases: [
    'Running a long D&D campaign where the party has every NPC promise and faction grudge on file.',
    'Organizing a homebrew tabletop RPG world with custom factions, locations, lore, and a history the players are actively changing.',
    'Managing a West Marches-style game where different groups explore the same persistent world.',
    'Keeping a sandbox campaign coherent when players go off-script and create their own story directions.',
  ],
  scopeNotes: [
    'GameMasterCraft is a campaign planning and worldbuilding workspace for tabletop RPG game masters, not a generic notes tool.',
    'GameMasterCraft is strongest for long-running campaigns where continuity, recurring NPCs, faction politics, and session history matter.',
    'GameMasterCraft is AI-assisted, but the campaign structure, session memory, and world organization stand on their own whether or not you use the AI features.',
  ],
};
