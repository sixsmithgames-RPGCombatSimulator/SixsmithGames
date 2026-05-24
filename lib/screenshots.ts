/**
 * Screenshot Registry
 * 
 * Central registry for all product screenshots hosted on Cloudinary.
 * Each image includes SEO-optimized metadata: descriptive filename, alt text, caption.
 * 
 * URL Pattern: https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto,w_1400/sixsmith-games/{app}/{filename}
 * 
 * f_auto = auto format (WebP on supported browsers)
 * q_auto = auto quality optimization
 * w_1400 = 1400px width (good for product pages)
 */

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export const productScreenshots = {
  contentCraft: [
    {
      src: getCloudinaryUrl('contentcraft', 'contentcraft-project-dashboard-worldbuilding-writing-workspace.jpg'),
      alt: 'ContentCraft project dashboard showing a worldbuilding and writing workspace for characters, lore, notes, and continuity planning',
      caption: 'Start from a project dashboard built for writers and worldbuilders who need one place for lore, drafts, and continuity.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('contentcraft', 'contentcraft-ai-generator-generated-content-canon-writing-workflow.jpg'),
      alt: 'ContentCraft project screen showing AI-generated content cards, canon check status, and writing workflow controls',
      caption: 'Review generated drafts beside project context so new material stays tied to the canon you already established.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('contentcraft', 'contentcraft-canon-library-characters-factions-locations.jpg'),
      alt: 'ContentCraft canon library showing linked characters, factions, locations, and timeline entries for a creative writing project',
      caption: 'Keep people, places, factions, and timeline events in a searchable canon library instead of scattered notes.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('contentcraft', 'contentcraft-timeline-lore-story-continuity-planning.jpg'),
      alt: 'ContentCraft timeline screen showing story continuity planning for a worldbuilding project',
      caption: 'Track major lore events in sequence so the project keeps its internal logic as it grows.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('contentcraft', 'contentcraft-draft-notes-editor-worldbuilding-session-notes.jpg'),
      alt: 'ContentCraft draft notes screen showing project notes for revision questions and worldbuilding continuity',
      caption: 'Use draft notes to park revision questions, worldbuilding reminders, and continuity checks without leaving the workspace.',
      width: 1400,
      height: 900,
    },
  ] as Screenshot[],

  fourStarGeneral: [
    {
      src: getCloudinaryUrl('fourstargeneral', 'four-star-general-war-room-command-roster-mission-selection.jpg'),
      alt: 'Four Star General war room showing command roster, mission selection, operation briefings, and commander status',
      caption: 'Choose a commander and mission from the war room before committing forces to a WWII tactical operation.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('fourstargeneral', 'four-star-general-mission-briefing-objectives-campaign-map.jpg'),
      alt: 'Four Star General mission briefing screen showing town defense objectives, time limit, command notes, and theater overview',
      caption: 'Read mission objectives, time pressure, and command notes before deciding how to spend requisition points.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('fourstargeneral', 'four-star-general-requisition-supply-management-wwii-strategy.jpg'),
      alt: 'Four Star General requisition screen showing unit allocation, supply budget, and WWII force composition choices',
      caption: 'Build the force you need with visible requisition costs, supply limits, and battlefield roles.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('fourstargeneral', 'four-star-general-deployment-zone-combined-arms-wwii-wargame.jpg'),
      alt: 'Four Star General deployment screen showing base camp placement, combined arms units, and town perimeter deployment capacity',
      caption: 'Place your base camp and deploy combined arms forces before the battle clock starts.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('fourstargeneral', 'four-star-general-tactical-combat-wwii-hex-strategy-map.jpg'),
      alt: 'Four Star General tactical combat screen showing deployed WWII units on a town defense hex battlefield with terrain and activity log',
      caption: 'Command the battle on a readable WWII hex map where terrain, reserves, and supply decisions stay visible.',
      width: 1400,
      height: 900,
    },
  ] as Screenshot[],

  virtualCombatSimulator: [
    {
      src: getCloudinaryUrl('vcs', 'virtual-combat-simulator-battle-room-map-tokens-initiative-dnd-combat-tracker.jpg'),
      alt: 'Virtual Combat Simulator battle room showing D&D combat map, tokens, initiative tracker, action panel, and shared encounter controls',
      caption: 'Run the whole fight from one battle room: map, tokens, initiative, HP, conditions, and turn flow.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('vcs', 'virtual-combat-simulator-gm-battle-map-layers-fog-grid-tools.jpg'),
      alt: 'Virtual Combat Simulator game master battle map with layer controls, fog tool, measurement tool, grid controls, and token toolbar',
      caption: 'Prep and run the battlefield with map layers, fog, measurement, grid snapping, and token tools in reach.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('vcs', 'virtual-combat-simulator-initiative-turn-tracker-hp-conditions.jpg'),
      alt: 'Virtual Combat Simulator initiative tracker showing active combatants, hit points, conditions, turn order, and combat log panel',
      caption: 'Keep initiative, hit points, conditions, and combat updates tied to the same encounter view.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('vcs', 'virtual-combat-simulator-token-character-sheet-actions-spells.jpg'),
      alt: 'Virtual Combat Simulator token character sheet panel showing ability scores, armor class, hit points, speed, and action controls',
      caption: 'Open token-linked character details when stats, actions, and survivability matter right now.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('vcs', 'virtual-combat-simulator-player-shared-combat-view-online-rpg.jpg'),
      alt: 'Virtual Combat Simulator player view showing shared online RPG combat map with visible player token and restricted game master controls',
      caption: 'Give remote players a synchronized combat view without sending map screenshots around.',
      width: 1400,
      height: 900,
    },
  ] as Screenshot[],

  gameMasterCraft: [
    {
      src: getCloudinaryUrl('gamemastercraft', 'gamemastercraft-campaign-dashboard-npcs-factions-locations-session-notes.jpg'),
      alt: 'GameMasterCraft campaign dashboard showing a tabletop RPG campaign workspace for NPCs, factions, locations, and session notes',
      caption: 'Start each campaign from a dashboard organized around the material game masters actually reuse.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('gamemastercraft', 'gamemastercraft-generated-content-npc-encounter-session-workflow.jpg'),
      alt: 'GameMasterCraft campaign screen showing generated NPC and encounter content beside canon check and session workflow controls',
      caption: 'Generate NPCs, encounters, and prep material while keeping the campaign canon close enough to review.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('gamemastercraft', 'gamemastercraft-campaign-canon-library-npcs-factions-locations.jpg'),
      alt: 'GameMasterCraft canon library showing campaign NPCs, factions, locations, and linked lore for tabletop RPG prep',
      caption: 'Keep NPCs, factions, clues, and locations linked so session prep builds on past consequences.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('gamemastercraft', 'gamemastercraft-campaign-timeline-session-events-consequences.jpg'),
      alt: 'GameMasterCraft timeline screen showing upcoming session events and campaign consequences for a tabletop RPG',
      caption: 'Track session beats and player consequences in a campaign timeline you can return to before the next game.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('gamemastercraft', 'gamemastercraft-session-recap-hooks-next-session-prep.jpg'),
      alt: 'GameMasterCraft session notes screen showing recap notes, next session hooks, and tabletop RPG preparation prompts',
      caption: 'Turn recaps, loose hooks, and next-session reminders into usable prep instead of buried notes.',
      width: 1400,
      height: 900,
    },
  ] as Screenshot[],

  sagaCraft: [
    {
      src: getCloudinaryUrl('sagacraft', 'sagacraft-story-dashboard-characters-chapters-plots-timeline.jpg'),
      alt: 'SagaCraft story dashboard showing a novel writing workspace for characters, chapters, plot threads, and timeline planning',
      caption: 'Start from a story dashboard that treats characters, chapters, plot threads, and continuity as one writing system.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('sagacraft', 'sagacraft-generated-content-character-arc-revision-workflow.jpg'),
      alt: 'SagaCraft project screen showing generated character arc and revision content for a novel writing workflow',
      caption: 'Use generated revision and character-arc material as project-aware drafts, not disconnected one-off prompts.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('sagacraft', 'sagacraft-story-canon-library-characters-settings-lore.jpg'),
      alt: 'SagaCraft canon library showing novel characters, settings, factions, lore, and chapter timeline entries',
      caption: 'Keep characters, settings, factions, and lore searchable so story continuity survives revision.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('sagacraft', 'sagacraft-timeline-lore-settings-novel-continuity.jpg'),
      alt: 'SagaCraft timeline screen showing chapter beats and novel continuity planning for fiction writers',
      caption: 'Map chapter beats and lore events in order so the story escalates cleanly instead of drifting.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('sagacraft', 'sagacraft-revision-canon-check-story-continuity.jpg'),
      alt: 'SagaCraft draft notes screen showing revision questions and story continuity reminders for a fiction project',
      caption: 'Capture revision questions beside the story bible so continuity checks stay part of the writing rhythm.',
      width: 1400,
      height: 900,
    },
  ] as Screenshot[],

  masterTyping: [
    {
      src: getCloudinaryUrl('mastertyping', 'mastertyping-dashboard-assessment-practice-game-modes.jpg'),
      alt: 'MasterTyping dashboard showing quick baseline, game mode, writing practice, gaming chat, school study, and general improvement options',
      caption: 'Choose a typing goal first so practice starts with the kind of keyboard work you actually want to improve.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('mastertyping', 'mastertyping-quick-baseline-typing-assessment-wpm-accuracy.jpg'),
      alt: 'MasterTyping quick baseline assessment screen for measuring typing speed, accuracy, and consistency',
      caption: 'Measure speed, accuracy, and consistency before guessing which typing drill should come next.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('mastertyping', 'mastertyping-assessment-results-weak-keys-recommendations.jpg'),
      alt: 'MasterTyping progress dashboard showing WPM trend, accuracy trend, weak area, recent activity, and recommended key drill',
      caption: 'Turn assessment results into a clear next step with weak-key recommendations and recent progress history.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('mastertyping', 'mastertyping-pro-mode-focused-typing-practice-speed-accuracy.jpg'),
      alt: 'MasterTyping Pro Mode screen showing focused typing practice with WPM, accuracy, time, and mistake tracking',
      caption: 'Use Pro Mode when you want direct, focused speed-and-accuracy practice without extra ceremony.',
      width: 1400,
      height: 900,
    },
    {
      src: getCloudinaryUrl('mastertyping', 'mastertyping-game-mode-typing-arena-progress-combo.jpg'),
      alt: 'MasterTyping game mode setup screen showing pressure levels, word sets, and typing practice game configuration',
      caption: 'Set the word level and pressure before game mode turns repetition into something easier to come back to.',
      width: 1400,
      height: 900,
    },
  ] as Screenshot[],

  gravity: [] as Screenshot[],
};

const productScreenshotKeys = {
  contentcraft: 'contentCraft',
  fourstargeneral: 'fourStarGeneral',
  gamemastercraft: 'gameMasterCraft',
  gravity: 'gravity',
  mastertyping: 'masterTyping',
  sagacraft: 'sagaCraft',
  'virtual-combat-simulator': 'virtualCombatSimulator',
} as const;

export type ScreenshotProductSlug = keyof typeof productScreenshotKeys;

export function getProductScreenshots(slug: ScreenshotProductSlug): Screenshot[] {
  return productScreenshots[productScreenshotKeys[slug]];
}

/**
 * Helper to get Cloudinary URL with transformations
 */
export function getCloudinaryUrl(
  app: string,
  filename: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'limit';
  } = {}
): string {
  const {
    width = 1400,
    quality = 'auto',
    format = 'auto',
  } = options;

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    width ? `w_${width}` : null,
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/dxz6khmew/image/upload/${transforms}/sixsmith-games/${app}/${filename}`;
}
