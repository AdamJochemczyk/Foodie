///<reference types="cypress" />
import "./commands";

beforeEach(() => {
  cy.visit("http://localhost:3000/auth/sign-in");
  cy.intercept("POST", "/auth/v1/token?grant_type=password").as("authUser");
  cy.get("input#email").type(Cypress.env("username"));
  cy.get("input#password").type(Cypress.env("password"));
  cy.get("button[type='submit']").click();
  cy.wait("@authUser");
  cy.url().should("contain", "/recipes");
});
