import { expect } from "@playwright/test";
const path = require('path');

export class EditGaleryCProfilePage {
    constructor(page) {
        this.page = page;
        this.selectPhoto = page.locator('label.input-file-btn-photos:has-text("Seleccionar foto")');
        this.saveButtonPhoto = page.locator('button:has-text("Guardar")').nth(1);
        this.galeryButton = 'button[data-bs-target="#collapseGaleriaFotos"]'
    }

    async selectPhotos(namePhoto) {
        if (namePhoto !== "") {
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.selectPhoto.click();
            const fileChooser = await fileChooserPromise;
            const filePath = path.resolve(__dirname, `../data/Images/${namePhoto}`);
            await fileChooser.setFiles(filePath);
        }
    }

    async saveData() {
        await this.saveButtonPhoto.click();

    }

    async countPhoto() {
        await this.page.waitForTimeout(2000);
        const galleryContainer = this.page.locator('div.row'); // o el contenedor exacto
        const photos = galleryContainer.locator('img.foto_perfil');
        const count = await photos.count();
        return count;
    }

    async deletePhoto() {
        const galleryContainer = this.page.locator('div.row'); // contenedor general
        const photoContainers = galleryContainer.locator('div.button-container');
        const lastPhotoContainer = photoContainers.last();
        const deleteButton = lastPhotoContainer.locator('button.btn.btn-danger.btn-circle');
        await deleteButton.click();
        console.log('🗑️ Imagen eliminada correctamente');
    }


    async gotoGalery() {
        await this.page.click(this.galeryButton);

    }


}