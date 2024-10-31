
import { Sections } from "../enums/Sections";

export default class FormPage {

    constructor() {
        this.sendBtn = "div[aria-label='Submit']";
        this.deleteFormOption = 'Borrar formulario';
        this.clearFormModal = "div[role='alertdialog']"
    }

    submitForm() {
        cy.get(this.sendBtn)
            .should('exist')
            .and('be.visible')
            .click()
    }

    validateFormSent() {
        cy.url().should('include', 'formResponse');
    }

    completeInput(input, text) {
        cy.get(this.nameContainer = `div[data-params*='${input}']`)
            .find('input')
            .should('exist')
            .and('be.visible')
            .clear({ force: true })
            .type(text)
            .should('have.value', text)
    }

    validateInputIsEmpty(input) {
        cy.get(this.nameContainer = `div[data-params*='${input}']`).should('have.value', '');
    }

    selectLanguage(language) {
        cy.get('[role="listbox"]').click();
        cy.get('[role="option"]').contains(language).click();
    }

    selectKnowMethod(method) {
        cy.get(this.nameContainer = `div[data-params*='Cómo nos has conocido']`)
            .find(`[role="checkbox"][aria-label="${method}"]`).click();
    }

    selectIntegrationLvl(value) {
        cy.get(this.nameContainer = `div[data-params*='sector tecnológico']`)
            .find(`label[data-ratingscale="${value}"]`).click();
    }

    selectLogisticsDigitalizationValue(value) {
        cy.get(this.nameContainer = `div[data-params*='Digitalización de la logística']`)
            .find(`div[data-value="${value}"]`).click();
    }

    selectLogisticsDDevelopmentValue(value) {
        cy.get(this.nameContainer = `div[data-params*='Desarrollo log']`)
            .find(`div[data-value="${value}"]`).click();
    }

    clearSectionSelection(section) {

        cy.get(this.nameContainer = `div[data-params*='${section}']`)
            .contains('Borrar la selección')
            .should('be.visible')
            .click();

        cy.get(this.nameContainer = `div[data-params*='${section}']`)
            .contains('Borrar la selección')
            .should('not.be.visible')
    }

    deleteForm() {
        cy.contains(this.deleteFormOption)
            .should('be.visible')
            .click()

        cy.get(this.clearFormModal)
            .should('be.visible')
            .find('div[role="heading"]')
            .should('contain.text', '¿Borrar respuestas del formulario?')

        cy.get(this.clearFormModal)
            .contains('Borrar formulario')
            .click({ force: true })

        cy.wait(2000)
    }

    validateMandatorySectionError(section) {
        cy.get(this.nameContainer = `div[data-params*='${section}']`)
            .contains('Esta pregunta es obligatoria')
            .should('be.visible')
    }

    validateSectionOnlyOneOptionIsSelected(section) {
        cy.log('Valor de section:', section);
        let isIntegrationSection = section === Sections.IAINTEGRATION;
        cy.log('Valor de isIntegrationSection:', isIntegrationSection);

        if (isIntegrationSection) {
            cy.get(this.nameContainer = `div[data-params*='${section}']`)
                .find('div[role="radio"]')
                .filter('[aria-checked="true"]')
                .should('have.length', 3);
        } else {
            cy.get(this.nameContainer = `div[data-params*='${section}']`)
                .find('div[role="radio"]')
                .filter('[aria-checked="true"]')
                .should('have.length', 1);
        }
    }

    validateMultipleCheckedOptions(section) {
        cy.get(`div[data-params*='${section}']`)
            .find('div[role="checkbox"]')
            .filter('[aria-checked="true"]')
            .should('have.length.greaterThan', 1);
    }
}