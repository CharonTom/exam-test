import { test, expect } from "@playwright/test";

test("je choisi un tag et je soumet une réponse", async ({ page }) => {
  await page.goto("https://rubrr.s3-main.oktopod.app/");
  await page.getByRole("link", { name: "Conception BDD" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("je ne sais pas quoi répondre");
  await page.getByRole("button", { name: "Répondre" }).click();

  const textbox = page.getByRole("textbox");
  // await expect(textbox).toHaveValue("je ne sais pas quoi répondre");
  // await expect(page.getByText("Fausse")).toBeVisible();
  await expect(page.getByText("0 %")).toBeVisible();
});
