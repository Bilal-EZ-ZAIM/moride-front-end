import React from "react";
import FormLogin from "./FormLogin"; // التأكد من المسار الصحيح للمكون

describe("<FormLogin />", () => {
  beforeEach(() => {
    cy.mount(<FormLogin />); // قبل كل اختبار، سيتم تركيب مكون FormLogin
  });

  it("should render the login form", () => {
    // التحقق من أن النموذج يظهر
    cy.get('[data-cy="form-login"]').should("exist"); // تحقق من وجود النموذج
    cy.get('[data-cy="login"]').should("have.text", "Login"); // تحقق من النص داخل العنصر
  });

  it("should render the label form email", () => {
    // تحقق من النص داخل label الخاص بالبريد الإلكتروني
    cy.get('[data-cy="label"]').should("have.text", "Email");
  });

  it("should show validation errors when fields are empty", () => {
    // محاكاة الضغط على زر الإرسال دون إدخال بيانات
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-email"]').should("have.text", "Email is required");
    cy.get('[data-cy="error-password"]').should(
      "have.text",
      "Password is required"
    );
  });

  it("should show validation error for invalid email format", () => {
    // محاكاة إدخال بريد إلكتروني غير صالح
    cy.get('[data-cy="input-email"]').type("zaimBilal");
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-email"]').should("have.text", "Email is invalid");
  });

  it("should show validation error for invalid password format", () => {
    // محاكاة إدخال كلمة مرور غير صالحة
    cy.get('[data-cy="input-password"]').type("zaim");
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-password"]').should(
      "have.text",
      "Password must be at least 6 characters"
    );
  });

  it("should not show errors when valid email and password are provided", () => {
    // محاكاة إدخال بريد إلكتروني وكلمة مرور صالحين
    cy.get('[data-cy="input-email"]').type("zaimBilal@gmail.com");
    cy.get('[data-cy="input-password"]').type("zaimbilal");
    cy.get('[data-cy="submit-button"]').click();

    cy.get('[data-cy="error-email"]').should("not.exist");
    cy.get('[data-cy="error-password"]').should("not.exist");
  });

  it("should log form submission when valid inputs are provided", () => {
    // محاكاة إدخال بيانات صالحة في النموذج
    cy.get('[data-cy="input-email"]').type("test@example.com");
    cy.get('[data-cy="input-password"]').type("password123");
    cy.get('[data-cy="submit-button"]').click();

    // تسجيل نجاح إرسال النموذج
    cy.log("Form submitted successfully with valid inputs");
  });
});
