/// <reference types="cypress" />

import mockFetch from '../mocks/fetch';
import { BUTTON_SORT, INPUT_SORT_ASC, INPUT_SORT_DESC, PLANET_NAME, SELECT_COLUMN_SORT } from '../utils/dataTestIds';

const sortByColumn = (column, order) => {
  cy.getByTestId(SELECT_COLUMN_SORT).select(column);

  const allOrders = {
    asc: () => cy.getByTestId(INPUT_SORT_ASC).click(),
    desc: () => cy.getByTestId(INPUT_SORT_DESC).click(),
  };

  allOrders[order]();

  cy.getByTestId(BUTTON_SORT).click();
};

describe('9 - Sort the columns in ascending or descending order', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch);
      },
    });
  });

  it('Sort the planets from the longest orbital period to the shortest orbital period', () => {
    sortByColumn('orbital_period', 'desc');

    const expectedPlanets = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];

    cy.getByTestId(PLANET_NAME).each((el, index) => {
      expect(el).to.contain(expectedPlanets[index]);
    });
  });

  it('Sort the planets from the smallest diameter to the largest diameter', () => {
    sortByColumn('diameter', 'asc');

    const expectedPlanets = ['Endor', 'Hoth', 'Dagobah', 'Yavin IV', 'Tatooine', 'Naboo', 'Coruscant', 'Alderaan', 'Kamino', 'Bespin'];

    cy.getByTestId(PLANET_NAME).each((el, index) => {
      expect(el).to.contain(expectedPlanets[index]);
    });
  });

  it('Sort the planets from the most populous to the least populous', () => {
    sortByColumn('population', 'desc');

    const expectedPlanets = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV'];
    const expectedPlanetsWithUnknownValues = ['Dagobah', 'Hoth'];

    cy.getByTestId(PLANET_NAME).each((el, index) => {
      if (expectedPlanets[index]) {
        expect(el).to.contain(expectedPlanets[index]);
      } else {
        expect(el.text()).to.be.oneOf(expectedPlanetsWithUnknownValues);
      }
    });
  });

  it('Sort the planets from the least populous to the most populous', () => {
    sortByColumn('population', 'asc');

    const expectedPlanets = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant'];
    const expectedPlanetsWithUnknownValues = ['Dagobah', 'Hoth'];

    cy.getByTestId(PLANET_NAME).each((el, index) => {
      if (expectedPlanets[index]) {
        expect(el).to.contain(expectedPlanets[index]);
      } else {
        expect(el.text()).to.be.oneOf(expectedPlanetsWithUnknownValues);
      }
    });
  });
});
