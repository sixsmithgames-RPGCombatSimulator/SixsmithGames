import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import { count, desc } from "drizzle-orm";
import { cache } from "react";
import {
  APPROVALS,
  AUDIT_EVENTS,
  CAMPAIGNS,
  EXCEPTIONS,
  PRODUCTS,
} from "@/db/schema";
import { getDatabase } from "@/db/client";
import { requireAuthorizedOperationsUser } from "@/lib/auth/authorized-user";

type SourceState = "connected" | "empty" | "error" | "not_configured";

export interface LiveSourceSummary {
  key: string;
  label: string;
  state: SourceState;
  recordCount: number | null;
  detail: string;
}

export interface LiveCustomer {
  id: string;
  displayName: string;
  email: string;
  lifecycle: string;
  activeSubscriptions: number;
  subscriptionCount: number;
  mrrCents: number;
  currency: string;
  clerkUserId: string | null;
  stripeCustomerId: string | null;
  createdAt: string;
  lastActiveAt: string | null;
  sources: string[];
}

export interface LiveSubscription {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: string;
  planNames: string[];
  mrrCents: number;
  currency: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export interface LivePayment {
  id: string;
  customerName: string;
  customerEmail: string;
  status: string;
  grossCents: number;
  refundedCents: number;
  feeCents: number | null;
  currency: string;
  createdAt: string;
  description: string;
}

export interface LiveProduct {
  id: string;
  name: string;
  description: string;
  active: boolean;
  recurringPrices: string[];
  oneTimePrices: string[];
  subscriberCount: number;
  createdAt: string;
}

export interface LiveMerchProduct {
  slug: string;
  name: string;
  category: string;
  price: string;
  freeStudioMonths: number;
  shopUrl: string;
  unitsSold: number | null;
}

export interface LiveInternalSummary {
  state: SourceState;
  pendingApprovals: number;
  openExceptions: number;
  criticalExceptions: number;
  campaigns: number;
  products: number;
  auditEvents: number;
}

export interface LiveOperationsSnapshot {
  checkedAt: string;
  customers: LiveCustomer[];
  subscriptions: LiveSubscription[];
  payments: LivePayment[];
  products: LiveProduct[];
  merchProducts: LiveMerchProduct[];
  sources: LiveSourceSummary[];
  internal: LiveInternalSummary;
  totals: {
    activeSubscribers: number;
    monthlyRecurringCents: number;
    revenueAtRiskCents: number;
    collectedCents: number;
    refundedCents: number;
    feesCents: number | null;
    currency: string;
  };
}

interface StripeList<T> {
  data: T[];
  has_more: boolean;
}

interface StripeCustomerRecord {
  id: string;
  created: number;
  email: string | null;
  name: string | null;
}

interface StripePriceRecord {
  id: string;
  active: boolean;
  currency: string;
  nickname: string | null;
  product: string;
  type: "one_time" | "recurring";
  unit_amount: number | null;
  recurring: {
    interval: "day" | "week" | "month" | "year";
    interval_count: number;
  } | null;
}

interface StripeProductRecord {
  id: string;
  active: boolean;
  created: number;
  name: string;
  description: string | null;
}

interface StripeSubscriptionRecord {
  id: string;
  customer: string;
  status: string;
  currency: string;
  cancel_at_period_end: boolean;
  current_period_end?: number;
  items: { data: Array<{ quantity: number | null; price: StripePriceRecord }> };
}

interface StripeBalanceTransactionRecord {
  fee: number;
}

interface StripeChargeRecord {
  id: string;
  amount: number;
  amount_refunded: number;
  balance_transaction: StripeBalanceTransactionRecord | string | null;
  created: number;
  currency: string;
  customer: string | null;
  description: string | null;
  paid: boolean;
  refunded: boolean;
  status: string;
  billing_details?: { email?: string | null; name?: string | null };
}

interface StripeDataBundle {
  state: SourceState;
  customers: StripeCustomerRecord[];
  subscriptions: StripeSubscriptionRecord[];
  products: StripeProductRecord[];
  prices: StripePriceRecord[];
  charges: StripeChargeRecord[];
}

interface ClerkCustomerRecord {
  id: string;
  createdAt: number;
  lastSignInAt: number | null;
  email: string;
  name: string;
}

interface MutableCustomer {
  id: string;
  displayName: string;
  email: string;
  clerkUserId: string | null;
  stripeCustomerId: string | null;
  createdAt: string;
  lastActiveAt: string | null;
  sources: Set<string>;
}

interface StripePromotionCodeRecord {
  id: string;
  metadata: Record<string, string> | null;
}

interface MerchCatalogRecord {
  slug: string;
  name: string;
  category: string;
  price: string;
  freeStudioMonths: number;
  shopUrl: string;
}

interface MerchCatalogBundle {
  state: SourceState;
  records: MerchCatalogRecord[];
}

interface MerchSalesBundle {
  state: SourceState;
  records: StripePromotionCodeRecord[];
}

const STRIPE_API_ROOT = "https://api.stripe.com/v1";
const MERCH_CATALOG_ORIGIN = process.env.SIXSMITH_WEBSITE_ORIGIN?.trim()
  || "https://sixsmithgames.com";
const MAX_STRIPE_PAGES = 5;

/**
 * Purpose: Reads a bounded Stripe list while preserving source pagination semantics.
 * Parameters: resource is a Stripe list path and initialParams contains safe read filters.
 * Returns: Up to 500 current source records.
 * Side effects: Makes authenticated read-only Stripe requests and throws sanitized failures.
 */
async function fetchStripeList<T>(
  resource: string,
  initialParams: URLSearchParams = new URLSearchParams(),
): Promise<T[]> {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error("Stripe is not configured for Operations.");
  }

