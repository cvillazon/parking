import { by, element } from 'protractor';

export class SideBarPage {
    private goToHome = element(by.id('goHome'));
    private goToParkingReservation = element(by.id('goParking'));
    private goToHistorical = element(by.id('goHistorical'));
    private goHistoricalLicense = element(by.id('goHistoricalLicense'));

    async clickBotonGoHome() {
        await this.goToHome.click();
    }
    
    async clickBotonGoParkingReservation() {
        await this.goToParkingReservation.click();
    }
    
    async clickBotonGoHistorical() {
        await this.goToHistorical.click();
    }
    
    async clickBotonGoHistoricalLicense() {
        await this.goHistoricalLicense.click();
    }
}
