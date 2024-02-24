import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { apiData, testTableData } from './mocks/testData';

describe('Tests for the Numeric Filter List', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiData),
    });
    render(<App />);
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    const columnFilterInput = screen.getByRole('combobox', { name: /property/i });
    const comparisonFilterInput = screen.getByRole('combobox', { name: /operator/i });
    const valueFilterInput = screen.getByRole('spinbutton', { name: /value/i });
    const numericFilterBtn = screen.getByRole('button', { name: 'FILTER' });

    userEvent.selectOptions(columnFilterInput, ['population']);
    userEvent.selectOptions(comparisonFilterInput, ['greater than']);
    userEvent.type(valueFilterInput, '100');
    userEvent.click(numericFilterBtn);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const planetsNameTestId = 'planet-name';

  test('if the numeric filter list and delete buttons are rendered', () => {
    const filterItem = screen.getByTestId('filter');
    const delFilterBtn = filterItem.querySelector('button');
    expect(delFilterBtn).toBeInTheDocument();

    const filterText = screen.getByText('population greater than 0100');
    expect(filterText).toBeInTheDocument();

    const delAllFiltersBtn = screen.getByRole('button', { name: /remove filters/i });
    expect(delAllFiltersBtn).toHaveAttribute('data-testid', 'button-remove-filters');
  });

  test('if after deleting a filter, table values return to original status', () => {
    const plantsFiltered = ['Tatooine', 'Alderaan', 'Yavin IV', 'Bespin',
      'Endor', 'Naboo', 'Coruscant', 'Kamino'];

    let planetsName = screen.getAllByTestId(planetsNameTestId);
    plantsFiltered.forEach((planet, index) => {
      expect(planetsName[index]).toHaveTextContent(planet);
    });

    const filterItem = screen.getByTestId('filter');
    const delFilterBtn = filterItem.querySelector('button');
    userEvent.click(delFilterBtn);

    const fullPlanetList = testTableData.map(({ name }) => name);
    planetsName = screen.getAllByTestId(planetsNameTestId);
    fullPlanetList.forEach((planet, index) => {
      expect(planetsName[index]).toHaveTextContent(planet);
    });
  });

  test('if after deleting all filters, table values return to original status', () => {
    const columnFilterInput = screen.getByRole('combobox', { name: /property/i });
    const comparisonFilterInput = screen.getByRole('combobox', { name: /operator/i });
    const valueFilterInput = screen.getByRole('spinbutton', { name: /value/i });
    const numericFilterBtn = screen.getByRole('button', { name: 'FILTER' });

    userEvent.selectOptions(columnFilterInput, ['orbital_period']);
    userEvent.selectOptions(comparisonFilterInput, ['less than']);
    userEvent.type(valueFilterInput, '400');
    userEvent.click(numericFilterBtn);

    const plantsFiltered = ['Tatooine', 'Alderaan', 'Naboo', 'Coruscant'];

    let planetsName = screen.getAllByTestId(planetsNameTestId);
    plantsFiltered.forEach((planet, index) => {
      expect(planetsName[index]).toHaveTextContent(planet);
    });

    const delAllFiltersBtn = screen.getByRole('button', { name: /remove filters/i });
    userEvent.click(delAllFiltersBtn);

    const fullPlanetList = testTableData.map(({ name }) => name);
    planetsName = screen.getAllByTestId(planetsNameTestId);
    fullPlanetList.forEach((planet, index) => {
      expect(planetsName[index]).toHaveTextContent(planet);
    });
  });
});
