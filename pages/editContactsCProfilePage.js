import { expect } from "@playwright/test";


export class EditContactsCProfilePage {
    constructor(page) {
        this.page = page;
        this.inputWP = 'input[id="whatsapp"]';
        this.inputFB = 'input[id="facebook"]';
        this.inputIG = 'input[id="instagram"]';
        this.inputTK = 'input[id="tiktok"]';
        this.inputLK = 'input[id="linkedin"]';
        this.inputTW = 'input[id="twitter"]';
        this.saveButtonContacts = page.locator('button:has-text("Guardar")').nth(2);
        this.contactsButton = 'button[data-bs-target="#collapseContactos"]'
    }

    async saveData() {
        await this.saveButtonContacts.click();

    }

    async gotoContacts() {
        await this.page.click(this.contactsButton);
    }

    async fillCamps(nroWP, facebook, instagram, tiktok, linkedin, twitter){
        await this.page.fill(this.inputWP, nroWP);
        await this.page.fill(this.inputFB, facebook);
        await this.page.fill(this.inputIG, instagram);
        await this.page.fill(this.inputTK, tiktok); 
        await this.page.fill(this.inputLK, linkedin);
        await this.page.fill(this.inputTW, twitter);
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