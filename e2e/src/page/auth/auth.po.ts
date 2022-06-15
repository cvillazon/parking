import { by, element } from 'protractor';

export class AuthPage {
    private inputEmail = element(by.id('email_auth'));
    private inputPassword = element(by.id('password_auth'));
    private buttonLogin = element(by.id('login'));

    async ingresarEmail(email) {
        await this.inputEmail.sendKeys(email);
    }

    async ingresarPassword(password) {
        await this.inputPassword.sendKeys(password);
    }

    async clickLogin() {
        await this.buttonLogin.click()
    }
}
