import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import dotenv from "dotenv";

dotenv.config();

export const test = base.extend({
  loginFixture: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.login(
      process.env.EMAIL,
      process.env.PASSWORD
    );
    await page.waitForURL('http://clicappboliviastagingwebapp.s3-website-us-east-1.amazonaws.com/home', { timeout: 15000 });
    await page.waitForSelector('[data-testid="create-board-tile"]', { timeout: 10000 });
    await use(page);
  }
});

export const expect = base.expect;
