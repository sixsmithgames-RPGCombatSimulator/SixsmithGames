const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const OUTPUT_ROOT = 'C:\\SixsmithGames\\screenshots';
const VIEWPORT = { width: 1400, height: 900 };
const now = '2026-05-24T12:00:00.000Z';

const products = {
  contentcraft: {
    project: {
      id: 'contentcraft-demo',
      title: 'The Ashen Archive',
      description: 'Series bible for a shared fantasy world with characters, factions, locations, draft notes, and continuity checks.',
      type: 'fiction',
      status: 'in-progress',
      productKey: 'contentcraft',
      createdAt: now,
      updatedAt: now,
    },
    blocks: [
      block('cc-b1', 'contentcraft-demo', 'Chapter 7 Continuity Notes', 'Elara learns the archive key was forged by the same order that erased the moon records.', 'chapter', { domain: 'writing', writing_status: 'revised', writing_tags: ['continuity', 'chapter'] }),
      block('cc-b2', 'contentcraft-demo', 'Veyr Lantern District', 'A canal market where ink-mages trade memories for favors.', 'location', { domain: 'worldbuilding' }),
      block('cc-b3', 'contentcraft-demo', 'Null Moon Pact', 'Secret order that manages erased lunar history.', 'fact', { domain: 'worldbuilding' }),
      block('cc-b4', 'contentcraft-demo', 'Revision Parking Lot', 'Check whether the moon archive date still matches the new Lantern District opening scene.', 'text', { domain: 'notes' }),
    ],
    generated: [
      generated('cc-g1', 'contentcraft-demo', 'Lantern District Location Draft', 'location', 'Location', 'A glowing canal district full of memory brokers and hidden archive doors.'),
      generated('cc-g2', 'contentcraft-demo', 'Memory Broker NPC', 'character', 'NPC', 'A careful broker who trades true names for impossible favors.'),
    ],
    entities: [
      entity('cc-e1', 'Elara Vale', 'npc', 'Archivist protagonist with a missing year in her memory.', ['protagonist', 'archive']),
      entity('cc-e2', 'Lantern District', 'location', 'Canal market and memory exchange.', ['city', 'setting']),
      entity('cc-e3', 'The Null Moon Pact', 'faction', 'Secret order managing erased lunar history.', ['faction', 'secret']),
      entity('cc-e4', 'Night of the Silent Tide', 'timeline', 'The river stopped moving and everyone forgot one witness.', ['timeline']),
    ],
  },
  gamemastercraft: {
    project: {
      id: 'gamemastercraft-demo',
      title: 'Shadows Over Briarwatch',
      description: 'Campaign hub for NPCs, factions, towns, clues, session notes, and player-driven consequences.',
      type: 'dnd-adventure',
      status: 'in-progress',
      productKey: 'gamemastercraft',
      createdAt: now,
      updatedAt: now,
    },
    blocks: [
      block('gm-b1', 'gamemastercraft-demo', 'Session 12 Recap', 'The party spared Captain Voss, angering the Thorn Court and giving the Watch a fragile informant.', 'text', { domain: 'notes', writing_status: 'draft', writing_tags: ['recap', 'consequences'] }),
      block('gm-b2', 'gamemastercraft-demo', 'Captain Voss', 'A tired militia captain hiding the cult route under the old aqueduct.', 'character', { domain: 'rpg' }),
      block('gm-b3', 'gamemastercraft-demo', 'The Thorn Court', 'Fey-backed faction using debt, favors, and masks to control the city.', 'fact', { domain: 'rpg' }),
      block('gm-b4', 'gamemastercraft-demo', 'Next Session Hooks', 'Open at the east gate, reveal the masked envoy, and let the players decide whether Voss is protected or exposed.', 'text', { domain: 'notes' }),
    ],
    generated: [
      generated('gm-g1', 'gamemastercraft-demo', 'Captain Voss NPC Sheet', 'character', 'NPC', 'A conflicted militia captain with motives, secrets, and combat notes.'),
      generated('gm-g2', 'gamemastercraft-demo', 'Aqueduct Ambush Encounter', 'encounter', 'Encounter', 'A layered encounter with terrain, clues, and reinforcements.'),
    ],
    entities: [
      entity('gm-e1', 'Captain Voss', 'npc', 'Militia captain, compromised informant, and possible ally.', ['npc', 'secret']),
      entity('gm-e2', 'The Thorn Court', 'faction', 'Fey debt network spreading through Briarwatch.', ['faction', 'antagonist']),
      entity('gm-e3', 'Old Aqueduct', 'location', 'Smuggler route beneath the city wells.', ['dungeon', 'clue']),
      entity('gm-e4', 'Session 13: Masks at Dawn', 'timeline', 'The next session opens with a masked envoy at the east gate.', ['session prep']),
    ],
  },
  sagacraft: {
    project: {
      id: 'sagacraft-demo',
      title: 'The Glass Cartographer',
      description: 'Novel workspace for character arcs, chapter beats, timeline events, settings, lore, and revision continuity.',
      type: 'fiction',
      status: 'review',
      productKey: 'sagacraft',
      createdAt: now,
      updatedAt: now,
    },
    blocks: [
      block('sg-b1', 'sagacraft-demo', 'Chapter 14: The False North', 'Mira realizes the map is not describing geography, but loyalty.', 'chapter', { domain: 'writing', writing_status: 'revised', writing_tags: ['chapter', 'revelation'] }),
      block('sg-b2', 'sagacraft-demo', 'Mira Sol', 'A mapmaker whose magic changes when she tells the truth.', 'character', { domain: 'writing' }),
      block('sg-b3', 'sagacraft-demo', 'The Broken Meridian', 'A political border that moves when royal claims are challenged.', 'fact', { domain: 'writing' }),
      block('sg-b4', 'sagacraft-demo', 'Revision Questions', 'Track whether the false north reveal is foreshadowed in chapters 3, 8, and 11 without making the twist obvious.', 'text', { domain: 'notes' }),
    ],
    generated: [
      generated('sg-g1', 'sagacraft-demo', 'Act II Revision Pass', 'outline', 'Revision Plan', 'A chapter-by-chapter revision pass focused on motive, escalation, and payoff.'),
      generated('sg-g2', 'sagacraft-demo', 'Mira Character Arc', 'character', 'Character Arc', 'A three-act emotional arc with pressure points and scene prompts.'),
    ],
    entities: [
      entity('sg-e1', 'Mira Sol', 'npc', 'Cartographer protagonist balancing truth, ambition, and family debt.', ['protagonist', 'arc']),
      entity('sg-e2', 'The Broken Meridian', 'location', 'A moving border at the center of the novel conflict.', ['setting', 'symbol']),
      entity('sg-e3', 'House Ardent', 'faction', 'Royal house trying to make the map obey inheritance law.', ['faction']),
      entity('sg-e4', 'Chapter 14: The False North', 'timeline', 'Mira discovers the map points toward loyalty, not land.', ['chapter beat']),
    ],
  },
};

