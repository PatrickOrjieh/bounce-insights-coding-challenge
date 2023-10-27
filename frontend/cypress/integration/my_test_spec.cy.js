describe('Countries App E2E Tests', () => {

    it('should allow users to search for a country', () => {
        cy.visit('http://localhost:3000');

        cy.get('input[placeholder="Enter country name"]').type('Canada{enter}');

        cy.contains('Canada').should('be.visible');
    });

    it('should display detailed information about a specific country', () => {
        cy.visit('http://localhost:3000');

        cy.get('input[placeholder="Enter country name"]').type('Canada{enter}');

        cy.contains('Canada').click();

        cy.contains('Ottawa').should('be.visible');
    });

    it('should display countries starting with the letter A when A is clicked', () => {
        cy.visit('http://localhost:3000');
        cy.get('.alphabet-list button').contains('A').click();
        
        cy.get('.BeatLoader').should('not.exist');

        cy.get('.card').should('be.visible');
    });
});
