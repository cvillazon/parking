describe('Auth Component', () => {
    it("should login and show the main view of the app", () => {
        const EMAIL = "andres.villazon@ceiba.com.co";
        const PASSWORD = "Ceiba1920876876";

        cy.login(EMAIL, PASSWORD);

        cy.url().should("not.include", 'login');
        cy.contains('Estacionamiento Ceiba');

    })

    it("should logout and show the login view app", () => {
        const PATH_LOGIN = "/login";
        const EMAIL = "andres.villazon@ceiba.com.co";
        const PASSWORD = "Ceiba1920876876";
        cy.login(EMAIL, PASSWORD);
        
        cy.wait(500);

        cy.get('[data-cy="logout-button"]').click();

        cy.url().should("include", PATH_LOGIN);
        cy.contains('Inicio de Sesión');

    })
})