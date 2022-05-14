///<reference types="cypress" />
import { product } from "../../fixtures/Products/productAdd";

it("File Upload using cypress-file-upload npm package", () => {
  cy.visit("http://localhost:3000/products/add");
  cy.get("#name").type(product.name);
  cy.get("#gtincode").type(product.code);
  cy.get("#category").select("meat, eggs");
  const filepath = "images/onion.jpg";
  cy.get('input[type="file"]').attachFile(filepath);
  cy.wait(300);
  cy.get(".Button_primary__vBiQT").click();
  cy.get("button[type='submit']").click();
  cy.contains("You added product for verification").should("exist");
});
