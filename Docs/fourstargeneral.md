---
app: Four Star General
title: Four Star General Feature Brief
audience: strategy wargamers
summary: WWII-inspired operational strategy game with simultaneous planning, deterministic resolution, and expandable factions/branches.
---

## Overview
Four Star General is a turn-based WWII strategy game where you plan operations, coordinate branches, and resolve battles with clear, deterministic rules. The current build focuses on a tactical battle prototype that wires the allocation UI into the deterministic `GameEngine`, showcasing deployment, reserve management, and turn-based supply tempo on authored scenarios like **River Crossing Watch**.

## Modes
- **Tactical battle prototype (in dev)**: Deploy forces, assign base camps, and fight through handcrafted scenarios with clear objectives and turn limits.
- **Single-player campaigns**: Planned arcs with historical and what-if objectives, built on the same deterministic engine.
- **Multiplayer (simultaneous planning)**: Planned mode where both sides lock orders before resolution.
- **Skirmish/battle packs**: Quick-play scenarios for testing tactics, builds, and new factions.

## Key Features
- **Deterministic resolution**: Clear rules—no dice opacity—so planning and positioning matter.
- **Deployment to engine**: Allocation UI feeds directly into the `GameEngine`, normalizing scenarios, enforcing base camp assignment, and mirroring reserves/placements.
- **Turn flow with supply**: Battles advance via explicit turn transitions, surfacing supply status and tempo pressure.
- **Mission profiles**: Scenarios tagged with profiles (e.g., `patrol_river_watch`) that define defaults, objectives, and turn limits per difficulty.
- **Branch composition**: Coordinate land, air, naval, and support elements with distinct capabilities and colleges.
- **Order planning**: Movement, supply, bombardment, and assaults resolve after all sides commit (simultaneous planning design).
- **Fog of war options**: Configurable intel to match desired transparency.
- **Replayable content**: Campaign arcs, battle packs, factions, and colleges to mix and match.

## Monetization
- **Free core**: Tutorial campaign, starter colleges/factions, and core roster in the base download.
- **Unlocks**: Colleges, factions, branch packs, campaigns, and a "Complete War Chest" bundle for all content.

## Current Progress & Coverage
- **Engine integration**: Deployment templates map into engine-ready payloads; scenario data is normalized for palette, objectives, and sides.
- **Deterministic saves**: Engine supports serialize/rehydrate for future campaign persistence.
- **Automated tests**: CI covers deployment-to-engine wiring, reserve resets, base camp enforcement, turn advancement, and serialization round-trips.

## Example Scenario: River Crossing Watch
- **Objective**: Defend the river line while managing limited crossings and enemy probes.
- **Difficulty-scaled turn limits**: Easy 14 turns, Normal 12, Hard 11 to extract.
- **Phased pressure**: Probe phase into sustained assaults; reserve pressure triggers once crossings are held for consecutive turns on higher difficulties.
- **Profile-driven defaults**: Uses `patrol_river_watch` mission profile for deployment zones and defaults.

## Audience Notes
- Strategy and wargame players who want deterministic resolution and planning depth.
- Groups who like simultaneous planning over pure initiative ordering.
- Solo players looking for campaign arcs with clear objectives and constraints.
