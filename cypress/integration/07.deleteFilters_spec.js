/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import testData from '../mocks/testData';
import { BUTTON_REMOVE_FILTERS, FILTER } from '../utils/dataTestIds';

const TOTAL_ROWS_COUNT = testData.results.length + 1;
const FILTERED_ROWS_COUNT = 8;
const DOUBLE_FILTERED = 3;
const TRIPLE_FILTERED = 2;

const DIAMETER_FILTER_INDEX = 0;
const POPULATION_FILTER_INDEX = 1;

const removeFilter = (index = 0) => {
  cy.getByTestId(FILTER).eq(index).find('button').click();
};

describe('7 - Delete a numerical value filter by clicking the X icon of one of the filters and delete all numerical filtering simultaneously by clicking another Remove all filters button', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch);
      },
    });
  });

  it('Add a filter and check if the table was updated with the filtered information, then remove the filter and check if the table values returned to the original', () => {
    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);

    cy.addFilter('diameter', 'greater than', '8900');

    cy.get('table tr').should('have.length', FILTERED_ROWS_COUNT);

    removeFilter(DIAMETER_FILTER_INDEX);

    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);
  });

  it('Add two filters and check if the table was updated with the filtered information, then remove the filters and check if the table values returned to the original', () => {
    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);

    cy.addFilter('diameter', 'greater than', '8900');
    cy.addFilter('population', 'less than', '1000000');

    cy.get('table tr').should('have.length', DOUBLE_FILTERED);

    removeFilter(POPULATION_FILTER_INDEX);

    cy.get('table tr').should('have.length', FILTERED_ROWS_COUNT);

    removeFilter(DIAMETER_FILTER_INDEX);

    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);
  });

  it('Add three filters and click the Remove Filters button, all filters should be removed', () => {
    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);

    cy.addFilter('diameter', 'greater than', '8900');
    cy.addFilter('population', 'less than', '1000000');
    cy.addFilter('rotation_period', 'equal to', '23');

    cy.get('table tr').should('have.length', TRIPLE_FILTERED);

    cy.getByTestId(BUTTON_REMOVE_FILTERS).click();

    cy.get('table tr').should('have.length', TOTAL_ROWS_COUNT);
  });
});
