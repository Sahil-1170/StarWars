/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import testData from '../mocks/testData';

const MAX_COLUMNS_COUNT = 13;

const planets = testData.results;

describe('1 - Make a request to the `/planets` endpoint of the Star Wars API and fill a table with the returned data, except for the `residents` column', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch).as('mockFetch');
      },
    });
  });

  it('Make a request to the API', () => {
    cy.get('@mockFetch').should('be.called');
  });

  it('Fill the table with the returned data', () => {
    planets.forEach((planet) => {
      cy.contains(planet.name);
      cy.contains(planet.rotation_period);
      cy.contains(planet.orbital_period);
      cy.contains(planet.diameter);
      cy.contains(planet.climate);
      cy.contains(planet.gravity);
      cy.contains(planet.terrain);
      cy.contains(planet.surface_water);
      cy.contains(planet.population);
    });
  });

  it('Check if the table has 13 columns', () => {
    // the request (mock) returns 14 keys for each planet, but the `residents` key should not be displayed, totaling 13 columns
    cy.get('table tr:first th')
      .should('have.length', MAX_COLUMNS_COUNT);
  });

  it('Check if the table has one row for each returned planet', () => {
    // the request (mock) returns 10 planets, adding one more row for the header totaling 11 rows
    cy.get('table tr').should('have.length', planets.length + 1);
  });
});
