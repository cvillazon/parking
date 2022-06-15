import { browser } from 'protractor';
import { AppPage } from '../app.po';
import { AuthPage } from '../page/auth/auth.po';
import { HeaderPage } from '../page/header/header.po';

describe('workspace-project Auth', () => {
    let page: AppPage;
    let auth: AuthPage;
    let header:HeaderPage;


    beforeEach(() => {
        page = new AppPage();
        auth = new AuthPage();
        header = new HeaderPage();
    });
    
    it('Deberia iniciar sesion y mostrar la pagina principal del parking', async () => {
        const PATH_LOGIN = "/login";
        const EMAIL = "andres.villazon@ceiba.com.co";
        const PASSWORD = "Ceiba1920876876";
        
        page.navigateTo();
        auth.ingresarEmail(EMAIL);
        auth.ingresarPassword(PASSWORD)
        auth.clickLogin();

        const currentURL = await browser.getCurrentUrl();

        expect(currentURL).not.toContain(PATH_LOGIN)
    });
    
    it('Deberia cerrar sesión', async () => {
        const PATH_LOGIN = "/login";

        header.clickBotonCloseSession();

        const currentURL = await browser.getCurrentUrl();

        expect(currentURL).toContain(PATH_LOGIN);
    });
});
