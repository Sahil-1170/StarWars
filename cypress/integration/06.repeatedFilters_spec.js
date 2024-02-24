/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import { COLUMN_FILTER } from '../utils/dataTestIds';

const FILTERED_ROWS_COUNT = 8;

describe('6 - Do not use repeated filters', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch);
      },
    });
  });

  it('Filter by population and remove it from options', () => {
    const allColumnsOptions = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

    cy.getByTestId(COLUMN_FILTER).find('option').should((options) => {
      expect(options).to.have.length(allColumnsOptions.length);

      allColumnsOptions.forEach((option) => {
        expect(options).to.contain(option);
      });
    });

    cy.addFilter('population', 'greater than', '8000');

    cy.get('table tr').should('have.length', FILTERED_ROWS_COUNT);

    cy.getByTestId(COLUMN_FILTER).find('option').should((options) => {
      expect(options).to.have.length(allColumnsOptions.length - 1);

      expect(options).to.not.contain('population');
    });
  });
});
