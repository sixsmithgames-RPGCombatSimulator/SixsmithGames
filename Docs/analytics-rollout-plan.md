# Sixsmith Games Analytics Rollout Plan

Last updated: August 10, 2026  
Status: Phase 1 implemented locally and awaiting deployment configuration

## Outcome

Operations will become the reporting surface for acquisition, product usage,
activation, retention, and revenue evidence. Collection begins with anonymous,
cookieless aggregates and adds identified or cross-session behavior only after
the visitor explicitly permits optional analytics. PostHog is the final phase,
not the initial event source.

## Measurement boundary before consent

The pre-consent goal is useful aggregate evidence without creating a durable
behavioral profile.

Collected before consent:

- page and route without query strings or fragments
- event timestamp
- referring page or domain when the browser supplies it
- approximate location, browser, operating system, and device class supplied
  by Vercel Web Analytics
- a Vercel-managed request hash that cannot follow a visitor across different
  days or websites and whose visitor session expires after 24 hours
- approved semantic event names and catalog properties when Vercel custom
  events are explicitly enabled on an eligible plan

Not collected before consent:

- Clerk, Stripe, email, name, or other account identifiers
- a Sixsmith Games persistent visitor or session identifier
- query parameters, checkout URLs, receipts, order IDs, or tokens
- campaign notes, prompts, characters, maps, or user-generated text
- keystrokes, form values, mouse coordinates, or session replay
- owner-only ContentCraft or SagaCraft routes or events
- cross-day or cross-product identity stitching

Operational security logs needed to authenticate requests, prevent abuse, or
complete purchases remain separate from analytics and use their own purpose and
retention rules.

## Phase 1 — Public-site analytics foundation

Status: Implemented locally

Deliverables:

- Add Vercel Web Analytics for anonymous, cookieless page and route aggregates.
- Strip all query strings and fragments before a page view is transmitted.
- Block owner-only product routes from page and custom-event analytics.
- Keep Google Analytics and Meta scripts behind the existing explicit choice.
- Sanitize all semantic event names and properties through one shared policy.
- Add a persistent Privacy settings control and implement withdrawal cleanup.
- Update the privacy notice and environment template.
- Keep anonymous Vercel custom events disabled until the Vercel plan and event
  cost are explicitly approved.

Production requirements:

1. Enable Web Analytics in the public-site Vercel project.
2. Confirm `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` in Production.
3. Leave `NEXT_PUBLIC_VERCEL_WEB_ANALYTICS_CUSTOM_EVENTS=false` until an
   eligible paid plan and event budget are approved.
4. Verify production and preview appear as separate environments in reporting.
5. Repeat accepted, declined, and withdrawn network checks on the deployed URL.

Exit gate:

- Anonymous page views appear in Vercel without query strings.
- Private routes produce no Vercel, GA4, or Meta analytics request.
- Declining produces no Google or Meta request.
- Accepting loads Google and Meta and records cataloged events.
- Withdrawing stops optional events and clears known optional cookies.

## Phase 2 — Anonymous analytics inside Operations

Status: Implemented locally; production token and deployment verification pending

Deliverables:

- Add a Vercel Web Analytics connector to Operations using a server-only token,
  team ID, and public-site project ID.
- Query the aggregated Web Analytics API; do not request or store a raw drain.
- Cache bounded reports and display source freshness and failure states.
- Add an Acquisition workspace with visitors, page views, routes, referrers,
  countries, device classes, browsers, and bounce rate.
- Add aggregate semantic-event reports when custom events are approved.
- Add period comparisons for 7, 30, and 90 days.

Implemented workspace:

- Dedicated primary-navigation Analytics route rather than a generic report.
- Production-only aggregate API queries cached on a shared 15-minute boundary.
- Current/prior period totals, daily trend, routes, referrers, UTM sources,
  countries, devices, operating systems, and browsers.
- Vercel capability status in Settings plus explicit unconfigured, provider
  error, true-zero, preview, and freshness states.
- No raw visit storage or anonymous identity join in Operations.

Pre-consent value:

- Nearly the entire workspace is populated by anonymous aggregate data.
- No customer timeline or returning-user history is claimed in this phase.

Exit gate:

- Operations totals match the Vercel dashboard for the same project,
  environment, filters, and dates.
- Missing credentials and provider errors never appear as zero traffic.

## Phase 3 — Shared consent and cross-subdomain analytics foundation

Status: Planned

Deliverables:

- Replace per-origin local storage with a versioned first-party consent record
  that can be honored across approved `*.sixsmithgames.com` applications.
- Separate optional analytics from advertising/marketing consent.
- Provide the same preference and withdrawal control in every product.
- Install the Phase 1 anonymous Vercel page-view boundary in GameMaster Studio,
  GameMasterCraft, and VCS, followed by other public products.
