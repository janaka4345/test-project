import { expect, test } from "@playwright/test";

test("frontend and backend agree on the environment and items load", async ({
  page,
  request,
}) => {
  const res = await request.get("/config.json");
  expect(res.ok()).toBeTruthy();
  const { appEnv } = await res.json();

  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Items" })).toBeVisible();
  await expect(page.getByText(`Frontend env: ${appEnv}`)).toBeVisible();
  await expect(
    page.getByText(new RegExp(`^Backend env: ${appEnv} - `)),
  ).toBeVisible();
  await expect(page.getByRole("listitem")).toHaveText([
    "Apple - $1.20",
    "Banana - $0.50",
    "Cherry - $3.00",
  ]);
});
