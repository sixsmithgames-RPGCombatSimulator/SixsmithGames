import {
  HELP_TOPIC_TITLES,
  type HelpTopicSlug,
  type ProductDefinition,
} from '@/lib/productContent';

export interface HelpTopicContent {
  title: string;
  summary: string;
  paragraphs: string[];
  bullets: string[];
}

const productSpecificContent: Record<string, Record<HelpTopicSlug, Omit<HelpTopicContent, 'title'>>> = {
  'virtual-combat-simulator': {
    'getting-started': {
      summary: 'The fastest way to get started with Virtual Combat Simulator is to run one real encounter with it — not a test, an actual session fight.',
      paragraphs: [
        'Virtual Combat Simulator is built around D&D-style combat. If that is your group\'s encounter format, you can be useful with it in the first session. Set up a battle map, place tokens, open initiative, and let the tool handle combat tracking while you run the narrative.',
        'The biggest early mistake is overthinking setup. You do not need to import everything before your first encounter. Start with the map and tokens you need for the specific fight, get a feel for the initiative and hit point flow, and expand from there.',
        'For online and hybrid groups, the shared encounter view is the core win. Make sure your players know how to see the same battle state you are running. That single sync is where VCS pays off most immediately.',
      ],
      bullets: [
        'Open the browser app and load or create the battle map for your next encounter.',
        'Place tokens for the creatures and characters involved in the fight.',
        'Start initiative tracking from the encounter view so turn order and combat state stay visible to the whole table.',
        'Track hit points and conditions from the same view — no side spreadsheets.',
        'After your first encounter, decide whether the Game Master upgrade fits how often you run sessions.',
      ],
    },
    'core-features': {
      summary: 'Virtual Combat Simulator is built around the encounter layer: maps, tokens, initiative, hit points, conditions, and shared table state.',
      paragraphs: [
        'Every feature in Virtual Combat Simulator connects back to the same goal: keeping combat readable and fast for the game master and clear for the players. The product is not trying to manage your whole campaign. It is trying to make your next fight run cleanly.',
        'Token-linked hit points and conditions are the feature that matters most in long fights. When a creature\'s HP and conditions are tied directly to its token, the game master can update state in one place and the whole table stays synced.',
        'For hybrid and online groups, the shared table state feature is the most immediate win. Players who are remote can follow the same encounter view as players at the table without the game master having to narrate every position update.',
      ],
      bullets: [
        'Battle map encounter control: Upload or prepare the battle map, place tokens, and keep the battlefield readable at a glance.',
        'Initiative and encounter flow: Track initiative, turn order, and combat state without separate tools pulling attention from the table.',
        'Token-linked hit points and conditions: Keep token placement, hit points, and condition tracking in the same encounter view.',
        'Shared table state: Give online and hybrid players a shared combat view instead of a fragmented chain of screenshots and verbal corrections.',
        'Import-ready sheets and data: Keep character and monster information close to the encounter instead of hidden in another system.',
        'Game Master upgrade path: Start free, move to the paid GM tier when you need more storage and expanded capability.',
      ],
    },
    'common-use-cases': {
      summary: 'Virtual Combat Simulator fits best when the real problem is combat pacing, visibility, or tracking — not broad campaign management.',
      paragraphs: [
        'The clearest fit is any table where encounter tracking is the bottleneck. If players regularly wait while the GM finds a token, updates HP manually, or re-explains who acts next, VCS is built for exactly that situation.',
        'Online and hybrid groups get an additional benefit: a single shared encounter view that eliminates the "where is everyone?" question during combat. That is harder to replicate with a map in one tool, initiative in another, and HP in a spreadsheet.',
        'Boss fights and complex set-piece encounters are where VCS earns repeat use. When there are many tokens, layered conditions, and multiple players tracking different things, having one coherent encounter view keeps the fight from collapsing under its own bookkeeping.',
      ],
      bullets: [
        'Running faster D&D combats online when the group needs maps, tokens, initiative, and hit points in one place.',
        'Managing hybrid combats where some players are remote and everyone needs the same encounter view.',
        'Handling boss fights or set-piece encounters where conditions, movement, and turn order can become hard to track verbally.',
        'Keeping combat clear in rules-heavy sessions while leaving story, rulings, and narrative pacing to the GM.',
      ],
    },
    'current-scope': {
      summary: 'Virtual Combat Simulator is a combat management tool, not a full virtual tabletop. Understanding the difference helps you use it well.',
      paragraphs: [
        'Virtual Combat Simulator is focused on the encounter layer. It is built to run combat — battle maps, tokens, initiative, hit points, conditions, and turn flow. It is not trying to manage your campaign journal, character creation, world lore, or session history.',
        'If you need broad campaign management, character sheets, handouts, or a general-purpose session tool, VCS is not that product. It is narrower by design. That focus is what makes it faster and cleaner for combat specifically.',
        'The free tier covers the core encounter use case. The Game Master paid tier adds more storage and expanded GM capability. Gravity and ContentCraft are not inside VCS — they are separate products with separate purposes.',
      ],
      bullets: [
        'Virtual Combat Simulator is a D&D-adjacent combat simulator, not a general-purpose virtual tabletop.',
        'The product does not try to replace campaign management, character creation, or world-building tools.',
        'Free access covers the core combat tracking use case; the paid tier adds GM-oriented storage and capability.',
        'The product works best for D&D-style encounters — other tabletop systems may vary in fit.',
        'Online and hybrid play are supported through shared encounter state, not through full video or voice integration.',
      ],
    },
    'pricing-and-accounts': {
      summary: 'Virtual Combat Simulator is free to start. The Game Master subscription adds storage and expanded GM tools for groups that run encounters regularly.',
      paragraphs: [
        'The core combat management tool is free for signed-in users. You can set up maps, place tokens, run initiative, track hit points and conditions, and keep the table synced without paying anything.',
        'The Game Master plan at $9.99 per month adds more encounter storage and expanded GM capability for game masters who run sessions frequently and want more headroom. Try the free tier first, then decide whether the upgrade fits your session cadence.',
        'For account questions, billing, or anything related to subscriptions, use the support page. The pricing page has the full comparison of what each tier includes.',
      ],
      bullets: [
        `Pricing page: /pricing#virtual-combat-simulator`,
        `Product page: /apps/virtual-combat-simulator`,
        `Help landing: /help/virtual-combat-simulator`,
        `Support: /support`,
      ],
    },
  },

  'contentcraft': {
    'getting-started': {
      summary: 'Start ContentCraft by defining the project you are actually building — not a test project, the real one.',
      paragraphs: [
        'ContentCraft is built for projects with continuity demands: campaigns, novels, settings, and creative work where characters, factions, timelines, and lore need to stay connected over time. The faster you ground your first session in your actual project, the more useful the tool becomes.',
        'The first step is defining your project scope. Is it a campaign, a setting, a novel, a series? That frame shapes how you organize the canon library. Add the core assets that your project must remember: key characters, important factions, locations that recur, timeline anchors, and rules the world must follow.',
        'Do not try to import everything at once. Start with the canon that already exists — the details you are already re-checking across notes and documents — and build from there. ContentCraft becomes more useful the more coherent your canon library is.',
      ],
      bullets: [
        'Define the project you are actually building — campaign, setting, novel, or series.',
        'Add core canon assets first: key characters, factions, locations, timeline events, and world rules.',
        'Connect related entries so relationships between people, places, and plot elements are visible.',
        'Begin drafting from the canon base instead of starting with generation and adding organization afterward.',
        'Subscribe to unlock the full workspace when you are ready to move the project in.',
      ],
    },
    'core-features': {
      summary: 'ContentCraft keeps lore organization, canon tracking, and AI-assisted drafting in one workspace so projects can grow without losing coherence.',
      paragraphs: [
        'The canon library is the foundation. Characters, factions, locations, items, arcs, and timeline entries all live in the same organized space and can reference each other. That relationship layer is what separates ContentCraft from a generic notes folder.',
        'AI-assisted drafting is built into the workspace, but the canon is what makes it useful. When the AI has access to the project\'s established lore, new material can be generated with the world\'s rules already in scope. The writer controls what the AI sees, and reviews the output before treating it as settled.',
        'The review workflow matters as much as the drafting. ContentCraft is designed for projects where you want to check new material against the existing canon before it becomes part of the project. That review step is how continuity drift gets caught before it spreads.',
      ],
      bullets: [
        'Projects and shared library: Keep campaigns, settings, chapters, and supporting canon in one workspace instead of splitting them across unrelated tools.',
        'Canon and continuity tracking: Track characters, locations, items, factions, arcs, timelines, and references so story details stay consistent over time.',
        'Draft in deliberate steps: Move from outline to draft to review at your own pace instead of turning the whole project over to one blind prompt.',
        'Relationship mapping: Keep people, places, groups, and plot threads connected so the world reads like a system instead of a pile of notes.',
        'Catch contradictions early: Review new material against the existing canon before it becomes settled so inconsistencies get caught while they are still easy to fix.',
        'Export without losing history: Preserve history and diffs alongside export-ready outputs so context does not disappear every time material leaves the workspace.',
      ],
    },
    'common-use-cases': {
      summary: 'ContentCraft is strongest when the project has real lore, real relationships, and content that needs to stay connected as it grows.',
      paragraphs: [
        'The clearest fit is any project where the creator is already re-checking old material to avoid contradictions. If you have a folder of notes you trust less and less as the project grows, that is exactly the problem ContentCraft is built to address.',
        'Game masters who run recurring NPCs, growing factions, and location-based campaign content are a natural fit. The tool remembers the relationships and canon the GM needs for session prep without requiring a separate wiki or reference doc.',
        'Writers and novelists with multiple chapters, series entries, or a shared setting benefit from the organizational layer even when they are not using AI drafting. The canon library alone reduces the friction of returning to established material.',
      ],
      bullets: [
        'Keeping lore consistent across a long campaign, novel, or multi-part story project.',
        'Organizing NPCs, factions, locations, and campaign content for game master prep.',
        'Managing story organization for a long-form writing project with repeated references and interlocking canon.',
        'Building a reusable world library that can support future chapters, sessions, supplements, or spin-off material.',
      ],
    },
    'current-scope': {
      summary: 'ContentCraft is a writing and worldbuilding tool for projects with continuity demands — not generic productivity software.',
      paragraphs: [
        'ContentCraft is built for story-rich work: campaigns, novels, settings, and creative projects where characters, factions, timelines, and canon details need to stay aligned. It is not a general-purpose notes app, a document editor, or a project management tool for non-creative work.',
        'The AI features are built into the workspace, but they are part of a larger tool. The canon library, project organization, and review flow are the foundation. The AI assists within that structure. You can use ContentCraft without using the AI features at all.',
        'ContentCraft requires a subscription from the start — there is no free tier. The subscription covers the full workspace: lore organization, canon tracking, AI-assisted drafting, and the review workflow together.',
      ],
      bullets: [
        'ContentCraft is a writing tool and worldbuilding workspace, not generic office productivity software.',
        'ContentCraft is strongest when the project has real continuity demands: repeated references, expanding lore, shared canon, or linked creative assets.',
        'ContentCraft is AI-assisted, but the canon, review, and project-organization layers stand on their own whether or not you use the AI features.',
        'A subscription is required from the start — there is no free tier or trial period.',
        'The tool is built for writers, novelists, worldbuilders, and game masters — not for general knowledge management or office work.',
      ],
    },
    'pricing-and-accounts': {
      summary: 'ContentCraft is $9.99 per month or $99 per year. The subscription covers the full workspace — there is no free tier.',
      paragraphs: [
        'ContentCraft is the one product in the Sixsmith Games lineup that requires a subscription before you can access it. The subscription covers everything: the canon library, project organization, AI-assisted drafting, review workflow, and export. There is no free version.',
        'The annual plan at $99 per year saves roughly two months compared to the monthly rate. Built-in AI usage is included in the subscription. If you use AI features heavily, additional usage can be handled through bring-your-own or purchased credits.',
        'For account questions, billing changes, or cancellations, use the support page. The pricing page has the full breakdown of what is included at each level.',
      ],
      bullets: [
        `Pricing page: /pricing#contentcraft`,
        `Product page: /apps/contentcraft`,
        `Help landing: /help/contentcraft`,
        `Support: /support`,
      ],
    },
  },

  'fourstargeneral': {
    'getting-started': {
      summary: 'Start Four Star General by launching the tactical core and playing through a scenario — the rules model becomes clear through play, not reading.',
      paragraphs: [
        'Four Star General is a deterministic tactical strategy game. The mechanics are meant to be legible, so the best way to understand them is to play a scenario and watch how deployment, reserves, supply, and objectives interact. Start with the tactical battle layer before diving into any supplemental content.',
        'Set the expectation before your first session: this is a serious WWII strategy game, not an arcade action title. Battlefield outcomes follow from command decisions, not randomness. If a position collapses, there is a reason traceable back to your choices.',
        'Mission profiles are the structure that makes decisions matter. Each scenario gives you objectives, timing, and terrain that force harder choices than simple unit trading. Read the mission profile before committing your deployment — that context shapes everything.',
      ],
      bullets: [
        'Launch the browser build and open a scenario from the tactical core.',
        'Read the mission profile before deploying — objectives, terrain, and timing shape every decision.',
        'Deploy with reserves and supply in mind, not just immediate engagement strength.',
        'Play through the resolution and trace the outcome back to the command decisions that created it.',
        'If the tactical core fits you, check the pricing page for scenario and content expansions.',
      ],
    },
    'core-features': {
      summary: 'Four Star General is built around deterministic tactics, mission profiles, supply, reserves, and command decisions that have traceable consequences.',
      paragraphs: [
        'Deterministic resolution is the defining feature. When the battle resolves, the outcome follows from the rules model and your choices — not hidden randomness. That makes Four Star General a game you can study, improve at, and replay with different approaches.',
        'Supply and reserves are not cosmetic. Supply affects how long a position can hold and when a player can press or must pull back. Reserves force commitment questions: do you hold a force back for when the line bends, or commit early and risk having no answer later?',
        'Mission profiles add the time and objective pressure that makes those supply and reserve decisions hard. A scenario is not just "defeat the enemy." It is "hold this crossing until turn eight" or "break the line before reinforcements arrive." That structure is what creates replayable tactical tension.',
      ],
      bullets: [
        'Deterministic tactical resolution: Battlefield outcomes follow visible rules and command decisions instead of hidden randomness.',
        'Mission profiles and scenario structure: Authored scenarios with specific objectives, timing, and terrain that force harder decisions than simple unit trading.',
        'Supply and logistics: Track supply posture so that holding, pressing, or withdrawing has real costs over time.',
        'Reserve management: Decide when to commit reserves and when to hold them — timing those decisions is a core part of the command model.',
        'Unit deployment and positioning: Deployment choices before the battle starts shape the entire engagement.',
        'Expandable content: The free tactical core includes the base scenarios; the paid content tier adds more scenarios, units, and authored campaign content.',
      ],
    },
    'common-use-cases': {
      summary: 'Four Star General fits players who want command decisions that matter, not spectacle — and who want outcomes they can learn from.',
      paragraphs: [
        'The clearest fit is players who already care about serious WWII tactical strategy and want a browser-based implementation that respects the genre. If you have played wargames and found most browser options too shallow, Four Star General is designed specifically to address that gap.',
        'Replay value is a strong fit. Because resolution is deterministic and scenarios are authored, you can replay the same scenario with different deployment and reserve choices and trace how the outcome changes. That makes each scenario a practice problem, not just a one-time experience.',
        'The free tactical core is a good fit for players who want to evaluate whether the command model works for them before committing to paid content. Try the base scenarios and see whether the resolution system and mission structure feel right.',
      ],
      bullets: [
        'Playing through authored WWII tactical scenarios with a serious command model.',
        'Studying deterministic battlefield outcomes to improve reserve timing, deployment, and supply management.',
        'Replaying scenarios with different approaches to see how command decisions change outcomes.',
        'Evaluating the tactical core before deciding whether paid scenario and content expansions are worth it.',
      ],
    },
    'current-scope': {
      summary: 'Four Star General is a serious WWII tactical strategy game, not an arcade action title. The free tier includes the tactical core; paid content adds more scenarios.',
      paragraphs: [
        'Four Star General is built for players who want deterministic tactics, meaningful command decisions, and authored scenarios. It is not built for players who want fast action, cinematic spectacle, or a general-purpose strategy sandbox.',
        'The free tactical core gives access to the base scenarios, the resolution system, and the full command model. Paid content unlocks additional scenarios, units, and authored campaign content — it expands what is playable, not what the base game does.',
        'Four Star General is browser-based and designed around WWII-era tactical scenarios. It is not a real-time strategy game and not trying to compete with large-budget wargame titles on graphical or audiovisual terms. The value is in the command model and scenario depth.',
      ],
      bullets: [
        'Four Star General is a serious deterministic WWII tactical strategy game, not an arcade title.',
        'The free tier includes the tactical core — base scenarios, resolution system, and command model.',
        'Paid content adds more scenarios, units, and authored campaign material.',
        'The game is browser-based and does not require a download or installation.',
        'The product is built for WWII tactical strategy players specifically, not for general strategy gaming audiences.',
      ],
    },
    'pricing-and-accounts': {
      summary: 'Four Star General is free to play the tactical core. The paid tier at $1.99 per month unlocks more scenarios and content.',
      paragraphs: [
        'The base tactical core is free to access. You can play scenarios, learn the command model, and experience deterministic resolution without paying anything. The paid content tier at $1.99 per month unlocks additional scenarios, units, and authored campaign content.',
        'The paid layer adds more to play, not access to start. The free core is not a trial with paywalled mechanics — it is a complete tactical experience. The paid tier expands the library of content you can play through.',
        'For account or billing questions, use the support page. The pricing page has the current breakdown of what each tier includes.',
      ],
      bullets: [
        `Pricing page: /pricing#fourstargeneral`,
        `Product page: /apps/fourstargeneral`,
        `Help landing: /help/fourstargeneral`,
        `Support: /support`,
      ],
    },
  },

  'mastertyping': {
    'getting-started': {
      summary: 'The best first move in MasterTyping is an assessment — it tells you where your weak spots actually are instead of having you practice blindly.',
      paragraphs: [
        'MasterTyping is built around a real skill-building loop: assess your weak areas, practice them through targeted exercises or Pro mode, and keep the repetition sustainable through game mode and progression. That loop only works if you start with the assessment.',
        'Most people skip the assessment and jump into game mode first. That is fine for initial exploration, but you will get better results faster if you let the assessment identify the specific patterns, fingers, or accuracy gaps that need work. Then you have a clearer target.',
        'The core practice loop is free. Assessments, drills, exercises, and game mode are all available without subscribing. The premium layer adds extended history and deeper tracking — useful if you want to review progress over weeks or months, not just recent sessions.',
      ],
      bullets: [
        'Open the app and start with the assessment to identify weak patterns, fingers, or speed gaps.',
        'Use exercise mode or Pro mode to practice the specific areas surfaced by the assessment.',
        'Switch to game mode to keep repetition sustainable when focused drills start to feel monotonous.',
        'Check progress tracking regularly to see whether the practice is moving the right numbers.',
        'If you want extended history and deeper review, check the premium tier at $1.99 per month.',
      ],
    },
    'core-features': {
      summary: 'MasterTyping combines assessment, targeted exercises, Pro mode, and game mode so that practice is both useful and sustainable.',
      paragraphs: [
        'Assessment mode is where improvement starts. It identifies the weak spots in your typing — specific fingers, key combinations, or accuracy patterns — so that subsequent practice sessions have a clear target instead of practicing everything equally.',
        'Exercise mode and Pro mode are where the actual skill work happens. Exercises are targeted at the patterns the assessment surfaces. Pro mode is stricter and more demanding, designed for sessions where you want direct speed-and-accuracy training without game-layer distraction.',
        'Game mode is the sustainability layer. It uses characters, themed prompts, light progression, and game-like rewards to make returning to practice easier. The key is that game mode is paired with real skill structure — it is not just entertainment for its own sake.',
      ],
      bullets: [
        'Assessment mode: Structured assessment to identify weak spots instead of guessing what kind of practice to do next.',
        'Exercise mode: Targeted exercises that focus on the specific patterns or skill gaps surfaced by the assessment.',
        'Pro mode: A stricter, skill-focused mode for direct speed-and-accuracy training without game-layer distraction.',
        'Game mode: Characters, themed prompts, light progression, and game-like rewards to make repeated practice easier to sustain.',
        'Progress tracking: Review recent performance and mode-level progress so practice feels cumulative instead of disposable.',
        'Premium layer: Extended history and deeper tracking for users who want long-term progress review.',
      ],
    },
    'common-use-cases': {
      summary: 'MasterTyping fits best when the goal is real, measurable typing improvement — not casual play or a one-time test.',
      paragraphs: [
        'Daily practice is the strongest use case. The assessment-to-exercise loop works best when you return to it consistently. Game mode is designed specifically to make that daily return easier — not because it is more fun than work, but because it gives each session a reason to continue.',
        'Adults who want practical typing improvement without a childish interface are a strong fit. The product is not a kids-only typing toy. It respects the user\'s time and treats the skill seriously while still making repetition sustainable through game-like progression.',
        'Students, writers, developers, and gamers who spend significant time on a keyboard often have specific weak patterns — particular key combinations or fingers they compensate around. The assessment identifies those gaps specifically, which makes the practice more efficient than generic drills.',
      ],
      bullets: [
        'Daily typing practice for adults who want improvement without childish presentation.',
        'Skill building for students, writers, developers, or gamers who spend real time on a keyboard.',
        'Alternating between structured drills and game-like progression to make practice consistent enough to last.',
        'Using assessments to find weak patterns before deciding what typing work to do next.',
      ],
    },
    'current-scope': {
      summary: 'MasterTyping is a typing practice app, not a typing test site or a full educational suite. The free core covers the practice loop; premium adds history.',
      paragraphs: [
        'MasterTyping is built for skill-building through repeated, structured practice. It is not a one-time speed test site, not a children\'s educational game, and not a full learning management system. It is a focused typing practice tool for people who want to get better and keep practicing.',
        'The core practice loop — assessments, exercises, Pro mode, game mode, and progress tracking — is free. The premium tier at $1.99 per month adds extended history and deeper tracking. It does not lock the basic practice loop behind a paywall.',
        'MasterTyping is browser-based and does not require a download. It is designed for repeat use, not a one-time visit. The improvement loop requires consistent practice, and the product is built to support that.',
      ],
      bullets: [
        'MasterTyping is a typing practice app and skill-building trainer, not a typing speed test or one-time benchmark tool.',
        'The free core includes assessments, exercises, Pro mode, game mode, and basic progress tracking.',
        'The premium layer adds extended history and deeper tracking, not access to the basic practice loop.',
        'MasterTyping works best with consistent daily or near-daily practice, not occasional sessions.',
        'The product is browser-based — no download required.',
      ],
    },
    'pricing-and-accounts': {
      summary: 'MasterTyping is free to use for core practice. The $1.99 per month premium layer adds extended history and deeper tracking.',
      paragraphs: [
        'The full practice loop — assessments, exercise mode, Pro mode, game mode, and progress tracking — is free. You do not need to pay to use the core product. The premium layer at $1.99 per month adds extended history and deeper tracking for users who want long-term progress review.',
        'The premium tier is designed for users who have already built a practice habit and want more visibility into progress over time. It is not necessary to start and it is not required for real improvement. Build the habit first, then decide if extended tracking is worth it.',
        'For account or billing questions, use the support page. The pricing page has the full breakdown.',
      ],
      bullets: [
        `Pricing page: /pricing#mastertyping`,
        `Product page: /apps/mastertyping`,
        `Help landing: /help/mastertyping`,
        `Support: /support`,
      ],
    },
  },
};

