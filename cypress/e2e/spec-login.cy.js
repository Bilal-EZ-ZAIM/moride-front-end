describe("Login Page Tests", () => {
  const emailInput = "#email";
  const passwordInput = "#password";
  const submitButton = 'button[type="submit"]';
  const errorMessage = ".text-sm.text-red-500.mt-1";

  beforeEach(() => {
    // Visit the login page
    cy.visit("http://localhost:5173/login");
  });

  it("should render all components correctly", () => {
    cy.get("h1").contains("Connexion").should("be.visible");
    cy.get(emailInput).should("exist");
    cy.get(passwordInput).should("exist");
    cy.get(submitButton).should("exist");
  });

  it("should show validation error for invalid email", () => {
    cy.get(emailInput).type("invalid-email");
    cy.get(submitButton).click();

    // Check if the error message for the email field is displayed
    cy.get(errorMessage).contains("Email invalide").should("be.visible");
  });

  it("should show validation error for empty email field", () => {
    cy.get(emailInput).clear();
    cy.get(submitButton).click();

    // Check if the required email error message is displayed
    cy.get(errorMessage).contains("L’email est requis").should("be.visible");
  });

  it("should show validation error for short password", () => {
    cy.get(passwordInput).type("12345"); // Short password (less than 6 chars)
    cy.get(submitButton).click();

    // Check if the error message for password length is displayed
    cy.get(errorMessage)
      .contains("Le mot de passe doit contenir au moins 6 caractères")
      .should("be.visible");
  });

  it("should show validation error for empty password field", () => {
    cy.get(passwordInput).clear();
    cy.get(submitButton).click();

    // Check if the required password error message is displayed
    cy.get(errorMessage)
      .contains("Le mot de passe est requis")
      .should("be.visible");
  });

  it("should submit the form with valid email and password", () => {
    // Simulate valid input
    cy.get(emailInput).type("test@example.com");
    cy.get(passwordInput).type("123456");
    cy.get(submitButton).click();

    // Check if the user is redirected to the home page after successful login
    cy.url().should("eq", "http://localhost:5173/");
  });

  it("should show error message if login fails", () => {
    // Simulate login failure (mock error message)
    cy.intercept("POST", "/api/login", {
      statusCode: 400,
      body: { message: "Nom d'utilisateur ou mot de passe incorrect" },
    }).as("loginRequest");

    cy.get(emailInput).type("test@example.com");
    cy.get(passwordInput).type("incorrectpassword");
    cy.get(submitButton).click();

    // Wait for the API response and verify error message
    cy.wait("@loginRequest");
    cy.get(".relative.bg-red-50")
      .contains("Nom d'utilisateur ou mot de passe incorrect")
      .should("be.visible");
  });

  it("should redirect to reset password page on 'Forgot password' link click", () => {
    cy.get("a").contains("Mot de passe oublié ?").click();
    cy.url().should("include", "/reset-password");
  });

  it("should redirect to register page on 'Sign Up' link click", () => {
    cy.get("p").contains("Pas encore de compte ?").find("a").click();
    cy.url().should("include", "/register");
  });
});
