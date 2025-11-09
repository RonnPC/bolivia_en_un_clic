import { test, expect } from "../../utils/fixture.js";
import { EditGaleryCProfilePage } from "../../pages/editGaleryCProfilePage.js";
import { Logger, screenshotPath } from "../../utils/helpers.js";


test("Verificar que solo se pueda subir fotos con formato valido(JPG, PNG)", async ({ editProfileFixture }) => {
    const galeryPage = new EditGaleryCProfilePage(editProfileFixture);
    await galeryPage.gotoGalery();
    const countBefore = await galeryPage.countPhoto();
    await galeryPage.selectPhotos("profile.jpg")
    const countAfter= await galeryPage.countPhoto();
    await expect(countAfter).toBe(countBefore + 1);
    await galeryPage.saveData();
});

test("Verificar que no se pueda subir fotos con formato invalido(PDF, XLSX)", async ({ editProfileFixture }) => {
    const galeryPage = new EditGaleryCProfilePage(editProfileFixture);
    await galeryPage.gotoGalery();
    const countBefore = await galeryPage.countPhoto();
    await galeryPage.selectPhotos("Pairwise.xlsx")
    const countAfter= await galeryPage.countPhoto();
    await expect(countAfter).toBe(countBefore);
    await galeryPage.saveData();
});

test("Verificar que se pueda subir subir una foto pesada", async ({ editProfileFixture }) => {
    const galeryPage = new EditGaleryCProfilePage(editProfileFixture);
    await galeryPage.gotoGalery();
    const countBefore = await galeryPage.countPhoto();
    await galeryPage.selectPhotos("19MbPhoto.jpg")
    const countAfter= await galeryPage.countPhoto();
    await expect(countAfter).toBe(countBefore + 1);
    await galeryPage.saveData();
});

test("Verificar que se pueda eliminar una imagen", async ({ editProfileFixture }) => {
    const galeryPage = new EditGaleryCProfilePage(editProfileFixture);
    await galeryPage.gotoGalery();
    const countBefore = await galeryPage.countPhoto();
    await galeryPage.deletePhoto();
    const countAfter= await galeryPage.countPhoto();
    await expect(countAfter).toBe(countBefore - 1);
    await galeryPage.saveData();
});

test("Verificar que no se pueda subir imagenes duplicadas", async ({ editProfileFixture }) => {
    const galeryPage = new EditGaleryCProfilePage(editProfileFixture);
    await galeryPage.gotoGalery();
    const countBefore = await galeryPage.countPhoto();
    await galeryPage.selectPhotos("profile.jpg")
    await galeryPage.selectPhotos("profile.jpg")
    const countAfter= await galeryPage.countPhoto();
    await expect(countAfter).toBe(countBefore + 1);
    await galeryPage.saveData();
});