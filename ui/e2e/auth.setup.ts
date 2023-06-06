import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto("/");
    await page.getByLabel("Email").fill("test@test.com");
    await page.getByLabel("Password").fill("password");
    await page.getByText("Login").click();

    await page.context().storageState({ path: authFile });
});
