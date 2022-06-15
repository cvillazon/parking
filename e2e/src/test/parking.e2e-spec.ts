import { browser } from 'protractor';
import { AppPage } from '../app.po';
import { AuthPage } from '../page/auth/auth.po';
import { HeaderPage } from '../page/header/header.po';
import { ParkingPage } from '../page/parking/parking.po';
import { SideBarPage } from '../page/sidebar/sidebar.po';

describe('workspace-project Parking', () => {
    let page: AppPage;
    let auth: AuthPage;
    let sideNav: SideBarPage;
    let parking: ParkingPage;
    let header:HeaderPage;

    beforeEach(() => {
        page = new AppPage();
        auth = new AuthPage();
        sideNav = new SideBarPage();
        parking = new ParkingPage();
        header = new HeaderPage();
    });

    it('Deberia mostrar la pantalla principal del parking', async () => {
        const PATH_HOME = "/home";
        const EMAIL = 'andres.villazon@ceiba.com';
        const PASSWORD = 'Ceiba1920876876';

        page.navigateTo();
        auth.ingresarEmail(EMAIL);
        auth.ingresarPassword(PASSWORD)
        auth.clickLogin();

        const title = parking.getTitleHome();
        const currentURL = await browser.getCurrentUrl();
        
        expect(currentURL).toContain(PATH_HOME)
        expect(title).toBeTruthy();
    });
    
    it('Deberia crear una reservacion', async () => {
        const LICENSE_LETTER = "ABC"
        const LICENSE_NUMBER = "987"
        const NAME_OWNER = "ANDRES VILLAZON"
        const HOUR = "1"

        header.clickBotonOpenSideNav();

        sideNav.clickBotonGoParkingReservation();
        
        //Borrar cualquier vehiculo en spot1
        const salir = await parking.getCarParked().isPresent();
        if(salir==true){
            parking.clickBotonCancelarReservacion();
        }

        parking.clickBotonAbrirCrearReservacion();

        parking.ingresarLicenseLetter(LICENSE_LETTER);
        parking.ingresarLicenseNumber(LICENSE_NUMBER);
        parking.ingresarNameOwner(NAME_OWNER)
        parking.ingresarHours(HOUR);


        parking.clickSaveReservation();
        const salirButton = await parking.getCarParked().isPresent();

        expect(salirButton).toBe(true);
    });
    
    it('Deberia cancelar una reservacion', async () => {
        header.clickBotonOpenSideNav();

        sideNav.clickBotonGoParkingReservation();

        parking.clickBotonCancelarReservacion();

        const salirButton = await parking.getCarParked().isPresent();

        expect(salirButton).toBe(false);
    });
   
    it('Deberia listar el historial de reservas', async () => {
        header.clickBotonOpenSideNav();
        sideNav.clickBotonGoHistorical();

        const listOfReservations = parking.contarHistoricalReservation();

        expect(listOfReservations).toBeGreaterThan(0);
    });

    it('Deberia listar el historial de placas registradas', async () => {
        header.clickBotonOpenSideNav();
        sideNav.clickBotonGoHistoricalLicense();

        const listOfReservations = parking.contarLicensePlates();

        expect(listOfReservations).toBeGreaterThan(0);
    });
});
