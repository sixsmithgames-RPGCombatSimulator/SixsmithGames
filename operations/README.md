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
  reports, and settings
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
```

Clerk should be configured in **Restricted** sign-up mode. The app performs the
exact owner-email check server-side, so Clerk’s paid production allowlist
feature is not required. Disable end-user email-address changes for the owner
account so the authorization identifier remains stable.

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
- Stripe, email, accounting, social, and product connectors remain unconfigured
  until credentials and permissions are intentionally supplied.

## Quality checks

```powershell
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

The browser verification pass covers desktop and mobile rendering, navigation,
command search, Customer 360 navigation, and the guarded reconciliation
proposal interaction.
