import React from "react";
import Register from "./Register";

describe("<Register />", () => {
  beforeEach(() => {
    cy.mount(<Register />);
  });

  

  it("should return user data after successful registration", () => {
    const email = "test@example.com";
    const password = "password123";
    const confirmPassword = "password123";

    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-password"]').type(password);
    cy.get('[data-cy="input-confirm-password"]').type(confirmPassword);

    cy.get('[data-cy="submit-button"]').click();

    cy.get('[data-cy="user-data"]').should("contain", email);
    cy.get('[data-cy="user-data"]').should("contain", password);
  });

  it("should show validation errors for invalid inputs", () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-email"]').should("have.text", "Email is required");
    cy.get('[data-cy="error-password"]').should(
      "have.text",
      "Password is required"
    );
    cy.get('[data-cy="error-confirm-password"]').should(
      "have.text",
      "Passwords must match"
    );
  });
});
