import { test, expect } from "../../utils/fixture.js";
import { ComercialProfilePage } from "../../pages/comercialProfilesPage.js";
import { Logger, screenshotPath } from "../../utils/helpers.js";


test("Verificar ver perfil", async ({ comercialProfileFixture }) => {
    const comercialProfile = new ComercialProfilePage(comercialProfileFixture);
    await comercialProfile.seeProfileFirst();
});

test("Verificar duplicar perfil", async ({ comercialProfileFixture }) => {
    const comercialProfile = new ComercialProfilePage(comercialProfileFixture);
    await comercialProfile.duplicateProfileFirst();
});

test("Verificar eliminar perfil", async ({ comercialProfileFixture }) => {
    const comercialProfile = new ComercialProfilePage(comercialProfileFixture);
    await comercialProfile.deleteProfile();
});

test("Verificar editar perfil", async ({ comercialProfileFixture }) => {
    const comercialProfile = new ComercialProfilePage(comercialProfileFixture);
    await comercialProfile.editProfile();
    await comercialProfileFixture.waitForURL('**/home/perfiles/editar/**');
});