# Sixsmith Games website development instructions

## Purpose

This repository is the public acquisition, education, pricing, and account site
for Sixsmith Games. Its primary job is to help tabletop RPG Game Masters
understand and start **GameMaster Studio**, whose two flagship modules are
GameMasterCraft (campaign preparation) and Virtual Combat Simulator (live
tactical encounters).

The site must sound like a useful conversation with an experienced Game Master.
Public copy must not sound like product-management, architecture, or developer
documentation.

## Product and navigation hierarchy

1. GameMaster Studio is the flagship offer and owns the homepage story.
2. GameMasterCraft and Virtual Combat Simulator are the two primary modules.
3. GMC-only and VCS-only subscriptions remain valid focused choices.
4. ContentCraft, Four Star General, MasterTyping, and Gravity keep their product
   pages but appear only in a quiet `More from Sixsmith Games` menu.
5. SagaCraft is owner-only. It must not appear in public navigation, public
   listings, pricing, sitemap, metadata, structured content, or cross-sells.
   Only the verified Clerk primary email `sexsmith2005@gmail.com` may receive a
   SagaCraft link from this site.
6. Hiding a link is not authorization. Server-rendered SagaCraft routes and the
   SagaCraft application itself must independently enforce owner-only access.

## Claims and customer language

- `C:\SixsmithGames\PRODUCT_FACTS.md` and
  `C:\SixsmithGames\CLAIMS_REGISTER.md` control public product claims.
- Never describe planned, contract-tested, branch-only, or partially wired work
  as a shipped customer workflow.
- The Studio manual handoff adapter may be described internally as implemented
  and tested, but public copy must not promise automatic GMC-to-VCS transfer or
  automatic aftermath return until the authenticated UI is wired and verified
  against deployed GMC and VCS services.
- Do not claim perfect memory, zero contradictions, guaranteed speed, unlimited
  use, universal rules support, or automatic canon updates.
- Explain value in ordinary tabletop language: campaign notes, NPCs, factions,
  prep, maps, tokens, initiative, hit points, conditions, players, sessions,
  combat logs, and consequences.
- Game Master control is a benefit. AI help is optional and never the campaign
  authority.

## Pricing and checkout

- The public pricing page is reserved for GameMaster Studio, GMC-only, and
  VCS-only choices.
- Secondary-app subscriptions are offered and managed inside their owning
  applications, not from the Sixsmith Games pricing page.
- Checkout identifiers and displayed prices must come from the shared pricing
  and subscription configuration. Do not create a price that Stripe does not
  already support.
- Server-side billing/webhook state is authoritative. A client success screen
  never proves payment or access.

## Code quality and comments

- Read every file completely before modifying it.
- Use the existing App Router, metadata, analytics, subscription, screenshot,
  and product-content helpers instead of duplicating them.
- Keep Server Components as the default. Use Client Components only for browser
  interaction or Clerk client state.
- Every exported function or non-obvious component must have a human-readable
  comment that explains its purpose, important inputs, result, and safety or
  business rules. Comments explain why; they do not narrate obvious syntax.
- Never add silent fallbacks. If current access, checkout, or product state
  cannot be confirmed, show a plain-language failure and preserve the previous
  state.
- Prefer semantic HTML, keyboard-accessible controls, visible focus, adequate
  contrast, responsive layouts, `next/image`, and stable list keys.
- Do not expose credentials, private campaign content, internal receipts, or
  hidden owner-only product data to analytics.

## Analytics and SEO

- Measure the path from landing page to module interest, signup, checkout, and
  confirmed subscription state.
- Do not send campaign text, character data, private notes, or email addresses
  to analytics.
- Use stable lowercase `snake_case` event names and document new events in
  `C:\SixsmithGames\ANALYTICS_SPEC.md`.
- Keep canonical metadata, structured data, sitemap, robots, and `llms.txt`
  consistent with the flagship hierarchy and SagaCraft restriction.

## Content production budget

The approved stack is ChatGPT Work, Codex, Canva Free, VEED Free, and OBS
Studio. Other content/design/video/automation tools must cost `$0` unless Mike
records a new decision.

## Required verification

Before review:

1. Run the focused Jest tests.
2. Run the production build.
3. Run the relevant Playwright routes at desktop and mobile widths.
4. Verify the homepage, primary navigation, secondary menu, pricing choices,
   sign-up path, module pages, owner-only SagaCraft behavior, sitemap, metadata,
   and analytics events.
5. Record attempts, failures, fixes, and final evidence in
   `C:\SixsmithGames\GameMaster_Studio_Website_and_Marketing_Handoff.md`.

Production deployment is not implied by a successful build or preview. Use a
reviewable branch, preview deployment, and draft pull request unless Mike
explicitly authorizes production.
