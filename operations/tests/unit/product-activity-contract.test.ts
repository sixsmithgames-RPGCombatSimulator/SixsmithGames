import assert from "node:assert/strict";
import test from "node:test";
import {
  getProductActivityMetricContribution,
  validateProductActivityEvent,
  validateProductEntitySnapshot,
  type ProductActivityEvent,
} from "@sixsmith-games/product-activity-contracts";

function validEvent(overrides: Partial<ProductActivityEvent> = {}): ProductActivityEvent {
  return {
    contractVersion: 1,
    eventId: "evt_vcs_01JY7J6TNF",
    eventVersion: 1,
    eventType: "encounter_completed",
    productSlug: "virtual-combat-simulator",
    environment: "test",
    occurredAt: "2026-08-22T14:00:00.000Z",
    sourceApplication: "vcs-api",
    sourceApplicationVersion: "1.4.0",
    sourceIdentity: { provider: "clerk", userId: "user_2abc" },
    authorityClass: "server_confirmed",
    usageContext: "internal_test",
    aggregate: { type: "battle_room", id: "room_42", revision: 18 },
    activitySessionId: "encounter_42",
    correlationId: "corr_42",
    outcome: "succeeded",
    dimensions: { round_count: 8, action_count: 34, active_seconds: 920 },
    privacyClassification: "identified_operational",
    ...overrides,
  };
}

test("accepts a cataloged scalar-only authoritative event", () => {
  const result = validateProductActivityEvent(validEvent());
  assert.equal(result.ok, true);
});

test("rejects forbidden fields and email-like values", () => {
  const event = {
    ...validEvent(),
    notes: "private campaign note",
    campaignText: "private campaign text",
    sourceIdentity: { provider: "clerk", userId: "player@example.com" },
  };
  const result = validateProductActivityEvent(event);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.some((error) => error.code === "forbidden_field"));
    assert.ok(result.errors.some((error) => error.code === "forbidden_value"));
  }
});

test("deletion propagation does not count as meaningful product use", () => {
  const deletion = validEvent({
    eventType: "account_deletion_confirmed",
    outcome: "deleted",
    dimensions: {},
  });
  assert.deepEqual(getProductActivityMetricContribution(deletion), {
    metricVersion: 1,
    meaningfulEvents: 0,
    sessions: 0,
    completions: 0,
    activeSeconds: 0,
  });
});

test("rejects unknown dimensions and product-event mismatches", () => {
  const result = validateProductActivityEvent(validEvent({
    productSlug: "mastertyping",
    dimensions: { raw_payload: "anything" },
  }));
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.some((error) => error.code === "unsupported_product_event"));
    assert.ok(result.errors.some((error) => error.code === "unsupported_dimension"));
  }
});

test("accepts only allowlisted entity summary counters", () => {
  const result = validateProductEntitySnapshot({
    contractVersion: 1,
    productSlug: "virtual-combat-simulator",
    environment: "test",
    sourceApplication: "vcs-api",
    sourceApplicationVersion: "1.4.0",
    sourceIdentity: { provider: "clerk", userId: "user_2abc" },
    authorityClass: "server_confirmed",
    usageContext: "internal_test",
    aggregate: { type: "battle_room", id: "room_42", revision: 18 },
    displayLabel: "The Ashen Vault",
    status: "active",
    createdAt: "2026-08-01T14:00:00.000Z",
    lastMeaningfulActivityAt: "2026-08-22T14:00:00.000Z",
    counters: { participant_count: 5, encounter_count: 3 },
    sourceUrl: "https://vcs.example.test/rooms/room_42",
    privacyClassification: "identified_private_summary",
  });
  assert.equal(result.ok, true);
});

test("central metric semantics exclude page-load inference", () => {
  assert.deepEqual(getProductActivityMetricContribution(validEvent()), {
    metricVersion: 1,
    meaningfulEvents: 1,
    sessions: 0,
    completions: 1,
    activeSeconds: 920,
  });
});
