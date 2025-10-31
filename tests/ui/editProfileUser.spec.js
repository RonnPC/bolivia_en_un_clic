import { test, expect } from "../../utils/fixture.js";
import { EditProfilePage } from "../../pages/editProfilePage.js";
import dataProfileUser from "../../data/Jsons/dataProfileUser.json";
import { Logger, screenshotPath } from "../../utils/helpers.js";


test.describe("Edit user profile test", () => {
    for (const data of dataProfileUser) {
        test(`editar perfil del usuario : "${data.Titulo}"`, async ({ editPersonalProfileFixture }) => {
            const editPage = new EditProfilePage(editPersonalProfileFixture);
            Logger.info("Informacion del perfil del usuario");
            try {
                await editPage.fillDatas(data.name, data.description, data.web, data.wp, data.address);
                await editPage.selectPhoto(data.photo);
                await editPage.saveData();
                await editPage.validateSaveFailed(data.Valido);
            } catch (err) {
                await editPersonalProfileFixture.screenshot({ path: screenshotPath(`Error al editar el perfil del usuario ${data.Titulo}`) });
                Logger.error(err);
                throw err;
            }
        });
    }
});