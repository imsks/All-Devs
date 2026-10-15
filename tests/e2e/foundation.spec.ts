import { expect, test } from "@playwright/test";
import { healthResponseSchema } from "@alldevs/contracts";

test("the local shell renders without pretending login is available", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Discover ideas" })).toBeVisible();
  await expect(page.getByRole("button", { name: "GitHub" })).toBeDisabled();
  await expect(page.getByText("No ideas yet.")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

test("the frontend HTTP proxy reaches the Worker foundation contract", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  expect(healthResponseSchema.parse(await response.json()).betaReady).toBe(false);
});