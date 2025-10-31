import { expect } from "@playwright/test";


export class EditVideoCProfilePage {
    constructor(page) {
        this.page = page;
        this.inputYouTube = 'input[id="youtube"]';
        this.saveVideoButton = page.locator('button:has-text("Guardar")').nth(4);
        this.videoButton = 'button[data-bs-target="#collapseVideoPresentacion"]'
    }

    async saveData() {
        await this.saveVideoButton.click();

    }

    async gotoVideo() {
        await this.page.click(this.videoButton);
    }

    async fillCamps(youtube){
        await this.page.fill(this.inputYouTube, youtube);
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