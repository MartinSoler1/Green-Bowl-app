/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("getDataTest", (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});

Cypress.Commands.add("clickMealItemAddButton", (item) => {
  cy.getDataTest(`meal-item-${item}`).within(() => {
    cy.get("button").click();
  });
});

Cypress.Commands.add("CheckoutFormCompleted", () => {
  cy.getDataTest("checkout-input-name").type("Frank Fladling");
  cy.getDataTest("checkout-input-address").type("Av.Olazabal 1124");
  cy.getDataTest("checkout-input-postcode").type("1124");
  cy.getDataTest("checkout-input-city").type("Buenos Aires");
});
