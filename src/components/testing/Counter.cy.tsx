import Counter from "./Counter";

describe("<Counter />", () => {
  beforeEach(() => {
    cy.mount(<Counter />);
  });

  it("should render the counter with initial value 0", () => {
    cy.get('[data-cy="count-value"]').should("have.text", "0");
  });

  it("should increment the counter when + button is clicked", () => {
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="count-value"]').should("have.text", "7");
    cy.get('[data-cy="decrement-button"]').click();
    cy.get('[data-cy="decrement-button"]').click();
    cy.get('[data-cy="decrement-button"]').click();
    cy.get('[data-cy="decrement-button"]').click();
    cy.get('[data-cy="decrement-button"]').click();
    cy.get('[data-cy="count-value"]').should("have.text", "2");
  });

  it("should decrement the counter when - button is clicked", () => {
    cy.get('[data-cy="decrement-button"]').click();
    cy.get('[data-cy="count-value"]').should("have.text", "0");
  });
});
