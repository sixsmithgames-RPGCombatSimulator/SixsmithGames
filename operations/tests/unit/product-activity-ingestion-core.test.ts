import assert from "node:assert/strict";
import test from "node:test";
import type { ProductActivityEvent } from "@sixsmith-games/product-activity-contracts";
import type { ProductActivitySourceConfig } from "@/lib/product-activity/config";
import {
  classifyEventDelivery,
  consumeCursorPages,
  parseSourceFeedEnvelope,
  recordMatchesSourceScope,
  shouldProjectEntityRevision,
} from "@/lib/product-activity/ingestion-core";

const source: ProductActivitySourceConfig = {
  key: "vcs",
  label: "VCS authoritative feed",
  baseUrl: "https://vcs.example.test",
  environment: "production",
  productSlugs: ["virtual-combat-simulator"],
  tokenEnvironmentVariable: "VCS_ACTIVITY_READ_TOKEN",
  enabled: true,
};

const event: ProductActivityEvent = {
  contractVersion: 1,
  eventId: "evt_vcs_01JY7J6TNF",
  eventVersion: 1,
  eventType: "battle_room_created",
  productSlug: "virtual-combat-simulator",
  environment: "production",
  occurredAt: "2026-08-22T14:00:00.000Z",
  sourceApplication: "vcs-api",
  sourceApplicationVersion: "1.4.0",
  sourceIdentity: { provider: "clerk", userId: "user_2abc" },
  authorityClass: "server_confirmed",
  usageContext: "customer",
  aggregate: { type: "battle_room", id: "room_42", revision: 1 },
  outcome: "succeeded",
  dimensions: { ruleset: "dnd_5e" },
  privacyClassification: "identified_operational",
};

test("classifies exact retries as duplicates and version changes as conflicts", () => {
  assert.equal(classifyEventDelivery(1, null), "new");
  assert.equal(classifyEventDelivery(1, 1), "duplicate");
  assert.equal(classifyEventDelivery(2, 1), "version_conflict");
});

test("keeps out-of-order entity snapshots behind the current revision", () => {
  assert.equal(shouldProjectEntityRevision(8, null), true);
  assert.equal(shouldProjectEntityRevision(8, 7), true);
  assert.equal(shouldProjectEntityRevision(8, 8), false);
  assert.equal(shouldProjectEntityRevision(7, 8), false);
});

test("isolates preview and cross-product records from a production source", () => {
  assert.equal(recordMatchesSourceScope(source, event), true);
  assert.equal(recordMatchesSourceScope(source, { ...event, environment: "preview" }), false);
  assert.equal(recordMatchesSourceScope(source, { ...event, productSlug: "mastertyping" }), false);
});

test("commits a cursor only after the corresponding page projection succeeds", async () => {
  const committed: Array<string | null> = [];
  let failSecondPage = true;
  const fetchPage = async (cursor: string | null) => cursor === null
    ? { items: ["one"], nextCursor: "cursor-1", hasMore: true }
    : { items: ["two"], nextCursor: "cursor-2", hasMore: false };

  await assert.rejects(() => consumeCursorPages({
    initialCursor: null,
    fetchPage,
    processPage: async (page) => {
      if (page.items[0] === "two" && failSecondPage) throw new Error("interrupted projection");
      return String(page.items[0]);
    },
    commitCursor: async (cursor) => { (committed as Array<string | null>).push(cursor); },
  }), /interrupted projection/);
  assert.deepEqual(committed, ["cursor-1"]);

  failSecondPage = false;
  const recovered = await consumeCursorPages({
    initialCursor: committed.at(-1) ?? null,
    fetchPage,
    processPage: async (page) => String(page.items[0]),
    commitCursor: async (cursor) => { (committed as Array<string | null>).push(cursor); },
  });
  assert.equal(recovered.finalCursor, "cursor-2");
  assert.deepEqual(committed, ["cursor-1", "cursor-2"]);
});

test("rejects malformed or non-advancing feed envelopes", async () => {
  assert.throws(() => parseSourceFeedEnvelope({ contractVersion: 1, events: [], nextCursor: null, hasMore: true }, "events"), /requires a next cursor/);
  await assert.rejects(() => consumeCursorPages({
    initialCursor: "same",
    fetchPage: async () => ({ items: [], nextCursor: "same", hasMore: true }),
    processPage: async () => undefined,
    commitCursor: async () => undefined,
  }), /non-advancing cursor/);
});
