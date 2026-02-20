/**
 * Blog Data
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '5-tools-every-dungeon-master-needs',
    title: '5 Tools Every Dungeon Master Needs in 2026',
    excerpt: 'Running a great D&D session means juggling maps, monsters, initiative, and story — all at once. Here are the five tools that will change how you run the table.',
    content: `Running a tabletop RPG session is one of the most rewarding creative experiences you can have. It's also one of the most chaotic. You're part storyteller, part referee, part improv actor — and you're doing it all while tracking hit points, spell slots, and whether the rogue remembered to declare sneak attack.

The good news? You don't have to do it all in your head anymore. Here are five categories of tools every Dungeon Master should have in their toolkit in 2026.

## 1. A Virtual Tabletop That Doesn't Get in the Way

The days of clunky, laggy VTTs are over. What you need is something that loads fast, shows the battle clearly, and lets you focus on the story — not on fighting the software. Look for drag-and-drop initiative, fog of war, and real-time sync so your players see exactly what you want them to see.

**Our pick:** [VirtualCombatSimulator](/apps/virtual-combat-simulator) was built specifically for this. No bloated feature lists — just clean, fast combat management with a responsive tabletop.

## 2. AI-Assisted Worldbuilding (That Actually Remembers Your Lore)

Generic AI tools are fine for brainstorming, but they don't know your world. They'll contradict your established canon, forget that the Dwarven king died two sessions ago, and generate content that feels disconnected from your campaign.

What you need is AI that understands context — your factions, your NPCs, your plot threads — and generates content that fits seamlessly into what you've already built.

**Our pick:** [ContentCraft](/apps/contentcraft) tracks your canon automatically and generates lore, encounters, and NPCs that are consistent with your world.

## 3. Encounter Balancing That Goes Beyond CR

Challenge Rating is a starting point, but experienced DMs know it's unreliable. Action economy, terrain, party composition, and resource expenditure all matter more than a single number.

The best encounter tools let you model these variables and give you a feel for how deadly the fight will actually be — not just what the math says on paper.

## 4. Session Notes That Connect the Dots

Your campaign is a living story. NPCs recur, plot threads weave together, and players make choices that ripple forward. You need notes that aren't just a list of what happened — you need notes that show you the connections between events, characters, and locations.

## 5. A Way to Keep Players Engaged Between Sessions

The best campaigns don't end when the session does. Whether it's a shared recap, a downtime activity system, or an async side quest, finding ways to keep the story alive between sessions keeps engagement high and reduces "where were we?" moments.

---

The right tools don't replace your creativity — they amplify it. Spend less time managing logistics and more time telling the story your players will remember for years.`,
    author: 'Sixsmith Games',
    date: '2026-02-18',
    readTime: '6 min read',
    category: 'D&D',
    tags: ['dungeon master', 'dnd', 'tools', 'virtual tabletop', 'worldbuilding'],
    featured: true,
  },
  {
    slug: 'ai-worldbuilding-for-fantasy-writers',
    title: 'How AI Is Changing Worldbuilding for Fantasy Writers',
    excerpt: 'Fantasy writers spend months building worlds before writing a single chapter. AI worldbuilding tools are changing that — but only if they understand your canon.',
    content: `Every fantasy writer knows the feeling: you're 40,000 words into your novel and you realize you contradicted your own magic system. Or you mentioned a city in chapter three that doesn't appear on the map you drew in your notebook. Or you forgot whether the protagonist's mentor was from the Northern Reaches or the Eastern Wastes.

Worldbuilding is the backbone of fantasy fiction. It's also one of the most time-consuming parts of the writing process. And when your world has inconsistencies, readers notice.

## The Promise of AI Worldbuilding

AI tools have exploded in popularity for writers. They're great for brainstorming, generating names, and breaking through writer's block. But most general-purpose AI tools have a critical flaw for worldbuilders: **they don't remember your world.**

You can tell ChatGPT about your magic system in one conversation, but start a new conversation and it's gone. You can describe your political factions in detail, but the AI won't cross-reference them when you ask it to generate a new city.

## What Worldbuilders Actually Need

The ideal AI worldbuilding tool would:

- **Track your canon** — every faction, character, location, and rule you've established
- **Cross-reference new content** against existing lore to prevent contradictions
- **Generate content that fits** — not generic fantasy, but content that feels like it belongs in *your* world
- **Scale with your project** — from a short story to a multi-book epic

## The ContentCraft Approach

This is exactly why we built [ContentCraft](/apps/contentcraft). Instead of starting from scratch every time, ContentCraft maintains a living model of your world. When you generate a new NPC, it knows which factions exist. When you create a new location, it knows the geography. When you write a scene, it can flag potential contradictions with established canon.

It's not about replacing the writer — it's about giving the writer a collaborator that actually remembers the conversation.

## Tips for Using AI in Your Worldbuilding Process

1. **Start with your rules.** Feed the tool your magic system, political structure, and core conflicts first. Everything else flows from there.
2. **Iterate, don't accept.** Use AI output as a starting point, then refine it in your own voice.
3. **Check for contradictions early.** The earlier you catch a lore conflict, the less rewriting you'll do later.
4. **Keep a canon document.** Even with AI tracking, having a master reference is invaluable.

---

The worlds we build deserve tools that respect their complexity. AI isn't going to write your fantasy novel for you — but it can make sure your world holds together while you do.`,
    author: 'Sixsmith Games',
    date: '2026-02-15',
    readTime: '7 min read',
    category: 'Writing',
    tags: ['worldbuilding', 'fantasy', 'ai', 'writing', 'contentcraft'],
    featured: true,
  },
  {
    slug: 'async-board-games-play-on-your-schedule',
    title: 'The Rise of Async Board Games: Play Strategy on Your Schedule',
    excerpt: 'You love deep strategy games but can\'t get four friends in the same room at the same time. Async multiplayer is the answer — here\'s why it works.',
    content: `If you've ever tried to schedule a board game night with adults, you know the struggle. Between work schedules, kids, time zones, and the simple reality that everyone's busy, getting four people around a table at the same time feels like a logistics puzzle harder than the game itself.

But what if you didn't have to?

## What Is Asynchronous Multiplayer?

Async multiplayer means players take turns on their own schedule. You make your move when you have time. Your opponent makes theirs when they have time. The game progresses at a pace that fits everyone's life.

It's the same model that made Words With Friends and chess apps so popular — but applied to deeper, more strategic games.

## Why Async Works for Strategy Games

Real-time strategy games are exciting, but they demand hours of uninterrupted attention. Async games offer something different:

- **Think deeper.** With no clock ticking, you can actually analyze the board and plan several turns ahead.
- **Play more games.** You can run multiple games simultaneously, each with different opponents.
- **No scheduling.** A game between someone in New York and someone in Tokyo works perfectly when nobody needs to be online at the same time.
- **Fits your life.** Take your turn during lunch, on the train, or before bed. Five minutes here and there adds up to epic campaigns.

## Strategy Without Sacrifice

The challenge for async game designers is preserving the depth and tension of real-time play. A great async game needs:

- **Meaningful decisions** on every turn, so each move matters even without real-time pressure
- **Clear information** about the game state, so you can make smart moves without being online when things happen
- **Push notifications** so you know when it's your turn without constantly checking
- **Games that resolve** in a reasonable number of turns, so campaigns don't drag on for months

## Gravity: Built for Async from Day One

[Gravity](/apps/gravity) was designed specifically for asynchronous play. It's a tactical sci-fi board game where you command fleets, manage resources, and outmaneuver opponents — all on your own schedule. Each turn presents real strategic choices, and games are designed to reach satisfying conclusions without requiring anyone to clear their calendar.

---

The best games are the ones you actually get to play. Async multiplayer makes deep strategy accessible to people with real lives — and that's something worth exploring.`,
    author: 'Sixsmith Games',
    date: '2026-02-10',
    readTime: '5 min read',
    category: 'Gaming',
    tags: ['board games', 'async', 'strategy', 'multiplayer', 'gravity'],
  },
  {
    slug: 'gamification-typing-practice-kids',
    title: 'Why Gamification Makes Kids Actually Want to Practice Typing',
    excerpt: 'Typing is a critical skill, but traditional typing tutors are boring. Here\'s the science behind why game-based practice works — and how to pick the right one.',
    content: `Ask any kid to sit through a traditional typing tutor and watch their eyes glaze over. "Type the quick brown fox jumped over the lazy dog" fifty times isn't anyone's idea of fun. But ask them to defeat a boss by typing spell words correctly? Now you've got their attention.

## The Problem with Traditional Typing Practice

Most typing programs treat practice like medicine — something you have to do, not something you want to do. They focus on repetition without context, accuracy without excitement, and speed without meaning.

The result? Kids do the minimum required and then never open the program again.

## Why Gamification Works

Game-based learning isn't just a buzzword — there's real research behind it:

- **Intrinsic motivation.** Games create their own motivation through challenge, progress, and reward. Kids practice more because they want to, not because they have to.
- **Flow state.** Well-designed games put players in a flow state where difficulty matches skill level. This is the optimal zone for learning.
- **Spaced repetition.** Games naturally revisit skills through level progression, reinforcing learning without feeling repetitive.
- **Immediate feedback.** Every keystroke has a consequence in a game, creating a tight feedback loop that accelerates improvement.

## What Makes a Good Typing Game

Not all gamified typing tools are created equal. The best ones have:

- **Real vocabulary.** Kids should be typing words they'll actually use, not random letter combinations.
- **Progressive difficulty.** Start with home row and gradually introduce more keys and faster speeds.
- **Characters and story.** Even a simple narrative gives kids a reason to come back.
- **Multiple game modes.** Different activities keep practice fresh and engage different skill areas.

## The MasterTyping Approach

[MasterTyping](/apps/mastertyping) turns typing practice into an adventure with 10 unique characters, each with special abilities that activate when kids type accurately and quickly. The vocabulary is aligned with K-12 standards, so kids are reinforcing real language skills while they play.

The result: kids ask to practice typing instead of being told to. And that's when real improvement happens.

---

Typing is one of the most practical skills we can teach kids. Making it fun isn't just nice — it's necessary. When practice feels like play, kids put in the hours that actually build proficiency.`,
    author: 'Sixsmith Games',
    date: '2026-02-05',
    readTime: '5 min read',
    category: 'Education',
    tags: ['typing', 'gamification', 'education', 'kids', 'mastertyping'],
  },
  {
    slug: 'building-better-combat-encounters',
    title: 'Building Better D&D Combat Encounters: A DM\'s Guide',
    excerpt: 'Your players deserve combat that feels dangerous, dramatic, and meaningful. Here\'s how to design encounters that go beyond "roll initiative and hit things."',
    content: `Combat encounters are the heartbeat of most D&D campaigns. They're where tension peaks, where characters shine, and where stories take unexpected turns. But too many encounters fall into the same pattern: roll initiative, stand in a line, trade blows until something dies.

Great combat is about more than damage numbers. It's about stakes, environment, and tough choices.

## Start with the Stakes

Before you design a single monster, ask yourself: **what happens if the players lose?** If the answer is "nothing much," then the combat has no tension regardless of how many hit points the enemies have.

The best encounters have stakes beyond survival:
- A hostage that will be harmed if combat takes too long
- A ritual that completes in 5 rounds unless the players stop it
- A collapsing structure that forces the fight to keep moving
- An NPC ally who might die if the players don't protect them

## Design the Environment, Not Just the Enemies

A flat room with nothing in it is the worst possible combat arena. The environment should be part of the encounter:

- **Elevation.** Archers on balconies, melee fighters below. Instantly more interesting.
- **Hazards.** Lava, acid pools, crumbling floors. Players have to think about positioning.
- **Cover.** Pillars, overturned tables, ruined walls. Gives ranged characters something to do besides "I shoot it."
- **Interactive elements.** Chandeliers to swing from, bridges to collapse, levers to pull. Let creative players be creative.

## Action Economy Is King

The single most important factor in encounter balance isn't CR — it's action economy. Five goblins are more dangerous than one ogre because they get five turns per round.

Rules of thumb:
- **Match the number of enemies to the party size** when you want a fair fight
- **Use legendary actions and lair actions** to give solo monsters more turns
- **Add minions** (1 HP creatures that go down in one hit) for spectacle without bookkeeping

## Manage the Combat, Don't Just Run It

This is where the right tools make a real difference. When you're tracking initiative for 8 players and 12 monsters, managing conditions, and remembering which goblin has 3 HP left, you're not thinking about the story. You're doing bookkeeping.

[VirtualCombatSimulator](/apps/virtual-combat-simulator) handles the logistics — initiative tracking, HP management, real-time tabletop display — so you can focus on making the combat feel alive. Describe the environment, voice the villain's taunts, react to player creativity. That's the DM's job. Let the software handle the spreadsheet.

## End Combat Before It Gets Boring

Not every fight needs to go to the last hit point. When the outcome is clear — the boss is bloodied and surrounded, the goblins are routing — consider narrating the conclusion rather than rolling through six more rounds of mop-up.

Your players' time is valuable. Respect it by ending combat at the dramatic peak, not the mathematical one.

---

Great combat encounters are designed, not improvised. Put the work in before the session — stakes, environment, enemy tactics, exit conditions — and the table will thank you with stories they retell for years.`,
    author: 'Sixsmith Games',
    date: '2026-01-28',
    readTime: '8 min read',
    category: 'D&D',
    tags: ['dnd', 'combat', 'encounter design', 'dungeon master', 'tips'],
  },
  {
    slug: 'wargaming-digital-age',
    title: 'Wargaming in the Digital Age: From Tabletop to Screen',
    excerpt: 'The wargaming hobby is thriving online. Here\'s how digital platforms are preserving what makes tabletop wargaming great while solving its biggest problems.',
    content: `Wargaming has been around for centuries — from Prussian Kriegsspiel to Avalon Hill classics to the massive miniature battles of today. It's a hobby built on deep thinking, historical appreciation, and the satisfaction of outmaneuvering an opponent through superior strategy.

But traditional wargaming has always had friction. Setting up a game takes hours. Finding an opponent who plays the same system is hard. And storing a collection of miniatures, terrain, and rulebooks requires a dedicated room.

Digital wargaming doesn't replace the tabletop experience — but it solves many of its problems while preserving the strategic depth that makes the hobby rewarding.

## What Digital Gets Right

- **Instant setup.** No more spending 45 minutes placing terrain and deploying units. Jump straight into the strategy.
- **Rules enforcement.** The computer handles line of sight, range calculations, and modifier stacking. No more rulebook arguments.
- **Opponent matching.** Play against someone across the world who loves the same era and scale you do.
- **Replay and analysis.** Review your games turn by turn. See where the battle turned and learn from mistakes.

## What Makes a Good Digital Wargame

Not all digital wargames capture the spirit of tabletop play. The best ones have:

- **Meaningful decisions** at both strategic and tactical levels
- **Clear visual presentation** — you should be able to read the battlefield at a glance
- **Historical grounding** that respects the source material
- **Manageable complexity** — deep enough to reward study, accessible enough to learn by playing

## Four Star General: WWII Strategy Done Right

[Four Star General](/apps/fourstargeneral) brings World War II strategic and tactical gameplay to your browser. Command operations, manage unit rosters, and fight through campaigns that test your generalship at every level. It's built for players who want the depth of a tabletop wargame without the setup time.

---

The wargaming community has always been driven by people who love to think deeply about strategy, history, and tactics. Digital platforms are making it possible for more people to join that community — and that's good for everyone who loves the hobby.`,
    author: 'Sixsmith Games',
    date: '2026-01-20',
    readTime: '5 min read',
    category: 'Gaming',
    tags: ['wargaming', 'strategy', 'wwii', 'fourstargeneral', 'digital'],
  },
];

function loadDynamicPosts(): BlogPost[] {
  try {
    const file = path.join(process.cwd(), 'data', 'posts.json');
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

function allPosts(): BlogPost[] {
  const dynamic = loadDynamicPosts();
  const dynamicSlugs = new Set(dynamic.map(p => p.slug));
  const seed = BLOG_POSTS.filter(p => !dynamicSlugs.has(p.slug));
  return [...dynamic, ...seed].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPosts(): BlogPost[] {
  return allPosts();
}

export function getFeaturedPosts(): BlogPost[] {
  return allPosts().filter(p => p.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts().find(p => p.slug === slug);
}

export function getRecentPosts(count: number): BlogPost[] {
  return allPosts().slice(0, count);
}
