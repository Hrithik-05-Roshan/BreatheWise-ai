import { test, expect } from "@playwright/test";

test.describe("BreatheWise AI - End-to-End User Journeys", () => {
  test("1. Landing page loads with branding, interactive visualizer, and CTA links", async ({ page }) => {
    await page.goto("/");

    // Verify Brand title & headline
    await expect(page.locator("text=Breathe smarter.")).toBeVisible();
    await expect(page.locator("text=Live healthier.")).toBeVisible();

    // Verify CTA button exists
    const ctaButton = page.locator("text=Build My Air Quality Plan");
    await expect(ctaButton.first()).toBeVisible();

    // Verify Interactive simulation card exists
    await expect(page.locator("text=Interactive City Simulation")).toBeVisible();
  });

  test("2. User completes multi-step onboarding flow and reaches personalized dashboard", async ({ page }) => {
    await page.goto("/onboarding");

    // Step 1: Location selection
    await expect(page.locator("text=Where is your household located?")).toBeVisible();
    await page.click("text=Kolkata");
    await page.click("text=Next Step");

    // Step 2: Household composition
    await expect(page.locator("text=Who lives in your home?")).toBeVisible();
    await page.click("text=Family with Children");
    await page.click("text=Next Step");

    // Step 3: Lifestyle
    await expect(page.locator("text=What is your primary daily routine?")).toBeVisible();
    await page.click("text=Office Commuter");
    await page.click("text=Next Step");

    // Step 4: Commute
    await expect(page.locator("text=How do you usually travel?")).toBeVisible();
    await page.click("text=Metro / Bus");
    await page.click("text=Next Step");

    // Step 5: Indoor environment
    await expect(page.locator("text=Your Home Living Conditions")).toBeVisible();
    await page.click("text=Next Step");

    // Step 6: Preferences & Finish
    await expect(page.locator("text=Recommendation Preferences")).toBeVisible();
    await page.click("text=Generate My Action Plan");

    // Redirection to Dashboard with Kolkata context
    await page.waitForURL(/\/dashboard/);
    await expect(page.locator("text=Kolkata Air Quality Index")).toBeVisible();
  });

  test("3. Dashboard allows switching cities and viewing smart commute analysis", async ({ page }) => {
    await page.goto("/dashboard");

    // Verify AQI card loaded
    await expect(page.locator("text=Current Air Quality (NAQI India)")).toBeVisible();

    // Switch to Smart Commute tab
    await page.click("text=Smart Commute");
    await expect(page.locator("text=Exposure vs. Carbon Trade-Off Matrix")).toBeVisible();
    await expect(page.locator("text=Public Transit (Metro / AC Bus)").first()).toBeVisible();

    // Switch to Indoor Air tab
    await page.click("text=Indoor Air");
    await expect(page.locator("text=The “Clean Room” Strategy")).toBeVisible();

    // Switch to AI Assistant tab
    await page.click("text=AI Assistant");
    await expect(page.locator("text=BreatheWise Intelligence").first()).toBeVisible();
  });
});
