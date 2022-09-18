/// <reference types="cypress" />

describe('Authentication works', () => {
    it('Authenticates itself correctly, when auth data is available', () => {
        cy.setAuthCookie()
        cy.visit(Cypress.env('TEST_URL'))
        cy.get('[data-test="oauth-overlay"]').should('not.exist')
    })

    it('Shows the overlay, when auth data is not available', () => {
        cy.visit(Cypress.env('TEST_URL'))
        cy.get('[data-test="oauth-overlay"]').should('exist')
    })
})
