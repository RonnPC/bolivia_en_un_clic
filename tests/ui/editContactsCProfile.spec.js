import { test, expect } from "../../utils/fixture.js";
import { EditContactsCProfilePage } from "../../pages/editContactsCProfilePage.js";
import { Logger, screenshotPath } from "../../utils/helpers.js";
import dataContact from "../../data/Jsons/dataContact.json";


test.describe("Add contact profile tests", () => {
    for (const data of dataContact) {
        test(`anñadir contactos : "${data.Titulo}"`, async ({ editProfileFixture }) => {
            const contactPage = new EditContactsCProfilePage(editProfileFixture);
            Logger.info("Informacion del contacto");
            try {
                await contactPage.gotoContacts();
                await contactPage.fillCamps(data.nroWP, data.facebook, data.instagram, data.tiktok, data.linkedin, data.twitter);
                await contactPage.saveData();
                await contactPage.validateSaveFailed(data.Valido);
            } catch (err) {
                await editProfileFixture.screenshot({ path: screenshotPath(`ERROR AL editar perfil comercial ${data.Titulo}`) });
                Logger.error(err);
                throw err;
            }
        });
    }
});