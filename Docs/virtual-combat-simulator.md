---
app: Virtual Combat Simulator
title: Virtual Combat Simulator Feature Brief
audience: game masters, tabletop groups, encounter designers
summary: Battle management and map-first encounter control room for tabletop groups.
---

## Overview
Virtual Combat Simulator is a map-first battle control room for tabletop GMs. It combines a modern virtual tabletop with strict D&D 5e (2024 default) combat flow, import-ready canonical data, and multiplayer sync so groups can run encounters with confidence and speed.

## Core Modes
- **Encounter control**: Initiative, turn order, action economy (action/bonus/reaction), conditions, and HP tracking with full audit logs.
- **Map-first sessions**: Upload your own maps, configure grid type (square/hex) and scale, and place tokens with layer controls (Map / Token / GM). Share live to players for positioning and fog-free clarity.
- **Prep library**: Save encounters, NPCs/monsters, characters, and house rules for reuse; load a full layout in one click.

## Key Capabilities (feature parity with current app)
- **Rules fidelity**: 5e 2024 defaults with advantage/disadvantage, attack rolls, save DCs, criticals, resistances/immunities/vulnerabilities, conditions, movement (speed modes, difficult terrain, reach), opportunity attacks, and concentration checks.
- **Battle controls**: Initiative tracker, multiattack sequencing, range + line/cover checks, grid-aware measurement, and rewindable combat log that records dice formulas and results.
- **Token system**: Drag/drop, resize, reach-aware positioning, pinned stats, visibility/lock toggles, and layer-aware rendering with React-Konva performance.
- **Import/export**: SmartPaste + JSON intake into canonical schemas (characters, monsters, encounters). Export sessions and logs for notes. Supports custom and SRD-friendly content without hardcoding.
- **Asset management**: Upload maps and tokens, organize in the dashboard, and persist sessions locally or via the backend API.
- **Multiplayer sync**: Socket-enabled real-time updates so every player sees the same state; players join free.
- **House rules & toggles**: Optional modules for flanking advantage, GM overrides, cinematic vs. tournament enforcement, and custom rulings surfaced in the log.
- **Auditability**: Deterministic, seedable rolls with per-step combat logging and GM override markers for transparency.

## Player Experience
- Join free, view the shared map, move your token, and follow turn order with clear prompts.
- See results in the combat log (roll math, hits/misses, damage after resistances) without needing to administer the table.

## GM Experience
- Upload and stage maps, drop tokens, and run encounters from a single control room.
- Validate actions before rolling (range, cover, movement allowance) and apply overrides when story demands.
- Save/load encounter presets (map + tokens + initiative + settings) for recurring sessions.

## Data & Compatibility
- Uses a canonical schema for characters/monsters; no legacy bridges. Imports preserve full stat blocks, spell data, equipment, and features.
- Supports SRD-friendly play and homebrew alike; all mechanics run from schema-based data rather than hardcoded creatures.

## Monetization
- **Game Master Plan**: Unlimited active games, custom monsters, house rules, saved encounters, asset uploads, and session exports.
- **Free Player Access**: Players join unlimited games; GMs get one active room on free.

## Audience Notes
- GMs running tactical battles with custom or SRD content.
- Groups that need reliable shared state for maps, conditions, and initiative.
- Tables experimenting with homebrew or bespoke stat blocks while staying rules-faithful.
