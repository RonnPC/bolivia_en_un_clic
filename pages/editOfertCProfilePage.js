import { expect } from "@playwright/test";


export class EditOfertCProfilePage {
    constructor(page) {
        this.page = page;
        this.inputOfert = 'input[id="promotional_text"]';
        this.saveOfertButton = page.locator('button:has-text("Guardar")').nth(6);
        this.ofertButton = 'button[data-bs-target="#collapseCasillaOfertaPromocion"]'
    }

    async saveData() {
        await this.saveOfertButton.click();

    }

    async gotoOfert() {
        await this.page.click(this.ofertButton);
    }

    async fillCamps(oferta){
        await this.page.fill(this.inputOfert, oferta);
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