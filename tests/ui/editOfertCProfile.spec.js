import { test, expect } from "../../utils/fixture.js";
import { EditOfertCProfilePage } from "../../pages/editOfertCProfilePage.js";
import { Logger, screenshotPath } from "../../utils/helpers.js";


test("Ingresar oferta valida", async ({ editProfileFixture }) => {
    const ofertPage = new EditOfertCProfilePage(editProfileFixture);
    await ofertPage.gotoOfert();
    await ofertPage.fillCamps("50% de descuento con la segunda compra");
    await ofertPage.saveData();
    await ofertPage.validateSaveFailed(true);
});

test("Ingresar oferta vacia", async ({ editProfileFixture }) => {
    const ofertPage = new EditOfertCProfilePage(editProfileFixture);
    await ofertPage.gotoOfert();
    await ofertPage.fillCamps("");
    await ofertPage.saveData();
    await ofertPage.validateSaveFailed(false);
});

