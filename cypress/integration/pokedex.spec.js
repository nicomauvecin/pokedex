// pokedex.spec..js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('pokedex', () => {
    it('carga el inicio, comprueba que hay 20 pokemones y está solamente el botón siguiente.', () => {
        cy.intercept('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0', { fixture: 'pagina1.json' })
        cy.visit('http://192.168.0.2:8080/');
        
        const POKEMONES_POR_PAGINA = 20;
        cy.get('.contenedor-pokemon')
            .should('have.length', POKEMONES_POR_PAGINA);
        cy.get('#boton-anterior')
            .should('have.class', 'ocultar');
        cy.get('#boton-siguiente')
            .should('not.have.class', 'ocultar');
    });

    it('pasa de página y comprueba si cambiaron los pokemones', () => {
        cy.visit('http://192.168.0.2:8080/');
        cy.intercept('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20', { fixture: 'pagina2.json' });
        cy.intercept('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=40', { fixture: 'pagina3.json' });
        cy.get('.contenedor-pokemon')
            .eq(0)
            .should('contain.text', 'bulbasaur')

        cy.get('#boton-siguiente')
            .click();

        cy.get('.contenedor-pokemon')
            .eq(0)
            .should('not.contain.text', 'bulbasaur')

        cy.get('#boton-anterior')
            .click();

        cy.get('.contenedor-pokemon')
            .eq(0)
            .should('contain.text', 'bulbasaur')
    });

    it('mostrar datos al hacer click en un pokemon', () => {
        cy.visit('http://192.168.0.2:8080/');
        cy.intercept('https://pokeapi.co/api/v2/pokemon/bulbasaur', { fixture: 'bulbasaur.json' })

        cy.get('.contenedor-pokemon')
            .eq(0)
            .click();

        cy.get('#info-pokemon')
            .as('contenedor')
            .should('be.visible');

        cy.get('#titulo-nombre-pokemon')
            .should('contain.text', 'bulbasaur');
    });
});