export function getHelpTopicContent(product: ProductDefinition, topic: HelpTopicSlug): HelpTopicContent {
  const specific = productSpecificContent[product.slug]?.[topic];

  if (specific) {
    return {
      title: `${HELP_TOPIC_TITLES[topic]} — ${product.name}`,
      ...specific,
    };
  }

  switch (topic) {
    case 'getting-started':
      return {
        title: `Getting started with ${product.name}`,
        summary: `${product.name} works best when the first session is tied to the real job the product is meant to do.`,
        paragraphs: [
          `Start from a real use case rather than generic exploration. Begin with the problem the product is meant to solve for ${product.primaryAudience.toLowerCase()}.`,
        ],
        bullets: product.gettingStarted,
      };
    case 'core-features':
      return {
        title: `Core features in ${product.name}`,
        summary: `${product.name} has a specific feature set built around its core audience and use cases.`,
        paragraphs: [
          `The features below explain what ${product.name} actually does and how each one fits the product's intended purpose.`,
        ],
        bullets: product.keyFeatures.map((feature) => `${feature.title}: ${feature.description}`),
      };
    case 'common-use-cases':
      return {
        title: `Common use cases for ${product.name}`,
        summary: `${product.name} is intentionally built for a specific audience. The use cases below show where it is strongest.`,
        paragraphs: [
          `${product.name} is built for ${product.primaryAudience.toLowerCase()}. The situations below represent the strongest fits.`,
        ],
        bullets: product.commonUseCases,
      };
    case 'current-scope':
      return {
        title: `Current scope of ${product.name}`,
        summary: `Know what ${product.name} is and what it is not before you start using it.`,
        paragraphs: [
          `The scope notes below describe the current build and boundaries so your expectations stay accurate.`,
        ],
        bullets: product.scopeNotes,
      };
    case 'pricing-and-accounts':
      return {
        title: `Pricing and accounts for ${product.name}`,
        summary: `${product.name} has a specific pricing and access setup. This page explains it clearly.`,
        paragraphs: [
          `${product.pricingModel}.`,
          `${product.availability}.`,
          `For account questions or next steps, use the pricing page, the product page, and the support page.`,
        ],
        bullets: [
          `Pricing page: ${product.pricingPath}`,
          `Product page: ${product.officialPath}`,
          `Help landing: ${product.helpPath}`,
          `Support: ${product.supportPath}`,
        ],
      };
  }
}
