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
    
    // beforeAll(()=>{
    //     //loginCredentials
    //     page.navigateTo();
    //     auth.ingresarEmail("andres.villazon@ceiba.com.co");
    //     auth.ingresarPassword("Ceiba1920876876")
    //     auth.clickLogin();
    // });

    it('Deberia mostrar la pantalla principal del parking', () => {
        page.navigateTo();
        auth.ingresarEmail("andres.villazon@ceiba.com.co");
        auth.ingresarPassword("Ceiba1920876876")
        auth.clickLogin();
        const title = parking.getTitleHome();
        expect(title).toBeTruthy();
    });
    
    it('Deberia crear una reservacion', async () => {
        header.clickBotonOpenSideNav();

        sideNav.clickBotonGoParkingReservation();
        
        //Borrar cualquier vehiculo en spot1
        const salir = await parking.getCarParked().isPresent();
        if(salir==true){
            parking.clickBotonCancelarReservacion();
        }

        parking.clickBotonAbrirCrearReservacion();

        parking.ingresarLicenseLetter("ABC");
        parking.ingresarLicenseNumber("987");

        parking.ingresarNameOwner("Andres Villazon")
        parking.ingresarHours(1);


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
});
