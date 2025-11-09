import { expect } from "@playwright/test";
const path = require('path');


export class EditProfilePage {
    constructor(page) {
        this.page = page;
        this.inputName = 'input[id="full_name"]';
        this.inputDescription = 'textarea[id="description"]';
        this.web = 'input[id="mweb"]';
        this.Wp = 'input[id="whatsapp"]';
        this.address = 'input[id="address"]';
        this.uploadPhotoButton = 'input[id="myFile"]'
        this.saveButton = page.locator('button:has-text("GUARDAR")');
    }


    async selectPhoto(namePhoto) {
        if (namePhoto !== "") {
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.page.click(this.uploadPhotoButton);
            const fileChooser = await fileChooserPromise;
            const filePath = path.resolve(__dirname, `../data/Images/${namePhoto}`);
            await fileChooser.setFiles(filePath);
        }
    }


    async fillDatas(name, description, web, wp, address) {
        await this.page.fill(this.inputName, name);
        await this.page.fill(this.inputDescription, description);
        await this.page.fill(this.web, web);
        await this.page.fill(this.Wp, wp);
        await this.page.fill(this.address, address);
    }

    async saveData() {
        await this.saveButton.click();
    }

    async validateSaveFailed(valido) {
        await this.page.waitForSelector('.swal2-popup', {timeout: 5000}
        );
        const popup = this.page.locator('.swal2-popup');
        if (await popup.isVisible()) {
            const title = await this.page.locator('#swal2-title').textContent();
            const message = await this.page.locator('#swal2-html-container').textContent();
            console.log(title);
            if (!valido) {
                expect(title).not.toContain('Datos guardados');
                expect(message).not.toContain('éxito');
            }
        } else {
            console.log("No se abre popUp");
            expect(await popup.count()).toBe(1);
        }
    }

}