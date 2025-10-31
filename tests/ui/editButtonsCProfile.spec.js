import { test, expect } from "../../utils/fixture.js";
import { EditButtonsCProfilePage } from "../../pages/editButtonsCProfilePage.js";
import { Logger, screenshotPath } from "../../utils/helpers.js";
import dataButtons from "../../data/Jsons/dataButtons.json";


test.describe("Add Links profile tests", () => {
    for (const data of dataButtons) {
        test(`anñadir contactos : "${data.Titulo}"`, async ({ editProfileFixture }) => {
            const buttonPage = new EditButtonsCProfilePage(editProfileFixture);
            Logger.info("Informacion del contacto");
            try {
                await buttonPage.gotoButtons();
                await buttonPage.fillCamps(data.App, data.Ofertas, data.Ecommerce, data.Menu, data.Catalogo);
                await buttonPage.saveData();
                await buttonPage.validateSaveFailed(data.Valido);
            } catch (err) {
                await editProfileFixture.screenshot({ path: screenshotPath(`ERROR AL editar perfil comercial ${data.Titulo}`) });
                Logger.error(err);
                throw err;
            }
        });
    }
});