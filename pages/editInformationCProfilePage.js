import { expect } from "@playwright/test";
const path = require('path');


export class EditInformationCProfilePage {
    constructor(page) {
        this.page = page;
        this.uploadPhotoLabel = page.locator('label.input-file-btn-photo');
        this.titleInput = page.locator('input[formcontrolname="title"]');
        this.descriptionInput = page.locator('[formcontrolname="description"]');
        this.categorySelect = 'select[formcontrolname ="category"]';
        this.subcategorySelect = 'select[formcontrolname ="subcategory"]';
        this.phoneInput = page.locator('[formcontrolname="phone"]');
        this.webInput = page.locator('[formcontrolname="web"]');
        const scheduleContainer = page.locator('aki-schedule');
        this.desdeDia = scheduleContainer.locator('.row.pt-3').nth(0).locator('label:has-text("De:")').locator('..').locator('select');
        this.hastaDia = scheduleContainer.locator('.row.pt-3').nth(0).locator('label:has-text("A:")').locator('..').locator('select');
        this.desdeHora = scheduleContainer.locator('.row.pt-3').nth(1).locator('label:has-text("Desde:")').locator('..').locator('select');
        this.hastaHora = scheduleContainer.locator('.row.pt-3').nth(1).locator('label:has-text("Hasta:")').locator('..').locator('select');
        this.abierto24Check = page.locator('label:has-text("Abierto las 24 horas")').locator('..').locator('input[type="checkbox"]');
        this.crearHorarioButton = page.locator('button:has-text("Crea horario")');
        this.saveButtonInformation = page.locator('button:has-text("Guardar")').nth(0);
    }

    async selectTechnologyAndSubcategory(category, subcategory) {
        await this.page.selectOption(this.categorySelect, { label: category });
        await this.page.waitForTimeout(2000);
        if (category !== "") {
            await this.page.selectOption(this.subcategorySelect, { label: subcategory });
        }
    }

    async selectPhoto(namePhoto) {
        if (namePhoto !== "") {
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.uploadPhotoLabel.click();
            const fileChooser = await fileChooserPromise;
            const filePath = path.resolve(__dirname, `../data/Images/${namePhoto}`);
            await fileChooser.setFiles(filePath);
        }
    }

    async setHorario(desdeDia, hastaDia, desdeHora, hastaHora) {
        await this.desdeDia.selectOption({ label: desdeDia });
        await this.hastaDia.selectOption({ label: hastaDia });
        await this.desdeHora.selectOption({ label: desdeHora });
        await this.hastaHora.selectOption({ label: hastaHora });
        await this.crearHorarioButton.click();
    }

    async fillDatas(title, description, phone, web) {
        await this.page.waitForTimeout(1000);
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.phoneInput.fill(phone);
        await this.webInput.fill(web);

    }

    async saveData() {
        await this.saveButtonInformation.click();
    }

    async validateSaveFailed(valido) {
        await this.page.waitForSelector('.swal2-popup', {timeout: 20000}
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