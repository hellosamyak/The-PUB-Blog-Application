import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/mock/**", async (route) => {
    const url = route.request().url();

    if (url.includes("/account")) {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "No active session" }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ total: 0, rows: [] }),
    });
  });
});

test("renders the public home page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /PUB is the clean, distraction-free blogging platform/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Create account" })).toHaveAttribute(
    "href",
    "/signup",
  );
  await expect(
    page.getByRole("main").getByRole("link", { name: "Sign in" }),
  ).toHaveAttribute(
    "href",
    "/login",
  );
});

test("navigates between public authentication pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/signup$/);
  await expect(
    page.getByRole("heading", { name: "Sign up to create account" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Sign In", exact: true }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page.getByRole("heading", { name: "Sign in to your account" }),
  ).toBeVisible();
  await expect(page.getByLabel("Email:")).toBeVisible();
  await expect(page.getByLabel("Password:")).toBeVisible();
});

test("redirects unauthenticated users from protected pages", async ({ page }) => {
  await page.goto("/all-posts");

  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page.getByRole("heading", { name: "Sign in to your account" }),
  ).toBeVisible();
});

test("persists the selected theme", async ({ page }) => {
  await page.goto("/");
  const themeToggle = page.getByRole("button", { name: "Switch to dark mode" });

  await themeToggle.click();

  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(
    page.getByRole("button", { name: "Switch to light mode" }),
  ).toBeVisible();
  await expect(page.evaluate(() => localStorage.getItem("pub-theme"))).resolves.toBe(
    "dark",
  );

  await page.reload();

  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(
    page.getByRole("button", { name: "Switch to light mode" }),
  ).toBeVisible();
});
