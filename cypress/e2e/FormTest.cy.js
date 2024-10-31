/// <reference types="cypress" />

import FormPage from "../Page/FormPage";
import FormSentPage from "../Page/FormSentPage";

import { Language } from "../enums/Language";
import { TextInput } from "../enums/TextInput";
import { Sections } from "../enums/Sections";

const formpage = new FormPage();
const formsentpage = new FormSentPage();

describe('Validate all web elements', () => {
    beforeEach(() => {

        cy.viewport('macbook-13')
        cy.visit(Cypress.env('baseUrl'));
    })

    it('Full Form Validation', () => {
        formpage.submitForm();
        formpage.validateMandatorySectionError(Sections.NAME);
        formpage.completeInput(TextInput.NAME, "Jorge");

        formpage.submitForm();
        formpage.validateMandatorySectionError(Sections.LASTNAME);
        formpage.completeInput(TextInput.LASTNAME, "Perez");

        formpage.submitForm();
        formpage.validateMandatorySectionError(Sections.EMAIL);
        formpage.completeInput(TextInput.EMAIL, "jorgeperez@gmail.com");

        formpage.submitForm();
        formpage.validateMandatorySectionError(Sections.BIRTHDATE);
        formpage.completeInput(TextInput.BIRTHDATE, "1988-03-05");

        formpage.deleteForm();

        formpage.completeInput(TextInput.NAME, "Jorge");
        formpage.completeInput(TextInput.LASTNAME, "Perez");
        formpage.completeInput(TextInput.EMAIL, "jorgeperez@gmail.com");
        formpage.completeInput(TextInput.BIRTHDATE, "1988-03-05");

        formpage.selectLanguage(Language.ALEMAN);

        formpage.selectKnowMethod("TV");
        formpage.selectKnowMethod("Internet");
        formpage.validateMultipleCheckedOptions(Sections.KNOWMETHOD);

        formpage.selectIntegrationLvl("3");
        formpage.validateSectionOnlyOneOptionIsSelected(Sections.IAINTEGRATION);

        formpage.selectLogisticsDigitalizationValue("2");
        formpage.selectLogisticsDigitalizationValue("4");
        formpage.validateSectionOnlyOneOptionIsSelected(Sections.LOGISTICSDIGITALIZATION);

        formpage.selectLogisticsDDevelopmentValue("1");
        formpage.selectLogisticsDDevelopmentValue("2");
        formpage.validateSectionOnlyOneOptionIsSelected(Sections.LOGISTICDEVELOPMENT);
        formpage.clearSectionSelection(Sections.LOGISTICDEVELOPMENT);
        formpage.selectLogisticsDDevelopmentValue("4");


        formpage.submitForm();
        formsentpage.validateFormSent();
    });
});

