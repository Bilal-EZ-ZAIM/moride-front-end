import { mount } from "cypress/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import authSlice from "../store/features/auth/authSlice";

describe("Login Component", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice,
      },
      preloadedState: {
        auth: { isLoading: false, errorLogin: null },
      },
    });
  });

  it("should render the login form", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    cy.get("input[name='email']").should("be.visible"); 
    cy.get("input[name='password']").should("be.visible"); 
    cy.contains("button", "Se connecter").should("be.visible"); 
  });

  it("should display an error when email is invalid", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    cy.get("input[name='email']").type("invalid-email");
    cy.contains("button", "Se connecter").click(); 

    cy.contains(/Email invalide/i).should("be.visible"); 
  });

  it("should dispatch login action on valid submission", () => {
    const mockDispatch = cy.spy().as("mockDispatch"); 
    store.dispatch = mockDispatch;

    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    cy.get("input[name='email']").type("test@example.com"); 
    cy.get("input[name='password']").type("123456");
    cy.contains("button", "Se connecter").click();

    cy.get("@mockDispatch").should("have.been.called"); 
  });
});
