// Libraries
import React from 'react';

// Components
import OAuthOverlay from './OAuthOverlay';

describe('<OAuthOverlay />', () => {
    it('authorize button exists and links correctly', () => {
        cy.mount(<OAuthOverlay />)
        cy.get('[data-test="authorize-app"]')
            .contains("a")
            .should("have.attr", "href", `https://id.getharvest.com/oauth2/authorize?client_id=${Cypress.env('OAUTH_APP_ID')}&response_type=token`);
    });

    it('create new account button exists and links correctly', () => {
        cy.mount(<OAuthOverlay />)
        cy.get('[data-test="create-account"]')
            .contains("a")
            .should("have.attr", "href", "https://www.getharvest.com");
    });
})
