/**
 * Blog Data
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */


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
    slug: 'dms-stop-fighting-your-vtt',
    title: 'DMs: Stop Fighting Your VTT',
    excerpt: 'Your virtual tabletop should run combat, not ruin it. Here\'s why DMs are ditching bloated tools for something that actually works.',
    content: `Look, we need to talk about your VTT.

You know the one. The software that crashes mid-boss fight. The interface that requires three clicks to move a token. The fog of war that reveals the entire dungeon when you drag it wrong. The tool that makes you feel like you need a CS degree just to run a goblin ambush.

Yeah. That one.

## The VTT Problem Nobody Talks About

Here's the dirty secret of online D&D: most virtual tabletops are designed by people who think "more features" equals "better product." So you get dynamic lighting systems that tank your framerate, automation that breaks when players multiclass, and enough buttons to pilot a spaceship.

Meanwhile, you just want to know whose turn it is and whether the fighter is in melee range.

## What DMs Actually Need

After running hundreds of sessions online, here's what actually matters:

**Fast initiative tracking** — No spreadsheets, no manual sorting, just "who goes next?"

**Clear battle maps** — Players see what they need to see. You control what they don't.

**Drag-and-drop everything** — Moving tokens, adjusting HP, changing turn order. If it takes more than one click, it's too slow.

**Real-time sync** — What you see is what they see. No refresh bugs, no desync issues.

That's it. Everything else is feature creep.

## The "Just Works" Standard

[VirtualCombatSimulator](/apps/virtual-combat-simulator) was built by DMs who got tired of fighting their tools. No 50-page manual. No subscription tiers that lock basic features. Just a clean tabletop that loads in seconds and runs combat at full speed.

Because here's the thing: your players don't remember the fancy lighting effects. They remember the story you told and the clutch nat 20 that saved the party.

Your VTT should help you deliver that. Not get in the way.

## The Bottom Line

If you're spending more time troubleshooting your virtual tabletop than running the game, you're using the wrong tool.

Switch to something built for speed. Your players will thank you.`,
    author: 'Sixsmith Games',
    date: '2026-02-18',
    readTime: '4 min read',
    category: 'D&D',
    tags: ['dungeon master', 'dnd', 'virtual tabletop', 'tools'],
    featured: true,
  },
  {
    slug: 'ai-that-remembers-your-lore',
    title: 'AI That Actually Remembers Your Lore',
    excerpt: 'ChatGPT forgot your magic system again. Here\'s why fantasy writers need AI that tracks canon, not just generates content.',
    content: `Chapter 23. You're on a roll. The protagonist just discovered the ancient artifact that will turn the tide of the war. You ask your AI assistant to generate the inscription on it.

The AI gives you something beautiful. Poetic. Completely wrong.

Because it forgot that in Chapter 4, you established that this civilization used pictographic writing, not runes. And in Chapter 11, you mentioned that artifacts from this era never contain direct instructions.

Your AI doesn't remember. And now you're rewriting.

## The Canon Problem

Every fantasy writer builds a world. Factions, magic systems, histories, languages, geography. You spend months on worldbuilding before you write a single chapter. You track it all in notebooks, wikis, spreadsheets.

Then you use AI to help generate content... and it contradicts everything.

Because general-purpose AI tools don't remember your world. Each conversation is a blank slate. You can describe your magic system in detail, then start a new chat and it's gone.

## What Writers Actually Need

Not AI that generates generic fantasy. AI that generates *your* fantasy.

That means:

**Canon tracking** — The AI knows every faction, character, location, and rule you've established.

**Automatic cross-referencing** — When you generate a new city, it knows which kingdom it belongs to and what resources are available there.

**Consistency checking** — It flags contradictions before they make it into your manuscript.

**Memory that scales** — From short stories to epic multi-book series.

## How [ContentCraft](/apps/contentcraft) Solves This

ContentCraft maintains a living model of your world. Add a faction once, and it remembers forever. Create an NPC, and the AI knows their relationships, motivations, and history.

Generate a new scene? The AI suggests content that fits your established canon. No more "wait, did I say the king was dead or just missing?"

It's not about replacing the writer. It's about giving you a collaborator that actually remembers the conversation.

## The Bottom Line

Your world deserves better than AI with amnesia.

Use tools that respect your canon. Your readers will notice the difference.`,
    author: 'Sixsmith Games',
    date: '2026-02-15',
    readTime: '5 min read',
    category: 'Writing',
    tags: ['worldbuilding', 'fantasy', 'ai', 'writing'],
    featured: true,
  },
  {
    slug: 'async-board-games-play-on-your-schedule',
    title: 'Strategy Games Without the Scheduling Nightmare',
    excerpt: 'Love deep strategy but hate coordinating schedules? Async multiplayer lets you play epic campaigns on your own time.',

    content: `"Hey, want to play a board game this weekend?"

"Sure! What time?"

*Three hours of text messages later, nobody can agree on a time.*

Sound familiar?

You love deep strategy games. Your friends love deep strategy games. But coordinating four adult schedules is harder than the actual game.

## Enter: Async Multiplayer

Asynchronous multiplayer is simple: you take your turn when you have time. Your opponent takes theirs when they have time. No scheduling required.

It's the same model that made chess apps and Words With Friends work. But now it's coming to real strategy games.

## Why This Actually Works

**You think deeper.** No timer pressure means you can actually analyze the board and plan ahead.

**You play more games.** Run multiple campaigns with different opponents simultaneously.

**Time zones don't matter.** New York vs Tokyo? No problem.

**Life-friendly.** Take your turn during lunch, on the train, before bed. Five minutes here and there adds up to epic campaigns.

## The Catch

Async only works if the game is designed for it. You need:

- Meaningful decisions every turn (not just "move and attack")
- Clear game state info (so you can make smart moves without being there when things happen)
- Push notifications (so you know it's your turn)
- Games that actually finish (not 6-month slogs)

## [Gravity](/apps/gravity): Strategy That Fits Your Life

Gravity is a tactical sci-fi game built for async from day one. Command fleets, manage resources, outmaneuver opponents — all on your schedule.

Each turn matters. Games resolve in weeks, not months. And you never have to coordinate a single calendar invite.

## The Bottom Line

The best games are the ones you actually get to play.

Async multiplayer makes deep strategy accessible to people with real lives. And that's a win for everyone.`,
    author: 'Sixsmith Games',
    date: '2026-02-10',
    readTime: '5 min read',
    category: 'Gaming',
    tags: ['board games', 'async', 'strategy', 'multiplayer', 'gravity'],
  },
  {
    slug: 'kids-actually-want-typing-practice',
    title: 'Kids Actually Want Typing Practice Now',
    excerpt: '"The quick brown fox" is not engaging. Defeating bosses with spell words? Now you have their attention.',
    content: `"Mom, can I practice typing?"

Said no kid ever. Until now.

## The Typing Tutor Problem

Traditional typing programs are digital vegetables. Kids know they're supposed to be good for them, but nobody wants to eat them.

"Type 'the quick brown fox jumped over the lazy dog' fifty times."

Thrilling.

The result? Kids do the bare minimum, then never open the program again. They learn to hunt-and-peck their way through life.

## Why Games Work (And Drills Don't)

Game-based learning isn't magic. It's psychology:

**Intrinsic motivation** — Games create their own rewards. Kids practice because they want to level up, not because they have to.

**Flow state** — When challenge matches skill level, learning happens naturally. Too easy = boring. Too hard = frustrating. Games adjust.

**Immediate feedback** — Every keystroke matters in a game. Miss a letter? The spell fizzles. Type fast? Your character powers up.

**Spaced repetition** — Games naturally revisit skills through level progression. Kids practice without realizing they're practicing.

## What Actually Works

Not all typing games are created equal. The good ones have:

- Real vocabulary (not "asdf jkl;")
- Progressive difficulty (home row → full keyboard)
- Characters and story (give kids a reason to care)
- Multiple game modes (variety keeps it fresh)

## [MasterTyping](/apps/mastertyping): Homework They'll Actually Do

MasterTyping turns typing practice into an adventure. Ten unique characters. Special abilities that activate when you type accurately. Boss battles. Power-ups.

The vocabulary is K-12 aligned, so kids are learning real words while they play.

The result? Kids ask to practice. Parents don't have to nag. Teachers see actual improvement.

## The Bottom Line

Typing is one of the most practical skills we can teach kids. Making it fun isn't optional — it's necessary.

When practice feels like play, kids put in the hours that actually build proficiency.`,
    author: 'Sixsmith Games',
    date: '2026-02-05',
    readTime: '4 min read',
    category: 'Education',
    tags: ['typing', 'gamification', 'education', 'kids'],
  },
  {
    slug: 'combat-encounters-beyond-hit-things',
    title: 'Combat Beyond "Roll Initiative, Hit Things"',
    excerpt: 'Your players deserve better than standing in a line trading blows. Here\'s how to design encounters that actually matter.',
    content: `Roll initiative. Stand in a line. Trade blows until something dies.

If that's your combat formula, your players deserve better.

## The Problem with "Just Add Monsters"

Too many D&D encounters are just math problems. "The party is level 5, so I'll throw CR 5 worth of enemies at them."

Then everyone stands in a hallway and rolls dice until the HP reaches zero.

Boring.

## What Actually Makes Combat Interesting

**Stakes beyond survival.** Before you design the encounter, ask: what happens if they lose? If the answer is "nothing," the fight has no tension.

Try:
- A hostage who dies if combat takes too long
- A ritual that completes in 5 rounds
- A collapsing bridge forcing constant movement
- An NPC ally who needs protection

**Environment matters.** A flat empty room is the worst combat arena.

Add:
- Elevation (archers on balconies, melee below)
- Hazards (lava, acid, crumbling floors)
- Cover (pillars, overturned tables, ruins)
- Interactive elements (chandeliers to swing from, levers to pull)

Let creative players be creative.

**Action economy > CR.** Five goblins are more dangerous than one ogre. They get five turns per round.

Quick rules:
- Match enemy count to party size for fair fights
- Give solo bosses legendary actions
- Add minions (1 HP creatures) for spectacle without bookkeeping

## Stop Doing Spreadsheets, Start Telling Stories

When you're tracking initiative for 8 players and 12 monsters, managing conditions, and remembering which goblin has 3 HP left, you're not DMing. You're doing bookkeeping.

[VirtualCombatSimulator](/apps/virtual-combat-simulator) handles the logistics. You handle the story.

Describe the environment. Voice the villain's taunts. React to player creativity. That's the DM's job.

## End Before It Gets Boring

Not every fight needs to go to the last HP. When the outcome is clear, narrate the conclusion.

Your players' time is valuable. End combat at the dramatic peak, not the mathematical one.

## The Bottom Line

Great combat is designed, not improvised. Put in the work before the session — stakes, environment, enemy tactics — and your players will tell stories about it for years.`,
    author: 'Sixsmith Games',
    date: '2026-01-28',
    readTime: '8 min read',
    category: 'D&D',
    tags: ['dnd', 'combat', 'encounter design', 'dungeon master', 'tips'],
  },
  {
    slug: 'wargaming-goes-digital',
    title: 'Wargaming Goes Digital (Finally)',
    excerpt: 'Love tabletop wargames but hate the setup time? Digital platforms are solving the hobby\'s biggest problems without sacrificing the strategy.',
    content: `You love wargaming. The deep strategy. The historical scenarios. The satisfaction of outmaneuvering your opponent through superior tactics.

You hate the setup time.

Forty-five minutes placing terrain and deploying units before you even start playing. Finding an opponent who plays the same system. Storing a collection that requires a dedicated room.

Digital wargaming solves these problems without sacrificing what makes the hobby great.

## What Digital Gets Right

**Instant setup** — Jump straight into the strategy. No more spending half your game night arranging hexes.

**Rules enforcement** — The computer handles line of sight, range calculations, modifier stacking. No more rulebook arguments.

**Opponent matching** — Play someone across the world who loves the same era and scale you do.

**Replay and analysis** — Review your games turn by turn. See where the battle turned. Learn from mistakes.

## What Makes a Good Digital Wargame

Not all digital wargames capture the tabletop spirit. The good ones have:

- Meaningful decisions at strategic and tactical levels
- Clear visual presentation (read the battlefield at a glance)
- Historical grounding that respects the source material
- Manageable complexity (deep enough to reward study, accessible enough to learn by playing)

## [Four Star General](/apps/fourstargeneral): WWII Strategy Without the Setup

Command operations. Manage unit rosters. Fight through campaigns that test your generalship at every level.

All the depth of a tabletop wargame. None of the setup time.

## The Bottom Line

The wargaming community has always been driven by people who love deep strategy, history, and tactics.

Digital platforms are making it possible for more people to join that community. And that's good for everyone who loves the hobby.`,
    author: 'Sixsmith Games',
    date: '2026-01-20',
    readTime: '4 min read',
    category: 'Gaming',
    tags: ['wargaming', 'strategy', 'wwii', 'digital'],
  },
];

async function loadDynamicPosts(): Promise<BlogPost[]> {
  const gistId = process.env.BLOG_GIST_ID;
  const token  = process.env.BLOG_GITHUB_TOKEN;
  if (!gistId || !token) return [];
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const raw = data.files?.['posts.json']?.content ?? '[]';
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

async function allPosts(): Promise<BlogPost[]> {
  const dynamic = await loadDynamicPosts();
  const dynamicSlugs = new Set(dynamic.map(p => p.slug));
  const seed = BLOG_POSTS.filter(p => !dynamicSlugs.has(p.slug));
  return [...dynamic, ...seed].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return allPosts();
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return (await allPosts()).filter(p => p.featured);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return (await allPosts()).find(p => p.slug === slug);
}

export async function getRecentPosts(count: number): Promise<BlogPost[]> {
  return (await allPosts()).slice(0, count);
}
