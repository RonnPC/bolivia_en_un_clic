import { expect } from "@playwright/test";


export class EditButtonsCProfilePage {
    constructor(page) {
        this.page = page;
        this.inputApp = 'input[id="app_store"]';
        this.inputOfert = 'input[id="offer"]';
        this.inputEcommerce = 'input[id="e_commerce"]';
        this.inputMenu = 'input[id="menu"]';
        this.inputCatalog = 'input[id="catalog"]';
        this.saveButtonButton = page.locator('button:has-text("Guardar")').nth(3);
        this.Button = 'button[data-bs-target="#collapseBotones"]'
    }

    async saveData() {
        await this.saveButtonButton.click();

    }

    async gotoButtons() {
        await this.page.click(this.Button);
    }

    async fillCamps(App, Ofertas, Ecommerce, Menu, Catalogo){
        await this.page.fill(this.inputApp, App);
        await this.page.fill(this.inputOfert, Ofertas);
        await this.page.fill(this.inputEcommerce, Ecommerce);
        await this.page.fill(this.inputMenu, Menu);
        await this.page.fill(this.inputCatalog, Catalogo);
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