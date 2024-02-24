import mockFetch from '../mocks/fetch';
import { BUTTON_FILTER, COLUMN_FILTER, COMPARISON_FILTER, VALUE_FILTER } from '../utils/dataTestIds';

describe('3 - Create a filter for numerical values', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch').callsFake(mockFetch);
      },
    });
  });

  it('Render the column filter', () => {
    const options = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    cy.getByTestId(COLUMN_FILTER).children().should('have.length', options.length)
      .each((el) => {
        expect(el.text()).to.be.oneOf(options);
      });
  });

  it('Render the comparison filter', () => {
    const options = ['greater than', 'less than', 'equal to'];
    cy.getByTestId(COMPARISON_FILTER).children().should('have.length', options.length)
      .each((el) => {
        expect(el.text()).to.be.oneOf(options);
      });
  });

  it('Render the field for the filter value', () => {
    cy.getByTestId(VALUE_FILTER).should('be.visible');
  });

  it('Render the button to execute the filtering', () => {
    cy.getByTestId(BUTTON_FILTER).should('be.visible');
  });

  it('Check initial values of each field', () => {
    cy.getByTestId(COLUMN_FILTER).should('have.value', 'population');
    cy.getByTestId(COMPARISON_FILTER).should('have.value', 'greater than');
    cy.getByTestId(VALUE_FILTER).should('have.value', '0');
  });

  it('Filter using only the filter button', () => {
    const DEFAULT_FILTERED_ROWS = 9;
    cy.getByTestId(BUTTON_FILTER).click();
    cy.get('table tr').should('have.length', DEFAULT_FILTERED_ROWS);
  });

  it('Filter using the "less than" comparison', () => {
    const LESS_FILTERED_ROWS = 7;
    cy.addFilter('surface_water', 'less than', '40');
    cy.get('table tr').should('have.length', LESS_FILTERED_ROWS);
  });

  it('Filter using the "greater than" comparison', () => {
    const GREATER_FILTERED_ROWS = 8;
    cy.addFilter('diameter', 'greater than', '8900');
    cy.get('table tr').should('have.length', GREATER_FILTERED_ROWS);
  });

  it('Filter using the "equal to" comparison', () => {
    const EQUALS_FILTERED_ROWS = 2;
    cy.addFilter('population', 'equal to', '200000');
    cy.get('table tr').should('have.length', EQUALS_FILTERED_ROWS);
  });
});
