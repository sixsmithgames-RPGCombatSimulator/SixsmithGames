import { expect, test } from "@playwright/test";

test("renders the executive dashboard without horizontal page overflow", async ({
  page,
}) => {
  await page.goto("/dashboard");

  await expect(
    page.getByRole("heading", { level: 1, name: "Dashboard" }),
  ).toBeVisible();
  await expect(page.getByText("Local preview · Sample data only")).toBeVisible();

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);
});

test("opens a normalized CRM customer record", async ({ page }) => {
  await page.goto("/crm");
  await page.getByRole("link", { name: /Corin Halverson/ }).click();

  await expect(page).toHaveURL(/crm\/cust-corin-halverson$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Corin Halverson" }),
  ).toBeVisible();
  await expect(page.getByText("Identity links")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Product activity ledger" })).toBeVisible();
  await expect(page.getByText("The Ashen Vault")).toBeVisible();
});

test("keeps sample reconciliation corrections non-persistent", async ({
  page,
}) => {
  await page.goto("/subscriptions/reconciliation");
  await page.getByRole("button", { name: "Request approval" }).click();

  await expect(
    page.getByText(
      "Approval request simulated locally. Nothing was saved or sent.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Approve & apply" }),
  ).toBeDisabled();
});

test("opens responsive navigation on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation is verified only in the mobile project.");
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Open navigation" }).click();

  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Subscriptions", exact: true }),
  ).toBeVisible();
});

test("provides clickable and truthful integration settings", async ({ page }) => {
  await page.goto("/settings");

  await expect(
    page.getByRole("heading", { level: 1, name: "Settings" }),
  ).toBeVisible();
  await expect(page.getByText("What Operations can access right now")).toBeVisible();

  const clerkControl = page.getByRole("button", { name: /Clerk authentication/ });
  await expect(clerkControl).toBeVisible();
  await clerkControl.click();
  await expect(page.getByText("Shared Sixsmith Games Clerk production instance")).toBeVisible();

  const stripeControl = page.getByRole("button", { name: /Stripe billing/ });
  await stripeControl.click();
  await expect(page.getByText("Existing Sixsmith Games Stripe account")).toBeVisible();

  const analyticsControl = page.getByRole("button", { name: /Vercel Web Analytics/ });
  await analyticsControl.click();
  await expect(
    page.getByText("Vercel Web Analytics for the sixsmithgames production project"),
  ).toBeVisible();

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);
});

test("renders first-class analytics with an explicit privacy boundary", async ({
  page,
}) => {
  await page.goto("/analytics?range=30d");

  await expect(
    page.getByRole("heading", { level: 1, name: "Analytics" }),
  ).toBeVisible();
  await expect(page.getByText("Cookieless aggregate measurement")).toBeVisible();
  await expect(page.getByText("Phase 1 measurement boundary")).toBeVisible();
  await expect(page.getByRole("link", { name: "Analytics", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);
});

test("reports source-authoritative product activity without masking source failures", async ({
  page,
}) => {
  await page.goto("/product-activity");

  await expect(
    page.getByRole("heading", { level: 1, name: "Product Activity" }),
  ).toBeVisible();
  await expect(page.getByText("Operational activity ledger")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Source health" })).toBeVisible();
  await expect(page.getByText("VCS authoritative feed")).toBeVisible();
  await expect(page.getByText("The source is unavailable; no zero-activity claim is made.")).toBeVisible();
  await expect(page.getByText("Privacy boundary")).toBeVisible();
  await expect(page.getByRole("button", { name: "Synchronize sources" })).toBeDisabled();
  await expect(page.getByRole("link", { name: "Product Activity", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);
});

test("opens every primary operations workspace", async ({ page }) => {
  const workspaces = [
    ["/dashboard", "Dashboard"],
    ["/analytics", "Analytics"],
    ["/product-activity", "Product Activity"],
    ["/subscriptions/reconciliation", "Entitlement Reconciliation"],
    ["/orders", "Orders"],
    ["/crm", "CRM"],
    ["/marketing", "Marketing"],
    ["/products", "Products"],
    ["/support", "Support"],
    ["/accounting", "Accounting"],
    ["/approvals", "Tasks & Approvals"],
    ["/reports", "Reports"],
    ["/settings", "Settings"],
  ] as const;

  for (const [path, heading] of workspaces) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  }
});
