# Product activity ledger

## Authority boundary

Operations is a read-only analytical projection. A room, campaign, general,
mission, game session, typing profile, or Studio workflow remains owned by its
source application. Operations may show a bounded current summary and link back
to the source; it never becomes the state authority.

Operational activity is separate from optional experience telemetry. Account-
linked committed facts support Customer 360 and support workflows even when a
user declines optional analytics. Clicks, page flows, viewport data, and
diagnostics remain consent-controlled and are not accepted by this ledger.

## Contract and privacy

`@sixsmith-games/product-activity-contracts` is the neutral contract package.
Version 1 provides:

- an event and entity catalog keyed by stable product slugs;
- lowercase `snake_case` completed domain events;
- stable provider and source-user IDs without email matching;
- authority, usage context, environment, outcome, and privacy labels;
- scalar-only event dimensions and numeric-only entity counters;
- centralized metric contribution rules;
- strict rejection of unknown fields, email-like values, and forbidden content.

Forbidden content includes campaign text, notes, chat, prompts, character
sheets, typed text, keystrokes, map contents, and unrestricted JSON. Rejection
records retain a SHA-256 fingerprint, reason, bounded metadata, and no raw
payload.

## Source feed protocol

Each server-backed product exposes scoped, read-only service endpoints:

```text
GET /api/service/operations/v1/health
GET /api/service/operations/v1/activity-events?cursor=<opaque>&limit=100
GET /api/service/operations/v1/entities?cursor=<opaque>&limit=100
```

The bearer credential is unique to the source and has read-only Operations
scope. The source returns contract version 1, an opaque `nextCursor`, and
`hasMore`. Source apps use append-only outboxes and at-least-once delivery.
Browser-first apps submit to an authenticated app-owned endpoint first; they do
not send directly to Operations.

Operations advances a cursor only after every record on that page has been
accepted, deduplicated, or quarantined. Replaying the last page is safe because
`(source_key, source_event_id)` is unique. Entity snapshots update only when the
incoming source revision is greater than the stored revision.

## Version 1 metrics

- `last_used_at`: greatest committed meaningful event time; excludes page
  views, reads, synchronization, migrations, administration, and deletion.
- `active_day`: a UTC calendar day with at least one meaningful event.
- `usage_session`: an explicit product session start or a cataloged standalone
  completion. It is never inferred from page loads.
- `completed`: a cataloged confirmed completion event.
- `active_time`: an allowlisted `active_seconds` measurement supplied by a
  product commit; Operations does not infer idle browser time.
- DAU, WAU, and MAU include only `production` + `customer` rollups.
- Owner, `internal_test`, and `automation` activity remains visible but is
  excluded from customer adoption and retention KPIs.

Metric semantics are version 1 and live in the shared package. A metric change
requires a new version and an explicit re-projection plan.

## Source states

- **Fresh**: health and cursor are inside the configured freshness target.
- **Stale**: the previous projection remains visible but is past the target.
- **Unavailable**: the source or projection cannot be read; never shown as zero.
- **Rejected**: synchronization completed with quarantined records.
- **Unconfigured**: no valid enabled source can run.
- **Disabled**: a deliberate feature gate.
- **Genuine zero**: a fresh successful source has accepted no events.

## Deletion and retention

`account_deletion_confirmed` purges the linked product account projection.
`entity_deletion_confirmed` removes the current entity summary. Customer 360
also includes an owner-only support deletion form requiring the exact phrase
`DELETE PRODUCT ACTIVITY`; it removes events, daily rollups, entity summaries,
and product-account links while retaining only an audit record.

Starting retention targets, pending legal/privacy review, are 13 months for
detailed identified events and 36 months for daily aggregates. No scheduled
retention deletion is enabled in this foundation release. It must be approved,
implemented, and verified before production source rollout.

## Safe enablement

1. Apply the Drizzle migration in the development Neon database.
2. Keep `PRODUCT_ACTIVITY_LEDGER_ENABLED=false` while validating synthetic data.
3. Configure one source descriptor and its separate read token.
4. Verify schema, forbidden fields, duplicates, out-of-order revisions, cursor
   recovery, source isolation, deletion propagation, source outage labeling,
   and desktop/mobile Customer 360.
5. Reconcile a seeded internal account against the source.
6. Enable the VCS source and ledger; leave auto-sync off for the first review.
7. Enable auto-sync only after manual synchronization remains clean.

FSG and MasterTyping source work is intentionally not layered into conflicted
or user-owned dirty worktrees. Their source endpoints remain later app phases.
