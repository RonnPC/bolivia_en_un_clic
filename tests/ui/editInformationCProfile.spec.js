import { test, expect } from "../../utils/fixture.js";
import { EditInformationCProfilePage } from "../../pages/editInformationCProfilePage.js";
import dataEdit from "../../data/Jsons/dataEdit.json";
import { Logger, screenshotPath } from "../../utils/helpers.js";


test.describe("Edit profile tests", () => {
    for (const data of dataEdit) {
        test(`editar perfil comercial : "${data.Titulo}"`, async ({ editProfileFixture }) => {
            const editPage = new EditInformationCProfilePage(editProfileFixture);
            Logger.info("Informacion del perfil comercial");
            try {
                await editPage.fillDatas(data.NombreNegocio, data.Descripcion, data.Telf, data.Web);
                await editPage.selectTechnologyAndSubcategory(data.Categoria, data.Subcategoria);
                await editPage.setHorario(data.Horario.desdeDia, data.Horario.hastaDia, data.Horario.desdeHora, data.Horario.hastaHora);
                await editPage.selectPhoto(data.Foto);
                await editPage.saveData();
                await editPage.validateSaveFailed(data.Valido);
            } catch (err) {
                await editProfileFixture.screenshot({ path: screenshotPath(`ERROR AL editar perfil comercial ${data.Titulo}`) });
                Logger.error(err);
                throw err;
            }
        });
    }
});