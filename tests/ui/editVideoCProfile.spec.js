import { test, expect } from "../../utils/fixture.js";
import { EditVideoCProfilePage } from "../../pages/editVideoCProfilesPage.js";
import { Logger, screenshotPath } from "../../utils/helpers.js";


test("Ingresar enlace valido", async ({ editProfileFixture }) => {
    const videoPage = new EditVideoCProfilePage(editProfileFixture);
    await videoPage.gotoVideo();
    await videoPage.fillCamps("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    await videoPage.saveData();
    await videoPage.validateSaveFailed(true);
});

test("Ingresar enlace invalido", async ({ editProfileFixture }) => {
    const videoPage = new EditVideoCProfilePage(editProfileFixture);
    await videoPage.gotoVideo();
    await videoPage.fillCamps("https://www.facebook.com");
    await videoPage.saveData();
    await videoPage.validateSaveFailed(false);
});

test("Ingresar enlace vacio", async ({ editProfileFixture }) => {
    const videoPage = new EditVideoCProfilePage(editProfileFixture);
    await videoPage.gotoVideo();
    await videoPage.fillCamps("");
    await videoPage.saveData();
    await videoPage.validateSaveFailed(false);
});
