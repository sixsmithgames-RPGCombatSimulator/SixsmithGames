# Four Star General itch.io Conversion Path

Last updated: October 4, 2026

## Positioning decision

- **Audience:** Serious WWII strategy and hex-wargame players discovering Four Star General on itch.io.
- **Situation:** They can play immediately, but need a fast reason to choose this game and a clear explanation of what paid content adds.
- **Current idea to change:** “This is another broad WWII game or an unfinished marketing page.”
- **Desired idea:** “This is a free browser tactical core built around visible command rules, with a low-cost expansion if I want more.”
- **Useful value:** Deployment, terrain, supply, reserves, objectives, and timing produce outcomes the player can study and improve.
- **Reason to care:** The page shows the actual tactical battle interface and states the current prototype scope.
- **Alternative:** Tactics games that rely on opaque resolution, spectacle-first presentation, or a paywall before the player can evaluate the command model.
- **Primary next step:** `Play free in browser`.
- **Success signals:** Product-page-to-play rate, play clicks, pricing clicks, sign-in prompts, visible active time, and new customer records shown separately from anonymous attribution.

## Attribution path

The live itch.io listing opens `https://fsg.sixsmithgames.com`. Four Star
General now carries the original source into main-site sign-in and pricing
links when `document.referrer` belongs to itch.io:

```text
utm_source=itchio
utm_medium=game_listing
utm_campaign=four_star_general
```

Direct in-game links use:

```text
utm_source=four_star_general
utm_medium=product_app
utm_campaign=four_star_general_player
```

No cookie or persistent anonymous identifier is used for this handoff.

## Conversion copy

- Hero promise: command decisions are visible and learnable.
- Access statement: the tactical core is free in the browser.
- Expansion statement: optional content costs $2 per month and adds scenarios,
  units, and expanded play.
- Dominant CTA: play free.
- Secondary CTA: review the $2 expansion.
- The public play CTA renders immediately without waiting for Clerk and remains
  above the fold at the verified desktop and mobile breakpoints.

## Reporting interpretation

Operations reports the anonymous stages as period totals. It does not claim
that an itch.io view, FSG page view, play click, pricing click, sign-in prompt,
and customer record belong to the same person. A random browser-tab session
identifier is added only after optional analytics consent. Operations customer
records are labeled as all-source context until a reviewed consented
attribution join exists.
