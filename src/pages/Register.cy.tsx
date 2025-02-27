import React from "react";
import { Register } from "./Register";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/features/auth/authSlice";
import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("Login Component", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice,
      },
      preloadedState: {
        auth: { isLoading: false, errorRegister: null },
      },
    });
  });

  it("should render the login form", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("input[name='username']").should("be.visible");
    cy.get("input[name='confirmPassword']").should("be.visible");
    cy.contains("button", "Créer un compte").should("be.visible");
    cy.contains("a", "Se connecter").should("be.visible");
    cy.contains("p", "Déjà inscrit").should("be.visible");
  });

  it("should display an error when email is invalid", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    cy.get("input[name='email']");
    cy.contains("button", "Créer un compte").click();
    cy.contains(/L'email est requis/i).should("be.visible");
  });

  it("should display an error when username is required", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    cy.get("input[name='username']");
    cy.contains("button", "Créer un compte").click();
    cy.contains(/Le nom est requis/i).should("be.visible");
  });

  it("should display an error when password is required", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    cy.get("input[name='password']");
    cy.contains("button", "Créer un compte").click();
    cy.contains(/le mot de passe est requis/i).should("be.visible");
  });

  it("should display an error when password is invalid", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    cy.get("input[name='password']").type("bil");
    cy.contains("button", "Créer un compte").click();
    cy.contains(/Le mot de passe doit comporter au moins 6 caractères/i).should(
      "be.visible"
    );
  });

  it("should display an error when confirm-password is required", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    cy.get("input[name='confirmPassword']");
    cy.contains("button", "Créer un compte").click();
    cy.contains(/La confirmation du mot de passe est requise/i).should(
      "be.visible"
    );
  });

  it("should display an error when passwords do not match", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    cy.get("input[name='confirmPassword']").type("tryssdssf");
    cy.get("input[name='password']").type("bilssssssssssssssss");
    cy.contains("button", "Créer un compte").click();
    cy.contains(/Les mots de passe ne correspondent pas/i).should("be.visible");
  });

  it("should dispatch login action on valid submission", () => {
    cy.spy(store, "dispatch").as("mockDispatch");
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    cy.get("input[name='username']").type("zaimBilal");
    cy.get("input[name='email']").type("test@example.com");
    cy.get("input[name='password']").type("bilssssss");
    cy.get("input[name='confirmPassword']").type("bilssssss");
    cy.contains("button", "Créer un compte").click();
    cy.get("@mockDispatch").should("have.been.called");
  });
});
