/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import testData from '../mocks/testData';

const ROWS_TOTAL = testData.results.length + 1;
const FILTERED_ROWS = 8;
const DOUBLE_FILTERED_ROWS = 3;
const TRIPLE_FILTERED_ROWS = 2;

describe('4 - Implement multiple numerical filters', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch);
      },
    });
  });

  it('Add two filters and check if the table was updated with the filtered information', () => {
    cy.get('table tr').should('have.length', ROWS_TOTAL);

    cy.addFilter('diameter', 'greater than', '9000');
    cy.get('table tr').should('have.length', FILTERED_ROWS);

    cy.addFilter('population', 'less than', '1000000');
    cy.get('table tr').should('have.length', DOUBLE_FILTERED_ROWS);
  });

  it('Add three filters and check if the table was updated with the filtered information', () => {
    cy.get('table tr').should('have.length', ROWS_TOTAL);

    cy.addFilter('diameter', 'greater than', '9000');
    cy.get('table tr').should('have.length', FILTERED_ROWS);

    cy.addFilter('population', 'less than', '1000000');
    cy.get('table tr').should('have.length', DOUBLE_FILTERED_ROWS);

    cy.addFilter('rotation_period', 'equal to', '23');
    cy.get('table tr').should('have.length', TRIPLE_FILTERED_ROWS);
  });
});
