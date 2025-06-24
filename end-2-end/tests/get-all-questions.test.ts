import { test, expect } from "@playwright/test";

test("je navigue bien vers la liste des questions et je reviens sur la homepage", async ({
  page,
}) => {
  await page.goto("https://rubrr.s3-main.oktopod.app/");
  await page.getByRole("link", { name: "✨ Plus de 712 questions" }).click();

  await expect(
    page.getByText("Toutes les questions disponibles")
  ).toBeVisible();

  const table = page.getByRole("table");
  await expect(table).toBeVisible();

  await page.getByRole("link", { name: "Retour" }).click();
});