function block(id, projectId, title, content, type, metadata) {
  return { id, projectId, title, content, type, order: 0, metadata, createdAt: now, updatedAt: now };
}

function generated(_id, project_id, title, content_type, deliverable, summary) {
  return {
    _id,
    project_id,
    content_type,
    title,
    generated_content: { summary },
    metadata: { deliverable, difficulty: 'medium', sources_used: ['Canon Library', 'Project Notes'] },
    created_at: now,
    updated_at: now,
  };
}

function entity(_id, canonical_name, type, summary, tags) {
  return { _id, canonical_name, type, summary, tags, start_date: type === 'timeline' ? 'Year 312' : undefined };
}

async function main() {
  for (const folder of ['fourstargeneral', 'vcs', 'mastertyping', 'contentcraft', 'gamemastercraft', 'sagacraft']) {
    fs.mkdirSync(path.join(OUTPUT_ROOT, folder), { recursive: true });
  }

  const targets = new Set(process.argv.slice(2).map((target) => target.toLowerCase()));
  const shouldCapture = (target) => targets.size === 0 || targets.has(target);

  const browser = await chromium.launch({ headless: true });
  try {
    if (shouldCapture('fourstargeneral') || shouldCapture('fsg')) await captureFourStarGeneral(browser);
    if (shouldCapture('vcs') || shouldCapture('virtual-combat-simulator')) await captureVirtualCombatSimulator(browser);
    if (shouldCapture('mastertyping')) await captureMasterTyping(browser);
    if (shouldCapture('contentcraft')) await captureCraftProduct(browser, 'contentcraft');
    if (shouldCapture('gamemastercraft')) await captureCraftProduct(browser, 'gamemastercraft');
    if (shouldCapture('sagacraft')) await captureCraftProduct(browser, 'sagacraft');
  } finally {
    await browser.close();
  }
}

