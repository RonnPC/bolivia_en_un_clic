import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        //this.loginButton = page.locator('a[href="/auth/login"]');
        this.emailInput = 'input[placeholder="Correo electrónico:"]';
        this.passwordInput = 'input[placeholder="Contraseña:"]';
        this.loginButton = this.page.locator('button', { hasText: /^Ingresar$/ });
        this.errorMessage = page.locator('#swal2-html-container');
        this.okButton = page.locator('.swal2-confirm');
        this.emptyEmailError = page.locator('.alert.alert-danger.p-1.mt-1');
        this.emptyPasswordError = page.locator('.alert.alert-danger.p-1.mt-1');
        this.invalidEmailError = this.page.locator('.alert.alert-danger');
        this.facebookButton = 'button:has-text("/^Ingresar por Facebook$/")';
        this.okButton = page.locator('.swal2-confirm.swal2-styled.swal2-default-outline');
        this.forgotPassword = "/html/body/div[1]/app-root/app-login/div/form/div/div[2]/div[3]/p/a"
    }

    async gotoLogin() {
        await this.page.goto(process.env.BASE_URL);
        await this.page.click('a[href="/auth/login"]');
        await expect(this.page).toHaveURL("/auth/login"); //tengo que poner un timeout
    }

    async login(email, password, valido) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        if(email !== "" && password !== "" && valido){
            await this.loginButton.click();
        }
    }

    async verifyDesactivateButton() {
        await expect(this.loginButton).toBeDisabled();
    }

    async verifyWrongCredentials() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText('El correo electrónico o la contraseña son incorrectos');
    await expect(this.okButton).toBeVisible();
    await this.okButton.click(); // opcional: cierra el modal
}

    async enterInvalidEmail(email, password) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async toBeVisibleError(){
        await expect(this.errorMessage).toBeVisible();
    }

    async enterEmptySpaces(email, password) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async forgotPassword() {
        await this.page.click(this.forgotPassword);
        await expect(this.page).toHaveURL("/auth/forgot-password");
    }

    async loginWithFacebook() {
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.facebookButton.click()
        ]);

        await popup.waitForLoadState();
        const popupUrl = popup.url();
        console.log('Popup de Facebook abierto en:', popupUrl);
        await expect(popupUrl).toContain('facebook.com');
    }

    async getErrorMessage() {
        return await this.page.locator(this.errorMessage).textContent();
    }
}

