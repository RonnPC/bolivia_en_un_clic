import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage.js";
const users = require("../../data/Jsons/users.json");
import { Logger, screenshotPath } from "../../utils/helpers.js";

test.describe("Login tests", () => {
    const testCases = [
        { key: "Email valido, Contraseña valida", expectSuccess: true }, // caso exitoso
        { key: "Email valido, Contraseña invalida", expectSuccess: false },
        { key: "Email valido, Contraseña vacia", expectSuccess: false },
        { key: "Email vacio, Contraseña vacia", expectSuccess: false },
        { key: "Email vacio, Contraseña valida", expectSuccess: false },
        { key: "Email sin @, Contraseña valida", expectSuccess: false },
        { key: "Email sin @, Contraseña vacia", expectSuccess: false },
        { key: "Email sin dominio, Contraseña vacia", expectSuccess: false },
        { key: "Email sin dominio, Contraseña valida", expectSuccess: false },
        { key: "Email > 74 caracteres invalido, Contraseña valida", expectSuccess: false },
        { key: "Email <= 74 caracteres valido, Contraseña valida", expectSuccess: true },
    ];

    for (const { key, expectSuccess } of testCases) {
        test(`Test login con credenciales: ${key}`, async ({ page }) => {
            try {
                const login = new LoginPage(page);
                Logger.info(`Test login con credenciales: ${key}`);
                Logger.info("Abrir pagina de login");
                await login.gotoLogin("/");
                const creds = users[key];
                Logger.debug(`Email: ${creds.email}`);
                Logger.debug(`Contraseña: ${creds.password}`);
                await login.login(creds.email, creds.password, creds.valido);
                if (expectSuccess) {
                    await page.waitForURL('http://clicappboliviastagingwebapp.s3-website-us-east-1.amazonaws.com/home');
                    Logger.info("Login exitoso");
                } else {
                    Logger.info(`Email: ${creds.email}`);
                    Logger.info(`Password: ${creds.password}`);

                    if (creds.email === "" || creds.password === "") {
                        await login.verifyDesactivateButton();
                        Logger.error("Botón bloqueado por campo vacío");
                    }
                    else if (!creds.valido && (!creds.email.includes('@') || creds.email.length > 74)) {
                        await expect(login.invalidEmailError).toBeVisible();
                        await expect(login.invalidEmailError).toHaveText('El email tiene que ser valido.');
                        Logger.error("El email tiene que ser valido");
                    }
                    else if (!creds.valido && creds.email.includes('@') && creds.email.length <= 74) {
                        await login.verifyWrongCredentials();
                        Logger.error("Correo o contraseña incorrectos");
                    }
                    else if (creds.valido) {
                        await login.toBeVisibleError();
                        Logger.error("Login fallido");
                    }
                }

            } catch (err) {
                await page.screenshot({
                    path: screenshotPath(`Test login con credenciales: ${key}`),
                });
                Logger.error(err);
                throw err;
            }
        });
    }
});


/*
test("Verificar funcionalidad del enlace Olvide mi contraseña", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.forgotPassword();
});

test("Verificar funcionalidad del boton ingresar con Facebook", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.loginWithFacebook();
}); */