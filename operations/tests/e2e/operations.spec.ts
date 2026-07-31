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

test("opens a normalized customer 360 record", async ({ page }) => {
  await page.goto("/customers");
  await page.getByRole("link", { name: /Corin Halverson/ }).click();

  await expect(page).toHaveURL(/customers\/cust-corin-halverson$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Corin Halverson" }),
  ).toBeVisible();
  await expect(page.getByText("Identity links")).toBeVisible();
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
  await expect(page.getByText("Core services are checked from the server")).toBeVisible();

  const clerkControl = page.getByRole("button", { name: /Clerk authentication/ });
  await expect(clerkControl).toBeVisible();
  await clerkControl.click();
  await expect(page.getByText("Shared Sixsmith Games Clerk production instance")).toBeVisible();

  const stripeControl = page.getByRole("button", { name: /Stripe billing/ });
  await stripeControl.click();
  await expect(page.getByText("Existing Sixsmith Games Stripe account")).toBeVisible();

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);
});
