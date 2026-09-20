# Sixsmith Games Operations

Private operations control plane for Sixsmith Games. The Stage 2 specification
and supplied mockups are treated as the product contract.

This is a separate Next.js project inside the existing SixsmithGames
repository. The public website continues to deploy from the repository root;
the operations Vercel project must use `operations` as its Root Directory.

The application currently includes:

- Executive dashboard with critical work, subscriber health, growth, products,
  support, financials, and integration freshness
- Searchable normalized customer directory and Customer 360
- Versioned campaign planning, schedule, performance, budget, and approval view
- Stripe → Clerk → product-access entitlement reconciliation with expected and
  actual evidence
- Product-level profitability and contribution-margin analysis
- Reserved, honest setup states for orders, CRM, products, support, approvals,
  and reports
- Interactive Settings workspace with live Clerk, Neon, Stripe, GameMasterCraft,
  and Virtual Combat Simulator capability checks
- First-class Analytics workspace backed by Vercel's production aggregate API,
  with traffic trends, routes, referrers, UTM sources, geography, devices,
  browsers, comparison periods, freshness, and explicit collection boundaries
- First-class Product Activity workspace backed by a source-authoritative,
  identified operational ledger with DAU/WAU/MAU, explicit active time,
  product-defined sessions and outcomes, entity summaries, Customer 360 cards,
  source freshness, rejected-record quarantine, and support deletion
- Responsive desktop and mobile navigation plus command search

## Runtime safety

There are two explicit runtime modes. The app never silently substitutes one
for the other.

### `preview`

Local review mode uses clearly labeled fictional sample data. Mutating
controls are disabled or produce an explicit “not saved or sent” message.
Preview mode is blocked when `VERCEL_ENV=production`.

### `connected`

Connected mode requires all of the following before the app will start:

- Clerk publishable and secret keys
- `OPERATIONS_ALLOWED_EMAIL=sexsmith2005@gmail.com`
- Neon Postgres connection string

Every operational read enforces authorization at the data boundary. A valid
Clerk session is not enough: the primary email must exactly match the configured
owner email. Unauthorized accounts are redirected to `/access-denied`.

## Local review

Requirements: Node.js 20.9 or newer.

```powershell
npm install
Copy-Item .env.example .env.local
npm run build
npm start
```

Then open `http://localhost:3000`.

The committed `.env.example` contains no secrets and selects preview mode.

## Production configuration

The intended production URL is:

`https://operations.sixsmithgames.com`

Configure these Vercel environment variables for Production, Preview, and
Development as appropriate:

```dotenv
OPERATIONS_RUNTIME_MODE=connected
OPERATIONS_ALLOWED_EMAIL=sexsmith2005@gmail.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...
GMC_BASE_URL=https://gmcraft.sixsmithgames.com
VCS_SERVICE_BASE_URL=https://virtualcombatsimulator-production.up.railway.app
VCS_SERVICE_API_KEY=...
VCS_SERVICE_OWNER_ID=user_...
VERCEL_ANALYTICS_READ_TOKEN=vcp_...
VERCEL_ANALYTICS_TEAM_ID=team_MV7H5Yr78mJD46i3lMjAMjOc
VERCEL_ANALYTICS_PROJECT_ID=prj_4q3lkO9SwySPux5Br1TaLKbYv0eD
VERCEL_ANALYTICS_PROJECT_NAME=sixsmithgames
VERCEL_ANALYTICS_DASHBOARD_URL=https://vercel.com/sixsmithgames-rpgcombatsimulators-projects/sixsmithgames/analytics
VERCEL_ANALYTICS_UTM_SOURCES_ENABLED=false
VERCEL_ANALYTICS_CUSTOM_EVENTS_ENABLED=false
PRODUCT_ACTIVITY_LEDGER_ENABLED=false
PRODUCT_ACTIVITY_AUTO_SYNC_ENABLED=false
PRODUCT_ACTIVITY_STALE_AFTER_MINUTES=60
PRODUCT_ACTIVITY_SOURCES_JSON=[]
VCS_PRODUCT_ACTIVITY_READ_TOKEN=
```

