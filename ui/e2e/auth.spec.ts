import { test, expect, Page } from "@playwright/test";

const login = async (page: Page) => {
    await page.goto("/_/");

    expect(page).toHaveURL(/.*\#\/login/g);

    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Email").press("Tab");
    await page.getByLabel("Password").fill("testtesttest");
    await page.getByLabel("Password").press("Tab");
    await page.getByRole("link", { name: "Forgotten password?" }).press("Tab");
    await page.getByRole("button", { name: "Login " }).press("Enter");
};

test("login redirects to users page", async ({ page }) => {
    await login(page);
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/users/);
});

test("logout", async ({ page }) => {
    await login(page);
    await page.getByRole("img", { name: "Avatar" }).click();
    await page.getByRole("button", { name: " Logout" }).click();

    await page.waitForURL(/.*\#\/login/g);
    expect(page).toHaveURL(/.*\#\/login/g);
});

test("login with wrong password", async ({ page }) => {
    await page.goto("/_/");

    expect(page).toHaveURL(/.*\#\/login/g);

    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("test@example.com");

    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Login " }).click();

    await page.waitForSelector(".alert");
    const alert = await page.$(".alert");
    expect(alert).not.toBeNull();
    expect(await alert?.innerText()).toContain("Invalid login credentials.");
});
