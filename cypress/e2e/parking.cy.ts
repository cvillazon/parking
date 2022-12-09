describe('Parking Component', () => {
    const EMAIL = "andres.villazon@ceiba.com.co";
    const PASSWORD = "Ceiba1920876876";
    const LICENSE_LETTER = "ABC"
    const LICENSE_NUMBER = "987"
    const NAME_OWNER = "ANDRES VILLAZON"
    const HOUR = "1"

    beforeEach(() => {
        cy.login(EMAIL, PASSWORD);
    });

    it("should login and show the main view of the app", () => {
        cy.url().should("include", 'home');
        cy.get("#title_parking").should('exist');
        cy.contains('Estacionamiento Ceiba');
    })

    it("should create a reservation", () => {        
        cy.get('[data-cy="open-sidebar-button"]').click();
        cy.get('[data-cy="go-parking"]').click();

        cy.create_reservation(NAME_OWNER, HOUR, LICENSE_LETTER+LICENSE_NUMBER)

        cy.wait(500)

        cy.get('[data-cy="parking-zone-item"]').eq(0).then(($event:JQuery<HTMLElement>)=>{
            const car_parked = $event.find('.car-parked').length
            
            expect(car_parked).eq(1);
            expect($event.find('[data-cy="zone-license"] span').text()).eq(`${LICENSE_LETTER}${LICENSE_NUMBER}`);
        })

        cy.get('[data-cy="parking-zone-item"]').eq(0).then(($event:JQuery<HTMLElement>)=>{
            if($event.find('.car-parked').length){
                cy.get('[data-cy="cancel-reservation-button"]').click();
            }
        })
    })
    
    it("should cancel a reservation", () => {
        cy.visit("/")

        cy.create_reservation(NAME_OWNER, HOUR, LICENSE_LETTER+LICENSE_NUMBER)

        cy.wait(500)
        
        cy.get('[data-cy="cancel-reservation-button"]').click();

        cy.get('[data-cy="parking-zone-item"]')
            .eq(0).should("not.contain.text","Salir")

        cy.get('[data-cy="parking-zone-item"]')
            .eq(0).find(".car-parked__information").should("not.exist");
    })

    it("should show the historical license registered", () => {
        cy.visit("/")

        cy.get('[data-cy="open-sidebar-button"]').click();
        cy.get('[data-cy="go-historical-license"]').click();

        cy.get('[data-cy="table-license-plates"] thead th')
            .should("contain.text","Placa Vehicular")
            .and("contain.text","Primer Ingreso")
            .and("contain.text","N° de Servicios")
            .and("contain.text","Total de Horas")

        cy.get('[data-cy="table-license-plates"] tbody td')
            .should("have.length.gt",0)
    })

    it.only("should show the historical reservation registered", () => {
        cy.visit("/")

        cy.get('[data-cy="open-sidebar-button"]').click();
        cy.get('[data-cy="go-historical"]').click();

        cy.get('[data-cy="table-reservation"] thead th')
            .should("contain.text","Placa Vehicular")
            .and("contain.text","Fecha de Ingreso")
            .and("contain.text","Fecha de Salida")
            .and("contain.text","Valor Pagado")
            .and("contain.text","Lugar Ocupado")

        cy.get('[data-cy="table-reservation"] tbody td')
            .should("have.length.gt",0)
    })
})