`STRIPE_WEBHOOK_SECRET` remains optional until an Operations-specific webhook
route is implemented and verified. Do not reuse the public website's webhook
secret for a different endpoint. Settings performs read-only capability probes;
it does not create customers, change subscriptions, or mutate product data.

`VCS_SERVICE_OWNER_ID` is optional when the Operations login email resolves in
VCS. Set it to the owner's existing VCS Clerk user ID when the product account
uses a legacy or different email mapping.

`VERCEL_ANALYTICS_READ_TOKEN` is a server-only credential used only for
read-only aggregate Web Analytics queries. Operations caches reports for 15
minutes, requests only the production environment, and does not copy raw visit
events into Neon. Missing or rejected credentials render an explicit source
state instead of a misleading zero. Keep UTM source dimensions and custom
events disabled until the required Vercel capability and spend are approved.

Product Activity is a separate data class. Its source feeds contain identified,
committed operational facts needed for customer support and product operations;
they do not contain optional click or screen telemetry. Leave the ledger flag
off until migration `0001_whole_garia.sql` is applied. Source configuration is
a JSON array of `key`, `label`, `baseUrl`, `environment`, `productSlugs`,
`tokenEnvironmentVariable`, and `enabled`. Credentials remain in the named
server-only variables and never appear in the JSON descriptor. Each source must
provide the following scoped, read-only endpoints:

- `GET /api/service/operations/v1/activity-events`
- `GET /api/service/operations/v1/entities`
- `GET /api/service/operations/v1/health`

Operations uses opaque cursors and at-least-once delivery. A source event ID is
projected once, newer entity revisions replace older summaries, an interrupted
page never advances its cursor, and schema or identity-link failures are stored
as fingerprints rather than unsafe source payloads. Enable auto-sync only after
the pilot source has passed reconciliation; manual synchronization remains
available in the Product Activity workspace.

Production reuses the existing Sixsmith Games Clerk instance rooted at
`sixsmithgames.com`, whose sessions support the `operations` subdomain. The
middleware accepts Clerk sessions only from
`https://operations.sixsmithgames.com`, and the app performs the exact owner
email check again server-side. Other users in the shared Clerk directory cannot
access operations data, so Clerk's paid production identifier allowlist is not
required. Disable end-user email-address changes for the owner account so the
authorization identifier remains stable.

Do not deploy until connected mode and all secrets are present. A production
preview deployment is intentionally rejected.

After deployment, `GET /api/v1/health` verifies the connected runtime contract,
Clerk configuration, and a live Neon query without exposing credentials.

## Database choice

The schema targets Neon Postgres through Drizzle ORM. Postgres is preferable to
MongoDB here because approvals, proposal versions, source identities,
entitlements, reconciliation results, and immutable audit events have strong
relational and consistency requirements.

The schema is in [`src/db/schema.ts`](./src/db/schema.ts). It models:

- normalized customers and external source identities
- products, subscriptions, and entitlements
- campaigns and immutable proposal versions
- approval decisions and exception work
- normalized economic events
- integration freshness and immutable audit events
- product accounts, immutable activity events, current entity summaries, daily
  rollups, opaque ingestion cursors, and payload-free rejection records

Generate and apply migrations only after a real Neon development database is
linked:

```powershell
npm run db:generate
npm run db:migrate
```

## Cost guardrail

No paid service has been provisioned by this project.

- Clerk Hobby and Neon Free can support the initial owner-only application.
- The connected Vercel account and domain must be reviewed before deployment.
- If Vercel requires a paid plan for this commercial use, deployment must wait
  for explicit owner approval.
- Email, accounting, social, and product connectors without approved read
  contracts remain deferred until credentials and permissions are intentionally
  supplied.

## Quality checks

```powershell
npm run typecheck
npm run lint
npm run build
npm run test:unit
npm run test:e2e
```

The browser verification pass covers desktop and mobile rendering, navigation,
command search, Customer 360 navigation, the guarded reconciliation proposal
interaction, and the clickable integration configuration workspace.
