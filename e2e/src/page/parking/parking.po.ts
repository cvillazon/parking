import { by, element } from 'protractor';

export class ParkingPage {
    public idxSpot=0;

    private linkOpenCreateReservation = element(by.id('parking-zone1'));

    private inputLicensePlateLetter = element(by.id('licenseLetter'));
    private inputLicensePlateNumber = element(by.id('licenseNumber'));

    private linkCancelReservation = this.linkOpenCreateReservation.element(by.id('cancel-reservation'));

    private inputOnwer = element(by.id('nameOwner'));
    private inputHours = element(by.id('hour'));
    private buttonToMakeReservation = element(by.id('saveReservation'));

    private listaLicensePlates = element.all(by.css('table#license-plates tr'));
    private listaHistoricalReservation = element.all(by.css('table#historical-reservation tr'));

    setSpot(spot){
        this.idxSpot=spot
    }

    getTitleHome() {
        return element(by.css('#title_parking')).getText() as Promise<string>;
    }

    getCarParked(){
        return element(by.id('parking-zone1')).element(by.className('car-parked'));
    }

    async clickBotonAbrirCrearReservacion() {
        await this.linkOpenCreateReservation.click();
    }
    
    async clickBotonCancelarReservacion() {
        await this.linkCancelReservation.click();
    }

    async ingresarLicenseNumber(number) {
        await this.inputLicensePlateNumber.sendKeys(number);
    }

    async ingresarLicenseLetter(letter) {
        await this.inputLicensePlateLetter.sendKeys(letter);
    }

    async ingresarNameOwner(name) {
        await this.inputOnwer.sendKeys(name);
    }

    async ingresarHours(hours) {
        await this.inputHours.sendKeys(hours);
    }

    async clickSaveReservation() {
        await this.buttonToMakeReservation.click()
    }

    async contarLicensePlates() {
        return this.listaLicensePlates.count();
    }
    
    async contarHistoricalReservation() {
        return this.listaHistoricalReservation.count();
    }
}
