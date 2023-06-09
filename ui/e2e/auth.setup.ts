import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto("/");

    expect(page).toHaveURL(/.*\#\/login/g);

    await page.getByLabel("Email").fill("test@test.com");
    await page.getByLabel("Password").fill("password");
    await page.getByText(/.*Login.*/g).click();

    await page.context().storageState({ path: authFile });
});