- Separate development, preview, automated test, and production event streams.
- Preserve first-touch and latest-touch UTM values only after the approved
  consent and identity rules permit doing so.

Pre-consent value:

- Anonymous pages, referrers, devices, and aggregate funnels across each
  product are available without a persistent Sixsmith Games identifier.

Exit gate:

- One choice is consistently honored across approved subdomains.
- No optional provider initializes before the applicable choice.
- Sign-out clears any consented analytics identity added in later phases.

## Phase 4 — First-party semantic product and revenue events

Status: Planned

Deliverables:

- Publish one typed event catalog shared by the website, GMC, VCS, and
  Operations.
- Add allowlisted client events for meaningful actions rather than every DOM
  click.
- Add server-authoritative events for account, checkout, subscription, refund,
  and product milestones.
- Generate event IDs and enforce idempotency for first-use and webhook events.
- Create a bounded Operations event intake and aggregate store in Neon.
- Before consent, accept only non-identifying aggregate properties and roll
  them up on a short schedule; do not store a durable visitor or session key.
- After consent, allow a pseudonymous subject and session key under the Phase 5
  identity contract.

Initial product events:

- GMC: campaign created/imported, first record created, first AI action
  completed, session prepared, and canon write confirmed.
- VCS: encounter created/opened, player view opened, combat started, first
  player joined, and encounter completed.
- Website/revenue: pricing viewed, plan selected, checkout started, checkout
  completed, subscription lifecycle, payment failure, refund, and merchandise
  order completion from verified server sources.

Exit gate:

- Payload tests reject identifiers, private content, variable event names, and
  unapproved properties.
- Client success pages never create revenue truth.
- Retry and duplicate delivery cannot inflate first-use or revenue counts.

## Phase 5 — Consented identity, sessions, retention, and Customer 360

Status: Planned

Deliverables:

- Define a stable pseudonymous analytics subject derived from Clerk identity;
  never use email as the analytics key.
- Join anonymous history only when the user has consented and policy permits it.
- Measure active time with visibility-aware activity windows and heartbeats,
  not merely the time between opening and closing a tab.
- Add first seen, last seen, active days, sessions, active minutes, products
  used, activation milestones, and a bounded recent-event timeline to Customer
  360.
- Add deletion, withdrawal, and retention jobs plus an auditable request path.
- Set and publish concrete raw-event and aggregate retention periods before
  enabling identified production events.
- Review COPPA, applicable state privacy rules, and UK/EU consent behavior with
  qualified counsel before launch.

Pre-consent value:

- Existing anonymous aggregates remain available, but Customer 360 does not
  infer identity from them.

Exit gate:

- Withdrawing consent stops new identified events and unlinks or deletes data
  according to the approved policy.
- Account deletion removes the analytics subject within the documented period.
- Session duration is labeled as estimated active time.

## Phase 6 — PostHog as the final analytics layer

Status: Planned last

Deliverables:

- Mirror the already-validated typed event catalog to PostHog after applicable
  consent; do not let PostHog define the source-of-truth schema.
- Use the pseudonymous Phase 5 subject, never email or private content.
- Reuse the shared consent and deletion controls.
- Add PostHog funnels, paths, cohorts, retention, and correlation analysis.
- Connect Operations to bounded PostHog queries only where they add insight not
  already available from Vercel and the first-party event store.
- Keep autocapture restricted and session replay disabled by default.
- If replay is later approved, require a separate review, maximum input/text
  masking, excluded private surfaces, sampling, short retention, and an
  explicit consent category.

Exit gate:

- PostHog counts reconcile with the first-party source for the same event,
  environment, and time range.
- Provider removal would not break the canonical event contract, revenue truth,
  consent record, or deletion workflow.

## Operations reporting order

1. Acquisition: anonymous visitors, views, referrers, routes, devices, and
   aggregate actions.
2. Funnel: landing to pricing, signup, checkout, and server-confirmed purchase.
3. Product: activation, weekly active accounts, active time, retention, and
   milestone completion.
4. Customer 360: consented identity, recency, frequency, products, milestones,
   billing, and a bounded activity timeline.
5. Quality: consent coverage, blocked payloads, event freshness, duplicate
   rate, provider differences, and deletion status.

## Cost gates

- Vercel anonymous page analytics may use the current plan allocation.
- Vercel custom events remain disabled until paid-plan eligibility and event
  budget are approved.
- Neon event volume receives retention and rollup limits before ingestion.
- PostHog is not provisioned until Phase 6 receives explicit approval.
- Every provider must have a spend cap or a hard collection limit where the
  provider supports one.
