import React from "react";
import Footer from "./Footer"; 

describe("<Footer />", () => {
  beforeEach(() => {
    cy.mount(<Footer />); 
  });

  it("should render the logo and tagline", () => {
    cy.get('[data-cy="submit-span"]')
      .should("exist")
      .and("have.text", "MoRide");
    cy.contains(
      "Votre service de transport de confiance au Maroc. Sûr, fiable et abordable."
    ).should("exist");
  });

  it("should render quick links", () => {
    cy.contains("Liens Rapides").should("exist");
    cy.contains("Services").should("exist");
    cy.contains("Sécurité").should("exist");
    cy.contains("Devenir Chauffeur").should("exist");
    cy.contains("À Propos").should("exist");
  });

  it("should render contact information", () => {
    cy.contains("Contact").should("exist");
    cy.contains("+212 500-555-0123").should("exist");
    cy.contains("contact@moride.com").should("exist");
  });

  it("should render social media icons", () => {
    cy.get("footer").within(() => {
      cy.get('a[href="#"]').should("have.length", 3);
      cy.get("svg").should("have.length", 3); 
    });
  });

  it("should render the copyright text", () => {
    const currentYear = new Date().getFullYear();
    cy.contains(`© ${currentYear} MoRide. Tous droits réservés.`).should(
      "exist"
    );
  });
});
