describe("Register Page E2E Test", () => {
  beforeEach(() => {
    // Visit the registration page
    cy.visit("http://localhost:5173/register");
  });

  it("should load the register page correctly", () => {
    // Check if the page loads with the correct title
    cy.contains("Créer un compte");

    // Verify the presence of the fields
    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("input[name='username']").should("be.visible");
    cy.get("input[name='confirmPassword']").should("be.visible");

    // Verify button and link presence
    cy.contains("button", "Créer un compte").should("be.visible");
    cy.contains("a", "Se connecter").should("be.visible");
    cy.contains("p", "Déjà inscrit").should("be.visible");
  });

  it("should show an error for invalid email", () => {
    cy.get("input[name='email']").type("invalid-email");
    cy.contains("button", "Créer un compte").click();

    // Verify the email error message
    cy.contains("Email invalide").should("be.visible");
  });

  it("should show an error for required fields", () => {
    // Try to submit the form without filling in any fields
    cy.contains("button", "Créer un compte").click();

    // Check if the error message for the name is shown
    cy.contains(/Le nom est requis/i).should("be.visible");

    // Check if the error message for the email is shown
    cy.contains(/L'email est requis/i).should("be.visible");

    // Check if the error message for the password is shown
    cy.contains(/Le mot de passe est requis/i).should("be.visible");

    // Check if the error message for confirm password is shown
    cy.contains(/La confirmation du mot de passe est requise/i).should("be.visible");
  });

  it("should show an error if passwords do not match", () => {
    cy.get("input[name='password']").type("password123");
    cy.get("input[name='confirmPassword']").type("differentpassword");
    cy.contains("button", "Créer un compte").click();

    // Verify the password mismatch error message
    cy.contains("Les mots de passe ne correspondent pas").should("be.visible");
  });

 

  it("should show a loading state when submitting", () => {
    // Mock the API call to simulate loading
    cy.intercept("POST", "/api/register", {
      statusCode: 200,
      body: { message: "Registration successful" },
      delayMs: 2000, // Simulate a delay
    }).as("registerApi");

    // Trigger form submission
    cy.get("input[name='username']").type("John Doe");
    cy.get("input[name='email']").type("john.doe@example.com");
    cy.get("input[name='password']").type("password123");
    cy.get("input[name='confirmPassword']").type("password123");

    cy.contains("button", "Créer un compte").click();

    // Verify the loading state is shown
    cy.contains("Chargement...").should("be.visible");

    // Wait for the API response and verify the loading state is hidden
    cy.wait("@registerApi", { timeout: 10000 }); 
    cy.contains("Chargement...").should("not.exist");
  });
});
