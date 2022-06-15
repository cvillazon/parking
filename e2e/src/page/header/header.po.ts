import { by, element } from 'protractor';

export class HeaderPage {
    private linkOpenSidebar = element(by.id('openSidebar'));
    private closeSession = element(by.id('closeSession'));

    async clickBotonOpenSideNav() {
        await this.linkOpenSidebar.click();
    }

    async clickBotonCloseSession() {
        await this.closeSession.click();
    }
}
