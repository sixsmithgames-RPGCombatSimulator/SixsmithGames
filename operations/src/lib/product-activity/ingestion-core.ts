import type {
  ProductActivityEvent,
  ProductEntitySnapshot,
} from "@sixsmith-games/product-activity-contracts";
import type { ProductActivitySourceConfig } from "@/lib/product-activity/config";

export const PRODUCT_ACTIVITY_PAGE_SIZE = 100;
export const PRODUCT_ACTIVITY_MAX_PAGE_COUNT = 50;

export interface SourceFeedEnvelope {
  items: unknown[];
  nextCursor: string | null;
  hasMore: boolean;
}

export class ProductActivitySourceProtocolError extends Error {
  constructor(
    message: string,
    readonly code: string,
  ) {
    super(message);
    this.name = "ProductActivitySourceProtocolError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Purpose: Parses the fixed feed envelope while retaining invalid records for rejection handling.
 * Parameters: Untrusted source JSON and the expected collection key.
 * Returns: A bounded page of unknown records plus the opaque next cursor.
 * Side effects: Throws before cursor advancement when the envelope itself is malformed.
 */
export function parseSourceFeedEnvelope(
  input: unknown,
  collectionKey: "events" | "entities",
): SourceFeedEnvelope {
  if (!isRecord(input)) {
    throw new ProductActivitySourceProtocolError("Source feed must return an object.", "invalid_feed_envelope");
  }
  const allowedKeys = new Set(["contractVersion", collectionKey, "nextCursor", "hasMore"]);
  if (Object.keys(input).some((key) => !allowedKeys.has(key))) {
    throw new ProductActivitySourceProtocolError("Source feed contains unsupported envelope fields.", "invalid_feed_envelope");
  }
  if (input.contractVersion !== 1) {
    throw new ProductActivitySourceProtocolError("Source feed contract version is unsupported.", "unsupported_contract_version");
  }
  if (!Array.isArray(input[collectionKey]) || input[collectionKey].length > PRODUCT_ACTIVITY_PAGE_SIZE) {
    throw new ProductActivitySourceProtocolError(`Source feed must provide at most ${PRODUCT_ACTIVITY_PAGE_SIZE} ${collectionKey}.`, "invalid_feed_envelope");
  }
  if (typeof input.hasMore !== "boolean" || (input.nextCursor !== null && typeof input.nextCursor !== "string")) {
    throw new ProductActivitySourceProtocolError("Source feed cursor fields are malformed.", "invalid_feed_envelope");
  }
  if (input.hasMore && !input.nextCursor) {
    throw new ProductActivitySourceProtocolError("A continuing source feed requires a next cursor.", "invalid_feed_cursor");
  }
  return { items: input[collectionKey], nextCursor: input.nextCursor, hasMore: input.hasMore };
}

/**
 * Purpose: Processes cursor pages so a cursor is committed only after its entire page succeeds.
 * Parameters: Fetch, process, and commit callbacks plus the last durable opaque cursor.
 * Returns: Page results and the final committed cursor.
 * Side effects: Delegates source reads, projections, and cursor writes; a thrown projection never advances the cursor.
 */
export async function consumeCursorPages<T>({
  initialCursor,
  fetchPage,
  processPage,
  commitCursor,
  maxPages = PRODUCT_ACTIVITY_MAX_PAGE_COUNT,
}: {
  initialCursor: string | null;
  fetchPage: (cursor: string | null) => Promise<SourceFeedEnvelope>;
  processPage: (page: SourceFeedEnvelope) => Promise<T>;
  commitCursor: (cursor: string | null, result: T) => Promise<void>;
  maxPages?: number;
}): Promise<{ finalCursor: string | null; results: T[] }> {
  let cursor = initialCursor;
  const results: T[] = [];
  for (let pageIndex = 0; pageIndex < maxPages; pageIndex += 1) {
    const page = await fetchPage(cursor);
    if (page.hasMore && page.nextCursor === cursor) {
      throw new ProductActivitySourceProtocolError("Source returned a non-advancing cursor.", "invalid_feed_cursor");
    }
    const result = await processPage(page);
    await commitCursor(page.nextCursor, result);
    cursor = page.nextCursor;
    results.push(result);
    if (!page.hasMore) return { finalCursor: cursor, results };
  }
  throw new ProductActivitySourceProtocolError("Source feed exceeded the per-sync page limit.", "page_limit_exceeded");
}

/** Purpose: Classifies repeated source event IDs without allowing a version conflict to masquerade as a retry. */
export function classifyEventDelivery(
  incomingVersion: number,
  existingVersion: number | null,
): "new" | "duplicate" | "version_conflict" {
  if (existingVersion === null) return "new";
  return existingVersion === incomingVersion ? "duplicate" : "version_conflict";
}

/** Purpose: Ensures out-of-order entity snapshots never replace a newer authoritative revision. */
export function shouldProjectEntityRevision(
  incomingRevision: number,
  currentRevision: number | null,
): boolean {
  return currentRevision === null || incomingRevision > currentRevision;
}

/** Purpose: Keeps preview, test, and cross-product records outside a configured source projection. */
export function recordMatchesSourceScope(
  source: ProductActivitySourceConfig,
  record: ProductActivityEvent | ProductEntitySnapshot,
): boolean {
  return record.environment === source.environment && source.productSlugs.includes(record.productSlug);
}
