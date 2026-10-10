import { expect, test } from "@playwright/test";

test("shows items from the backend", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Items" })).toBeVisible();
  await expect(page.getByText("Frontend env: development")).toBeVisible();
  await expect(
    page.getByText(
      "Backend env: development - Hello from the development backend",
    ),
  ).toBeVisible();
  await expect(page.getByRole("listitem")).toHaveText([
    "Apple - $1.20",
    "Banana - $0.50",
    "Cherry - $3.00",
  ]);
});
