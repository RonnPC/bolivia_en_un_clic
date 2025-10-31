import { expect } from "@playwright/test";

export class ComercialProfilePage {
    constructor(page) {
        this.page = page;
        this.profile = page.locator('div.card.mb-3.ng-star-inserted');
        this.seeProfileButton = this.profile.first().locator('button:has-text("Ver perfil")');
        this.duplicateProfileButton = this.profile.first().locator('button:has-text("Duplicar perfil")');
        this.editProfileButton = this.profile.last().locator('button:has-text("Editar perfil")');
        this.deleteProfileButton = this.profile.last().locator('button:has-text("Eliminar perfil")');
        this.newProfileButton = page.locator('button:has-text("Nuevo")');
    }

    async seeProfileFirst() {   
        await this.seeProfileButton.click();
        await expect(this.page).toHaveURL("/home/perfiles/detalle/5485");
    }

    async duplicateProfileFirst() {
        await this.page.waitForTimeout(5000);
        const countBefore = await this.profile.count();
        console.log(`Perfiles antes de duplicar: ${countBefore}`);
        await this.duplicateProfileButton.click();
        await this.page.waitForTimeout(5000);
        await this.page.reload();
        await this.page.waitForSelector('div.card.mb-3.ng-star-inserted');
        const countAfter = await this.profile.count();
        console.log(`Perfiles después de duplicar: ${countAfter}`);
        await expect(countAfter
        ).toBe(countBefore + 1);
        console.log("El perfil se duplicó correctamente.");
        return countAfter;
    }

    async editProfile() {
        await this.editProfileButton.click();
    }

    async deleteProfile(){
        await this.page.waitForTimeout(5000);
        const countBefore = await this.duplicateProfileFirst();
        await this.deleteProfileButton.click();
        await this.page.waitForTimeout(5000);
        await this.page.reload();
        const countAfter = await this.profile.count();
        await expect(countAfter
        ).toBe(countBefore - 1);
        console.log("El perfil se eliminio correctamente.");
        return countAfter;
    }
}

