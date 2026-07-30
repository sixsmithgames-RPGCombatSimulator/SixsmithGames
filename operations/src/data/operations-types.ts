export type Tone =
  | "brand"
  | "blue"
  | "green"
  | "gold"
  | "orange"
  | "purple"
  | "red"
  | "slate";

export type Severity = "Critical" | "High" | "Medium" | "Low";

export interface MetricCardData {
  label: string;
  value: string;
  comparison: string;
  detail: string;
  tone: Tone;
  icon:
    | "approvals"
    | "conflicts"
    | "exceptions"
    | "revenue"
    | "risk"
    | "subscribers";
  href: string;
}

export interface QueueItem {
  id: string;
  severity: Severity;
  reason: string;
  effect: string;
  deadline: string;
  deadlineDetail: string;
  action: string;
  evidence: string;
}

export interface GrowthStage {
  label: string;
  value: string;
  change: string;
}

export interface ProductHealth {
  slug: string;
  name: string;
  icon: string;
  activeUsers: string;
  activation: string;
  retention: string;
  status: "Healthy" | "At Risk" | "Needs Attention";
}

export interface IntegrationHealth {
  key: string;
  name: string;
  status: "Healthy" | "Degraded" | "Unconfigured";
  health: string;
  freshness: string;
}

export interface DashboardData {
  snapshotLabel: string;
  metrics: MetricCardData[];
  queue: QueueItem[];
  alerts: Array<{
    id: string;
    label: string;
    detail: string;
    age: string;
    tone: Tone;
  }>;
  subscriberHealth: {
    newSubscribers: string;
    recoveredPayments: string;
    cancellations: string;
    churnRate: string;
    plans: Array<{ name: string; value: number; amount: string; color: string }>;
    movement: Array<{ label: string; amount: string; tone: "positive" | "negative" | "neutral" }>;
  };
  growthFunnel: GrowthStage[];
  campaignSummary: {
    activeCampaigns: string;
    registrations: string;
    subscriptions: string;
    awaitingApproval: string[];
    scheduled: Array<{ date: string; title: string }>;
  };
  products: ProductHealth[];
  support: {
    open: string;
    overdue: string;
    categories: Array<{ name: string; count: string; share: string; value: number }>;
  };
  finance: {
    period: string;
    grossRevenue: string;
    refunds: string;
    stripeFees: string;
    directCosts: string;
    marketingSpend: string;
    grossProfit: string;
    margin: string;
    trend: number[];
  };
  integrations: IntegrationHealth[];
}

export interface CustomerListItem {
  id: string;
  initials: string;
  name: string;
  email: string;
  lifecycle:
    | "Subscriber"
    | "Engaged"
    | "At Risk"
    | "Payment Failed"
    | "Canceling"
    | "Churned"
    | "Win-Back";
  plan: string;
  products: string[];
  health: number;
  mrr: string;
  lastActivity: string;
  activitySource: string;
  openIssues: number;
  nextAction: string;
}

export interface CustomerSummaryData {
  total: string;
  lifecycle: Array<{ label: string; count: string; share: string; tone: Tone }>;
  health: Array<{ label: string; count: string; share: string; value: number; color: string }>;
  issues: Array<{ label: string; count: string; share: string; tone: Tone }>;
  freshness: string;
}

export interface CustomerDirectoryData {
  customers: CustomerListItem[];
  summary: CustomerSummaryData;
}

export interface CustomerDetailData {
  id: string;
  initials: string;
  name: string;
  email: string;
  lifecycle: string;
  location: string;
  health: number;
  memberSince: string;
  nextBilling: string;
  mrr: string;
  lifetimeValue: string;
  identities: Array<{ source: string; externalId: string; verified: boolean }>;
  subscription: {
    name: string;
    price: string;
    products: string[];
    status: string;
    interval: string;
    period: string;
  };
  entitlements: Array<{ name: string; icon: string; status: string; access: string }>;
  usage: Array<{ name: string; icon: string; value: string; label: string; change: string }>;
  order: {
    id: string;
    date: string;
    item: string;
    amount: string;
    status: string;
  };
  timeline: Array<{ date: string; title: string; detail: string; time: string; tone: Tone }>;
  healthSignals: string[];
  notes: string[];
  nextAction: {
    title: string;
    reason: string;
  };
}

export interface CampaignData {
  id: string;
  code: string;
  name: string;
  status: string;
  dateRange: string;
  objective: string;
  audience: string;
  offer: string;
  channelMix: string;
  attributionWindow: string;
  owner: string;
  metrics: Array<MetricCardData>;
  content: Array<{
    id: string;
    title: string;
    channel: string;
    updated: string;
    status: string;
    artwork: "ai" | "ad";
  }>;
  publications: Array<{ channel: string; title: string; date: string }>;
  schedule: Array<{
    channel: string;
    day: number;
    label: string;
    tone: Tone;
  }>;
  performance: {
    spend: string;
    registrations: string;
    costPerRegistration: string;
    subscriptions: string;
    costPerSubscription: string;
    spendSeries: number[];
    registrationSeries: number[];
    subscriptionSeries: number[];
  };
  channels: Array<{ name: string; spend: string; results: string; share: number; color: string }>;
  budget: {
    total: string;
    spend: string;
    remaining: string;
    pacing: string;
    stopLoss: string;
    forecast: string;
    progress: number;
  };
}

export interface ReconciliationItem {
  id: string;
  initials: string;
  customer: string;
  email: string;
  plan: string;
  price: string;
  stripeStatus: string;
  clerkStatus: string;
  productAccess: string;
  conflictType: string;
  conflictDetail: string;
  impact: "High" | "Medium" | "Low";
  recommendedAction: string;
  expected: {
    subscriptionId: string;
    plan: string;
    price: string;
    period: string;
    status: string;
    lastPayment: string;
  };
  actual: {
    clerkSubscriptionId: string;
    status: string;
    lastSeen: string;
    accessLevel: string;
    products: string;
    lastSync: string;
  };
  correction: string[];
}

export interface ReconciliationData {
  metrics: MetricCardData[];
  items: ReconciliationItem[];
  trend: number[];
  conflicts: Array<{ label: string; count: string; share: string; tone: Tone }>;
  impact: Array<{ label: string; count: string; share: string; value: number; tone: Tone }>;
  freshness: Array<{ label: string; age: string; status: "Healthy" | "Degraded" }>;
  lastReconciliation: string;
  nextScheduled: string;
}

export interface ProfitabilityData {
  period: string;
  metrics: MetricCardData[];
  revenueByProduct: Array<{
    name: string;
    revenue: number;
    refunds: number;
    fees: number;
  }>;
  trend: {
    grossProfit: number[];
    contribution: number[];
    netRevenue: number[];
  };
  margins: Array<{
    product: string;
    revenue: string;
    grossProfit: number;
    contribution: number;
  }>;
  costs: Array<{
    label: string;
    amount: string;
    share: number;
    color: string;
  }>;
  campaigns: Array<{
    name: string;
    spend: string;
    revenue: string;
    roi: string;
  }>;
  budgets: Array<{
    category: string;
    budget: string;
    actual: string;
    variance: string;
  }>;
  unreconciled: {
    total: string;
    count: string;
    items: Array<{ source: string; amount: string; age: string }>;
  };
}
