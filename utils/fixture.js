import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import { HomePage } from "../pages/homePage.js";
//import { comercialProfilePage } from "../pages/comercialProfilesPage.js";
import dotenv from "dotenv";
import { ComercialProfilePage } from "../pages/comercialProfilesPage.js";

dotenv.config();

export const test = base.extend({

  loginFixture: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.login(
      process.env.EMAIL,
      process.env.PASSWORD,
      true
    );
    await page.waitForURL('http://clicappboliviastagingwebapp.s3-website-us-east-1.amazonaws.com/home', { timeout: 15000 });
    await use(page);
  },

  comercialProfileFixture: async ({ loginFixture }, use) => {
    const homePage = new HomePage(loginFixture);
    await homePage.openMenu();
    await homePage.openPerfilesComerciales();
    await loginFixture.waitForURL('**/home/perfiles*', { timeout: 15000 });
    await use(loginFixture);
  },

  editProfileFixture: async ({ comercialProfileFixture }, use) => {
    const comercialProfile = new ComercialProfilePage(comercialProfileFixture);
    await comercialProfile.editProfile();
    await comercialProfileFixture.waitForURL('**/home/perfiles/editar/**');
    await use(comercialProfileFixture);
  },
  
  editPersonalProfileFixture: async ({ loginFixture }, use) => {
    const homePage = new HomePage(loginFixture);
    await homePage.openMenu();
    await homePage.openPerfile();
    await loginFixture.waitForURL('**/home/usuario/editperfil', { timeout: 15000 });
    await use(loginFixture);
  }
});
export const expect = base.expect;