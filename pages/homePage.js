import { expect } from "@playwright/test";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.burguerButton = page.locator('button:has(mat-icon:has-text("menu"))');
    this.perfilesButton = page.getByText('Mis perfiles comerciales', { exact: true });
    this.editProfileButton = page.getByText('Editar Perfil', { exact: true });
  }
  async openMenu() {
    await this.burguerButton.click();
  }

  async openPerfilesComerciales() {
    await this.perfilesButton.click();
  }

  async openPerfile() {
    await this.editProfileButton.click();
  }
}