async function newPage(browser) {
  return browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
}

async function shot(page, folder, filename) {
  await page.screenshot({ path: path.join(OUTPUT_ROOT, folder, filename), fullPage: false });
  console.log(`${folder}/${filename}`);
}

async function captureFourStarGeneral(browser) {
  const page = await newPage(browser);
  await page.goto('http://127.0.0.1:5180', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await shot(page, 'fourstargeneral', 'four-star-general-war-room-command-roster-mission-selection.png');

  await page.locator('[data-mission="patrol"]').click();
  await page.waitForTimeout(500);
  await shot(page, 'fourstargeneral', 'four-star-general-mission-briefing-objectives-campaign-map.png');

  await page.locator('#resetAllocations').click();
  await page.waitForTimeout(500);
  await shot(page, 'fourstargeneral', 'four-star-general-requisition-supply-management-wwii-strategy.png');

  await page.locator('#proceedToBattle').click();
  await page.waitForTimeout(1000);
  await page.locator('#assignBaseCamp').click();
  await page.waitForTimeout(300);
  await shot(page, 'fourstargeneral', 'four-star-general-deployment-zone-combined-arms-wwii-wargame.png');

  await page.locator('#autoDeployGrouped').click();
  await page.waitForTimeout(500);
  await page.locator('#beginBattle').click();
  await page.waitForTimeout(1200);
  await shot(page, 'fourstargeneral', 'four-star-general-tactical-combat-wwii-hex-strategy-map.png');
  await page.close();
}

async function captureVirtualCombatSimulator(browser) {
  const sessionData = buildVcsSession();
  const page = await newPage(browser);
  await page.addInitScript(({ sessionData }) => {
    history.replaceState({
      usr: { fromDashboard: true, loadSessionData: sessionData, sessionName: 'Capture Encounter' },
      key: 'capture',
      idx: 0,
    }, '');
    localStorage.setItem('vcs_entitlements_snapshot', JSON.stringify({ userTier: 'premium', source: 'capture', fetchedAt: Date.now() }));
    localStorage.setItem('ascendant_unified_entities', JSON.stringify(buildVcsEntities()));

    function buildVcsEntities() {
      return {
        characters: {
          battle_test_hero: {
            id: 'battle_test_hero',
            type: 'character',
            schemaVersion: '1.0',
            data: {
              name: 'Battle Test Hero',
              identity: { name: 'Battle Test Hero', race: 'Human', background: 'Soldier', alignment: 'Lawful Good' },
              class: 'Fighter',
              level: 5,
              hp: { average: 38 },
              ac: { value: 17 },
              abilities: { strength: 16, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 11, charisma: 13 },
              equipment: [{ name: 'Longsword' }, { name: 'Shield' }],
              actions: [{ name: 'Longsword', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.' }],
            },
            metadata: {},
            tags: [],
          },
        },
        monsters: {
          battle_test_goblin: {
            id: 'battle_test_goblin',
            type: 'monster',
            schemaVersion: '1.0',
            data: {
              name: 'Battle Test Goblin',
              ac: { value: 15 },
              hp: { average: 7 },
              abilities: { strength: 8, dexterity: 14, constitution: 10, intelligence: 10, wisdom: 8, charisma: 8 },
              actions: [{ name: 'Scimitar', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target.' }],
            },
            metadata: {},
            tags: [],
          },
        },
        version: '1.0',
      };
    }
  }, { sessionData });

  await page.goto('http://127.0.0.1:3004/__test__/battle-room', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await shot(page, 'vcs', 'virtual-combat-simulator-battle-room-map-tokens-initiative-dnd-combat-tracker.png');

  await page.getByText('CHARACTER SHEET').click();
  await page.waitForTimeout(500);
  await shot(page, 'vcs', 'virtual-combat-simulator-token-character-sheet-actions-spells.png');

  await page.getByRole('button', { name: 'FOG' }).click();
  await page.waitForTimeout(400);
  await shot(page, 'vcs', 'virtual-combat-simulator-gm-battle-map-layers-fog-grid-tools.png');

  await page.getByRole('button', { name: 'Player View' }).click();
  await page.waitForTimeout(900);
  await shot(page, 'vcs', 'virtual-combat-simulator-player-shared-combat-view-online-rpg.png');

  await page.getByRole('button', { name: 'GM View' }).click();
  await page.waitForTimeout(700);
  await page.getByText('COMBAT LOG').click();
  await page.waitForTimeout(400);
  await shot(page, 'vcs', 'virtual-combat-simulator-initiative-turn-tracker-hp-conditions.png');
  await page.close();
}

function buildVcsSession() {
  return {
    version: 'capture',
    timestamp: now,
    battleState: {
      tokens: [
        { id: 'hero-token', name: 'Battle Test Hero', type: 'player', x: 520, y: 360, width: 50, height: 50, size: 1, layer: 'token', hp: 31, maxHp: 38, hpObj: { current: 31, max: 38 }, ac: 17, initiative: 18, conditions: ['Blessed'], characterDataRef: 'battle_test_hero' },
        { id: 'goblin-1', name: 'Battle Test Goblin', type: 'monster', x: 760, y: 420, width: 50, height: 50, size: 1, layer: 'token', hp: 7, maxHp: 7, hpObj: { current: 7, max: 7 }, ac: 15, initiative: 14, conditions: ['Hidden'], monsterDataRef: 'battle_test_goblin' },
        { id: 'ogre-1', name: 'Ogre Guard', type: 'monster', x: 880, y: 520, width: 70, height: 70, size: 2, layer: 'gamemaster', hp: 45, maxHp: 59, hpObj: { current: 45, max: 59 }, ac: 11, initiative: 9, conditions: ['Prone'] },
      ],
      mapState: { size: { width: 2000, height: 1500 } },
      gridSize: 50,
      gridWidth: 40,
      gridHeight: 30,
      zoom: 0.55,
      showGrid: true,
      snapToGrid: true,
      feetPerCell: 5,
      gridType: 'square',
      tokenOwnership: { 'hero-token': { controllerType: 'player', controllerId: 'harness-player', assignedBy: 'harness-gm' } },
    },
    combatState: {
      combatStarted: true,
      currentCombatantId: 'hero-token',
      currentRound: 2,
      currentTurn: 0,
      initiativeOrder: [
        { id: 'hero-token', name: 'Battle Test Hero', initiative: 18, type: 'player' },
        { id: 'goblin-1', name: 'Battle Test Goblin', initiative: 14, type: 'monster' },
        { id: 'ogre-1', name: 'Ogre Guard', initiative: 9, type: 'monster' },
      ],
    },
  };
}

async function captureMasterTyping(browser) {
  const page = await newPage(browser);
  await page.route('**/*clerk*.js', (route) => route.abort());
  await page.goto('http://127.0.0.1:5182', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(900);
  await shot(page, 'mastertyping', 'mastertyping-dashboard-assessment-practice-game-modes.png');

  await page.evaluate(() => startMode('assessment'));
  await page.waitForTimeout(500);
  await shot(page, 'mastertyping', 'mastertyping-quick-baseline-typing-assessment-wpm-accuracy.png');

  await page.evaluate(() => {
    const date = new Date().toISOString();
    localStorage.setItem('masterTypingStats', JSON.stringify({
      game: { recentGames: [{ date, score: 1840, level: 7, wordsDefeated: 83, bestCombo: 19 }] },
      pro: { history: [{ date, wpm: 64, accuracy: 96, time: 420 }, { date, wpm: 72, accuracy: 97, time: 360 }] },
      assessment: { history: [{ date, wpm: 58, accuracy: 91, consistency: 83, weakChars: ['p', 'q', ';'], weaknessAreas: [{ area: 'Accuracy', details: 'Review punctuation and right-hand reaches.' }] }] },
      exercise: { history: [{ date, type: 'problemChars', wpm: 49, accuracy: 94, rounds: 4 }] },
    }));
    showStats();
  });
  await page.waitForTimeout(700);
  await shot(page, 'mastertyping', 'mastertyping-assessment-results-weak-keys-recommendations.png');

  await page.evaluate(() => startMode('pro'));
  await page.waitForTimeout(700);
  await shot(page, 'mastertyping', 'mastertyping-pro-mode-focused-typing-practice-speed-accuracy.png');

  await page.evaluate(() => {
    openGradeSelect();
  });
  await page.waitForTimeout(400);
  await shot(page, 'mastertyping', 'mastertyping-game-mode-typing-arena-progress-combo.png');
  await page.close();
}

async function captureCraftProduct(browser, key) {
  const page = await newPage(browser);
  await mockCraftApi(page, key);
  const folder = key;
  const product = products[key];
  const id = product.project.id;
  const base = `http://127.0.0.1:5181`;
  const qp = `product=${key}`;

  await page.goto(`${base}/?${qp}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await shot(page, folder, craftFilename(key, 0));

  await page.goto(`${base}/projects/${id}?${qp}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await shot(page, folder, craftFilename(key, 1));

  await page.goto(`${base}/projects/${id}/canon?${qp}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await shot(page, folder, craftFilename(key, 2));

  await page.goto(`${base}/projects/${id}/timeline?${qp}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await shot(page, folder, craftFilename(key, 3));

  await page.goto(`${base}/projects/${id}/notes?${qp}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await shot(page, folder, craftFilename(key, 4));
  await page.close();
}

function craftFilename(key, index) {
  const names = {
    contentcraft: [
      'contentcraft-project-dashboard-worldbuilding-writing-workspace.png',
      'contentcraft-ai-generator-generated-content-canon-writing-workflow.png',
      'contentcraft-canon-library-characters-factions-locations.png',
      'contentcraft-timeline-lore-story-continuity-planning.png',
      'contentcraft-draft-notes-editor-worldbuilding-session-notes.png',
    ],
    gamemastercraft: [
      'gamemastercraft-campaign-dashboard-npcs-factions-locations-session-notes.png',
      'gamemastercraft-generated-content-npc-encounter-session-workflow.png',
      'gamemastercraft-campaign-canon-library-npcs-factions-locations.png',
      'gamemastercraft-campaign-timeline-session-events-consequences.png',
      'gamemastercraft-session-recap-hooks-next-session-prep.png',
    ],
    sagacraft: [
      'sagacraft-story-dashboard-characters-chapters-plots-timeline.png',
      'sagacraft-generated-content-character-arc-revision-workflow.png',
      'sagacraft-story-canon-library-characters-settings-lore.png',
      'sagacraft-timeline-lore-settings-novel-continuity.png',
      'sagacraft-revision-canon-check-story-continuity.png',
    ],
  };
  return names[key][index];
}

async function mockCraftApi(page, key) {
  const data = products[key];
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    const pathname = url.pathname;
    const id = data.project.id;
    let payload;

    if (pathname === '/api/projects') {
      payload = { success: true, data: [data.project], pagination: { page: 1, limit: 20, total: 1, totalPages: 1 } };
    } else if (pathname === `/api/projects/${id}`) {
      payload = { success: true, data: data.project };
    } else if (pathname === `/api/content/project/${id}`) {
      payload = { success: true, data: data.blocks, pagination: { page: 1, limit: 50, total: data.blocks.length, totalPages: 1 } };
    } else if (pathname === `/api/content/generated/list/${id}`) {
      payload = { success: true, data: data.generated };
    } else if (pathname === `/api/canon/projects/${id}/entities`) {
      payload = data.entities;
    } else if (pathname === `/api/content/${id}`) {
      payload = data.blocks.filter((item) => item.metadata?.domain === 'notes');
    } else if (pathname === `/api/canon/projects/${id}/links`) {
      payload = data.entities.map((item) => ({ _id: `${item._id}-link`, library_entity_id: item._id }));
    } else if (pathname.includes('/canon-check')) {
      payload = { success: true, data: { summary: { reviewRequired: true }, searchedScope: 'linked canon', blocks: [{ blockId: data.blocks[0].id, status: 'warning', summary: 'Possible continuity mismatch with linked canon.' }] } };
    } else {
      payload = { success: true, data: [] };
    }

    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(payload) });
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
