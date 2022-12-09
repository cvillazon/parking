// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email:string, password:string): any;
  }
 
  interface Chainable<Subject = any> {
    create_reservation(name:string, duration:string, license:string): any;
  }
}

function login(email:string, password:string): void {
  cy.visit("/")
  cy.get('[data-cy="login-email"]').type(email);
  cy.get('[data-cy="login-password"]').type(password);
  cy.get('[data-cy="login-submit"]').click();
}

function create_reservation(name:string, duration:string, license:string): void {

  const url = window.location.href;
  console.log(url);
  

  if(!url.includes('/parking')){
    cy.get('[data-cy="open-sidebar-button"]').click();
    cy.get('[data-cy="go-parking"]').click();
  }
  
  cy.get('[data-cy="parking-zone-item"]').eq(0).click();
  cy.get('[data-cy="parking-owner"]').click().type(name);
  cy.get('[data-cy="parking-hour"]').type(duration);
  cy.get('[data-cy="parking-license-letter"]').type(license.substring(0,3));
  cy.get('[data-cy="parking-license-number"]').type(license.substring(3)).blur();
  
  cy.get('[data-cy="create-reservation-button"]').click();
}

// NOTE: You can use it like so:
Cypress.Commands.add('login', login);
Cypress.Commands.add('create_reservation', create_reservation);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
