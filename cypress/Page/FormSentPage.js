export default class FormSentPage {

    constructor() {

    }

    validateFormSent() {
        cy.url().should('include', 'formResponse');
        
        cy.contains('Se ha registrado tu respuesta.')
            .should('be.visible');
    }
}