  const records: T[] = [];
  let startingAfter: string | null = null;

  for (let page = 0; page < MAX_STRIPE_PAGES; page += 1) {
    const params = new URLSearchParams(initialParams);
    params.set("limit", "100");
    if (startingAfter) {
      params.set("starting_after", startingAfter);
    }

    const response = await fetch(`${STRIPE_API_ROOT}/${resource}?${params}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${secretKey}` },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Stripe rejected the ${resource} read.`);
    }

    const payload = (await response.json()) as StripeList<T>;
    records.push(...payload.data);

    if (!payload.has_more || payload.data.length === 0) {
      break;
    }

    const lastRecord = payload.data.at(-1) as { id?: string } | undefined;
    if (!lastRecord?.id) {
      break;
    }
    startingAfter = lastRecord.id;
  }

  return records;
}

/**
 * Purpose: Loads the Stripe records needed by all current read-only workspaces.
 * Parameters: None; the server-only Stripe key supplies account scope.
 * Returns: A normalized source bundle or a truthful unavailable state.
 * Side effects: Runs independent Stripe list requests in parallel without modifying Stripe.
 */
async function loadStripeData(): Promise<StripeDataBundle> {
  if (!process.env.STRIPE_SECRET_KEY?.trim()) {
    return {
      state: "not_configured",
      customers: [],
      subscriptions: [],
      products: [],
      prices: [],
      charges: [],
    };
  }

  try {
    const subscriptionParams = new URLSearchParams({ status: "all" });
    const chargeParams = new URLSearchParams();
    chargeParams.append("expand[]", "data.balance_transaction");
    const [customers, subscriptions, products, prices, charges] = await Promise.all([
      fetchStripeList<StripeCustomerRecord>("customers"),
      fetchStripeList<StripeSubscriptionRecord>("subscriptions", subscriptionParams),
      fetchStripeList<StripeProductRecord>("products"),
      fetchStripeList<StripePriceRecord>("prices"),
      fetchStripeList<StripeChargeRecord>("charges", chargeParams),
    ]);

    return {
      state: customers.length + subscriptions.length + products.length + charges.length > 0 ? "connected" : "empty",
      customers,
      subscriptions,
      products,
      prices,
      charges,
    };
  } catch {
    return {
      state: "error",
      customers: [],
      subscriptions: [],
      products: [],
      prices: [],
      charges: [],
    };
  }
}

/** Purpose: Reads paid-order merchandise line items recorded by the signed webhook. */
async function loadMerchSales(): Promise<MerchSalesBundle> {
  if (!process.env.STRIPE_SECRET_KEY?.trim()) {
    return { state: "not_configured", records: [] };
  }

  try {
    const promotionCodes = await fetchStripeList<StripePromotionCodeRecord>("promotion_codes");
    const records = promotionCodes.filter(
      (promotion) => promotion.metadata?.benefit_type === "merch_studio_months",
    );
    return { state: records.length > 0 ? "connected" : "empty", records };
  } catch {
    return { state: "error", records: [] };
  }
}

/** Purpose: Reads the approved public merch catalog without duplicating product copy. */
async function loadMerchCatalog(): Promise<MerchCatalogBundle> {
  try {
    const response = await fetch(`${MERCH_CATALOG_ORIGIN}/api/merch-catalog`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      throw new Error("The public merchandise catalog could not be read.");
    }

    const payload = (await response.json()) as { products?: unknown };
    if (!Array.isArray(payload.products)) {
      throw new Error("The public merchandise catalog returned an invalid shape.");
    }

    const records = payload.products.flatMap<MerchCatalogRecord>((value) => {
      if (!value || typeof value !== "object") return [];
      const product = value as Record<string, unknown>;
      if (
        typeof product.slug !== "string"
        || typeof product.name !== "string"
        || typeof product.category !== "string"
        || typeof product.price !== "string"
        || typeof product.freeStudioMonths !== "number"
        || typeof product.shopUrl !== "string"
      ) {
        return [];
      }
      return [{
        slug: product.slug,
        name: product.name,
        category: product.category,
        price: product.price,
        freeStudioMonths: product.freeStudioMonths,
        shopUrl: product.shopUrl,
      }];
    });

    return { state: records.length > 0 ? "connected" : "empty", records };
  } catch {
    return { state: "error", records: [] };
  }
}

/**
 * Purpose: Reads identities from the existing shared Clerk instance for customer normalization.
 * Parameters: None; the Clerk server SDK uses the configured production secret.
 * Returns: Minimal identity fields only, never session or credential data.
 * Side effects: Makes one read-only Clerk user-list request.
 */
async function loadClerkCustomers(): Promise<{
  state: SourceState;
  records: ClerkCustomerRecord[];
}> {
  try {
    const client = await clerkClient();
    const response = await client.users.getUserList({ limit: 100 });
    const records = response.data.flatMap<ClerkCustomerRecord>((user) => {
      const emailAddress = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId,
      ) ?? user.emailAddresses[0];
      const email = emailAddress?.emailAddress.trim().toLowerCase();

      if (!email) {
        return [];
      }

      const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
      return [{
        id: user.id,
        createdAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
        email,
        name: name || email,
      }];
    });

    return { state: records.length > 0 ? "connected" : "empty", records };
  } catch {
    return { state: "error", records: [] };
  }
}

/**
 * Purpose: Reads the internal workflow counts that Operations itself owns.
 * Parameters: None; the dedicated Neon database supplies the internal state.
 * Returns: Counts for approvals, exceptions, campaigns, products, and audit events.
 * Side effects: Sends bounded aggregate queries to Neon and returns an error state on failure.
 */
async function loadInternalSummary(): Promise<LiveInternalSummary> {
  try {
    const database = getDatabase();
    const [campaignRows, productRows, auditRows, pendingRows, openExceptionRows] = await Promise.all([
      database.select({ value: count() }).from(CAMPAIGNS),
      database.select({ value: count() }).from(PRODUCTS),
      database.select({ value: count() }).from(AUDIT_EVENTS),
      database
        .select({ status: APPROVALS.status })
        .from(APPROVALS)
        .orderBy(desc(APPROVALS.expiresAt))
        .limit(200),
      database
        .select({ severity: EXCEPTIONS.severity, status: EXCEPTIONS.status })
        .from(EXCEPTIONS)
        .orderBy(desc(EXCEPTIONS.openedAt))
        .limit(200),
    ]);

    return {
      state: "connected",
      pendingApprovals: pendingRows.filter((row) => row.status === "pending").length,
      openExceptions: openExceptionRows.filter((row) => row.status !== "resolved").length,
      criticalExceptions: openExceptionRows.filter(
        (row) => row.status !== "resolved" && ["critical", "high"].includes(row.severity),
      ).length,
      campaigns: Number(campaignRows[0]?.value ?? 0),
      products: Number(productRows[0]?.value ?? 0),
      auditEvents: Number(auditRows[0]?.value ?? 0),
    };
  } catch {
    return {
      state: "error",
      pendingApprovals: 0,
      openExceptions: 0,
      criticalExceptions: 0,
      campaigns: 0,
      products: 0,
      auditEvents: 0,
    };
  }
}

/** Purpose: Converts Stripe recurring intervals to a normalized monthly amount. */
function monthlyPriceAmount(price: StripePriceRecord, quantity = 1): number {
  const unitAmount = price.unit_amount ?? 0;
  if (!price.recurring) {
    return 0;
  }

  const count = Math.max(1, price.recurring.interval_count || 1);
  const intervalMonths = {
    day: count / 30.4375,
    week: count / 4.345,
    month: count,
    year: count * 12,
  }[price.recurring.interval];

  return Math.round((unitAmount * Math.max(1, quantity)) / intervalMonths);
}

/** Purpose: Formats a Stripe price into owner-facing billing language. */
function formatPrice(price: StripePriceRecord): string {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency.toUpperCase(),
  }).format((price.unit_amount ?? 0) / 100);

  if (!price.recurring) {
    return `${price.nickname ? `${price.nickname}: ` : ""}${amount} one time`;
  }

  const count = price.recurring.interval_count;
  const cadence = count === 1
    ? price.recurring.interval
    : `${count} ${price.recurring.interval}s`;
  return `${price.nickname ? `${price.nickname}: ` : ""}${amount} / ${cadence}`;
}

/**
 * Purpose: Merges Clerk identities, Stripe customers, and Stripe subscriptions into customer records.
 * Parameters: The source bundles loaded for the current request.
 * Returns: Deduplicated customers keyed by normalized email when available.
 * Side effects: None.
 */
function normalizeCustomers(
  clerkRecords: ClerkCustomerRecord[],
  stripeCustomers: StripeCustomerRecord[],
  subscriptions: StripeSubscriptionRecord[],
): LiveCustomer[] {
  const customersByEmail = new Map<string, MutableCustomer>();
  const customersByStripeId = new Map<string, MutableCustomer>();

  for (const clerk of clerkRecords) {
    const record: MutableCustomer = {
      id: `clerk:${clerk.id}`,
      displayName: clerk.name,
      email: clerk.email,
      clerkUserId: clerk.id,
      stripeCustomerId: null,
      createdAt: new Date(clerk.createdAt).toISOString(),
      lastActiveAt: clerk.lastSignInAt ? new Date(clerk.lastSignInAt).toISOString() : null,
      sources: new Set(["Clerk"]),
    };
    customersByEmail.set(clerk.email, record);
  }

  for (const stripe of stripeCustomers) {
    const email = stripe.email?.trim().toLowerCase() || "";
    const existing = email ? customersByEmail.get(email) : undefined;
    const record = existing ?? {
      id: `stripe:${stripe.id}`,
      displayName: stripe.name?.trim() || email || "Stripe customer",
      email: email || "Email unavailable",
      clerkUserId: null,
      stripeCustomerId: stripe.id,
      createdAt: new Date(stripe.created * 1000).toISOString(),
      lastActiveAt: null,
      sources: new Set<string>(),
    };
    record.stripeCustomerId = stripe.id;
    record.sources.add("Stripe");
    if (stripe.name?.trim()) {
      record.displayName = stripe.name.trim();
    }
    if (!existing && email) {
      customersByEmail.set(email, record);
    }
    customersByStripeId.set(stripe.id, record);
  }

  const uniqueCustomers = new Map<string, MutableCustomer>();
  for (const customer of customersByEmail.values()) {
    uniqueCustomers.set(customer.id, customer);
  }
  for (const customer of customersByStripeId.values()) {
    uniqueCustomers.set(customer.id, customer);
  }

  return [...uniqueCustomers.values()].map((customer) => {
    const customerSubscriptions = customer.stripeCustomerId
      ? subscriptions.filter((subscription) => subscription.customer === customer.stripeCustomerId)
      : [];
    const activeSubscriptions = customerSubscriptions.filter((subscription) =>
      ["active", "trialing", "past_due"].includes(subscription.status),
    );
    const paymentFailed = customerSubscriptions.some((subscription) =>
      ["past_due", "unpaid"].includes(subscription.status),
    );
    const hasCanceled = customerSubscriptions.some((subscription) => subscription.status === "canceled");
    const lifecycle = paymentFailed
      ? "Payment failed"
      : activeSubscriptions.length > 0
        ? "Subscriber"
        : hasCanceled
          ? "Churned"
          : "Registered";
    const mrrCents = activeSubscriptions.reduce(
      (total, subscription) => total + subscription.items.data.reduce(
        (subtotal, item) => subtotal + monthlyPriceAmount(item.price, item.quantity ?? 1),
        0,
      ),
      0,
    );

    return {
      ...customer,
      sources: [...customer.sources].sort(),
      lifecycle,
      activeSubscriptions: activeSubscriptions.length,
      subscriptionCount: customerSubscriptions.length,
      mrrCents,
      currency: activeSubscriptions[0]?.currency ?? "usd",
    };
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Purpose: Normalizes subscription plans and customer display fields. */
function normalizeSubscriptions(
  subscriptions: StripeSubscriptionRecord[],
  products: StripeProductRecord[],
  customers: LiveCustomer[],
): LiveSubscription[] {
  const productNames = new Map(products.map((product) => [product.id, product.name]));
  const customerByStripeId = new Map(
    customers.flatMap((customer) => customer.stripeCustomerId ? [[customer.stripeCustomerId, customer] as const] : []),
  );

  return subscriptions.map((subscription) => {
    const customer = customerByStripeId.get(subscription.customer);
    return {
      id: subscription.id,
      customerId: customer?.id ?? `stripe:${subscription.customer}`,
      customerName: customer?.displayName ?? "Stripe customer",
      customerEmail: customer?.email ?? "Email unavailable",
      status: subscription.status,
      planNames: subscription.items.data.map((item) =>
        productNames.get(item.price.product) ?? item.price.id,
      ),
      mrrCents: subscription.items.data.reduce(
        (total, item) => total + monthlyPriceAmount(item.price, item.quantity ?? 1),
        0,
      ),
      currency: subscription.currency,
      currentPeriodEnd: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
  }).sort((a, b) => (b.currentPeriodEnd ?? "").localeCompare(a.currentPeriodEnd ?? ""));
}

/** Purpose: Normalizes successful and failed Stripe charges for order and accounting views. */
function normalizePayments(
  charges: StripeChargeRecord[],
  customers: LiveCustomer[],
): LivePayment[] {
  const customerByStripeId = new Map(
    customers.flatMap((customer) => customer.stripeCustomerId ? [[customer.stripeCustomerId, customer] as const] : []),
  );

  return charges.map((charge) => {
    const customer = charge.customer ? customerByStripeId.get(charge.customer) : undefined;
    const balanceTransaction = typeof charge.balance_transaction === "object"
      ? charge.balance_transaction
      : null;
    return {
      id: charge.id,
      customerName: customer?.displayName ?? charge.billing_details?.name ?? "Guest payment",
      customerEmail: customer?.email ?? charge.billing_details?.email ?? "Email unavailable",
      status: charge.status || (charge.paid ? "succeeded" : "failed"),
      grossCents: charge.amount,
      refundedCents: charge.amount_refunded,
      feeCents: balanceTransaction?.fee ?? null,
      currency: charge.currency,
      createdAt: new Date(charge.created * 1000).toISOString(),
      description: charge.description?.trim() || "Stripe payment",
    };
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Purpose: Joins active Stripe products to price options and subscriber counts. */
function normalizeProducts(
  products: StripeProductRecord[],
  prices: StripePriceRecord[],
  subscriptions: StripeSubscriptionRecord[],
): LiveProduct[] {
  const activeSubscriptions = subscriptions.filter((subscription) =>
    ["active", "trialing", "past_due"].includes(subscription.status),
  );

  return products.filter((product) => product.active).map((product) => {
    const productPrices = prices.filter((price) => price.product === product.id && price.active);
    const subscribers = new Set(
      activeSubscriptions.flatMap((subscription) =>
        subscription.items.data.some((item) => item.price.product === product.id)
          ? [subscription.customer]
          : [],
      ),
    );
    return {
      id: product.id,
      name: product.name,
      description: product.description?.trim() || "No Stripe product description",
      active: product.active,
      recurringPrices: productPrices.filter((price) => price.type === "recurring").map(formatPrice),
      oneTimePrices: productPrices.filter((price) => price.type === "one_time").map(formatPrice),
      subscriberCount: subscribers.size,
      createdAt: new Date(product.created * 1000).toISOString(),
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

/** Purpose: Combines public merch listings with units proven by signed order records. */
function normalizeMerchProducts(
  catalog: MerchCatalogRecord[],
  sales: MerchSalesBundle,
): LiveMerchProduct[] {
  const soldBySlug = new Map<string, number>();

  for (const promotion of sales.records) {
    const serializedItems = promotion.metadata?.merch_items_json;
    if (!serializedItems) continue;

    try {
      const items = JSON.parse(serializedItems) as unknown;
      if (!Array.isArray(items)) continue;

      for (const value of items) {
        if (!value || typeof value !== "object") continue;
        const item = value as Record<string, unknown>;
        if (
          typeof item.slug !== "string"
          || typeof item.quantity !== "number"
          || !Number.isInteger(item.quantity)
          || item.quantity <= 0
        ) {
          continue;
        }
        soldBySlug.set(item.slug, (soldBySlug.get(item.slug) ?? 0) + item.quantity);
      }
    } catch {
      continue;
    }
  }

  return catalog.map((product) => ({
    ...product,
    unitsSold: ["error", "not_configured"].includes(sales.state)
      ? null
      : soldBySlug.get(product.slug) ?? 0,
  }));
}

/**
 * Purpose: Builds the real-time read model used across the production operations workspaces.
 * Parameters: None; the current owner session supplies authorization and configured services supply data.
 * Returns: A source-labeled snapshot with no fabricated business records.
 * Side effects: Reads Stripe, Clerk, and Neon in parallel; never writes to an external system.
 */
export const getLiveOperationsSnapshot = cache(async (): Promise<LiveOperationsSnapshot> => {
  const user = await requireAuthorizedOperationsUser();

  if (user.isPreview) {
    throw new Error("Live operations data is unavailable in local preview mode.");
  }

  const [stripe, clerk, internal, merchCatalog, merchSales] = await Promise.all([
    loadStripeData(),
    loadClerkCustomers(),
    loadInternalSummary(),
    loadMerchCatalog(),
    loadMerchSales(),
  ]);
  const customers = normalizeCustomers(clerk.records, stripe.customers, stripe.subscriptions);
  const subscriptions = normalizeSubscriptions(stripe.subscriptions, stripe.products, customers);
  const payments = normalizePayments(stripe.charges, customers);
  const products = normalizeProducts(stripe.products, stripe.prices, stripe.subscriptions);
  const merchProducts = normalizeMerchProducts(merchCatalog.records, merchSales);
  const activeSubscriptions = subscriptions.filter((subscription) =>
    ["active", "trialing", "past_due"].includes(subscription.status),
  );
  const atRiskSubscriptions = subscriptions.filter((subscription) =>
    ["past_due", "unpaid"].includes(subscription.status) || subscription.cancelAtPeriodEnd,
  );
  const paidPayments = payments.filter((payment) => payment.status === "succeeded");
  const currency = activeSubscriptions[0]?.currency ?? paidPayments[0]?.currency ?? "usd";
  const feesKnown = paidPayments.every((payment) => payment.feeCents !== null);

  return {
    checkedAt: new Date().toISOString(),
    customers,
    subscriptions,
    payments,
    products,
    merchProducts,
    internal,
    sources: [
      {
        key: "stripe",
        label: "Stripe billing",
        state: stripe.state,
        recordCount: stripe.customers.length + stripe.subscriptions.length + stripe.charges.length + stripe.products.length,
        detail: stripe.state === "error"
          ? "Stripe did not answer one or more read requests."
          : "Customers, subscriptions, payments, products, and prices checked live.",
      },
      {
        key: "merch-catalog",
        label: "Website merch catalog",
        state: merchCatalog.state,
        recordCount: merchCatalog.records.length,
        detail: merchCatalog.state === "error"
          ? "The public Sixsmith Games merchandise catalog could not be read."
          : "Approved products and current Fourthwall listing links checked live.",
      },
      {
        key: "merch-sales",
        label: "Merch sales ledger",
        state: merchSales.state,
        recordCount: merchSales.records.length,
        detail: merchSales.state === "error"
          ? "The Stripe records created by paid Fourthwall webhooks could not be read."
          : "Paid Fourthwall orders recorded by the signed webhook checked in Stripe.",
      },
      {
        key: "clerk",
        label: "Clerk identities",
        state: clerk.state,
        recordCount: clerk.records.length,
        detail: clerk.state === "error"
          ? "Clerk identities could not be listed."
          : "Registered identities checked in the shared Sixsmith Games directory.",
      },
      {
        key: "neon",
        label: "Operations database",
        state: internal.state,
        recordCount: internal.pendingApprovals + internal.openExceptions + internal.campaigns + internal.auditEvents,
        detail: internal.state === "error"
          ? "Internal workflow records could not be read."
          : "Approvals, exceptions, campaigns, and audit history checked live.",
      },
    ],
    totals: {
      activeSubscribers: new Set(activeSubscriptions.map((subscription) => subscription.customerId)).size,
      monthlyRecurringCents: activeSubscriptions.reduce((sum, subscription) => sum + subscription.mrrCents, 0),
      revenueAtRiskCents: atRiskSubscriptions.reduce((sum, subscription) => sum + subscription.mrrCents, 0),
      collectedCents: paidPayments.reduce((sum, payment) => sum + payment.grossCents - payment.refundedCents, 0),
      refundedCents: paidPayments.reduce((sum, payment) => sum + payment.refundedCents, 0),
      feesCents: feesKnown ? paidPayments.reduce((sum, payment) => sum + (payment.feeCents ?? 0), 0) : null,
      currency,
    },
  };
});
