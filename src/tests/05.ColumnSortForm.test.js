import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { apiData } from './mocks/testData';

describe('Tests for the Planet Numeric Filters', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiData),
    });
    render(<App />);
    await waitForElementToBeRemoved(screen.queryByText(/loading/i));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const columnSortOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const testId = 'data-testid';
  const planetsNameTestId = 'planet-name';

  test('if inputs and button for planets sort are properly rendered', () => {
    const columnSortInput = screen.getByRole('combobox', { name: /order by:/i });
    expect(columnSortInput).toHaveAttribute(testId, 'column-sort');
    expect(columnSortInput).toHaveValue(columnSortOptions[0]);
    columnSortOptions.forEach((option) => {
      const columnOption = screen.getAllByRole('option', { name: option })[1];
      expect(columnOption).toBeInTheDocument();
    });

    const ascOption = screen.getByRole('radio', { name: /ascending/i });
    expect(ascOption).toHaveAttribute(testId, 'column-sort-input-asc');
    expect(ascOption).toBeChecked();

    const descOption = screen.getByRole('radio', { name: /descending/i });
    expect(descOption).toHaveAttribute(testId, 'column-sort-input-desc');
    expect(descOption).not.toBeChecked();

    const sortBtn = screen.getByRole('button', { name: /order/i });
    expect(sortBtn).toHaveAttribute(testId, 'column-sort-button');
  });

  test('sort the planets from highest orbital period to lowest orbital period', () => {
    const columnSortInput = screen.getByRole('combobox', { name: /order by:/i });
    userEvent.selectOptions(columnSortInput, ['orbital_period']);

    const descOption = screen.getByRole('radio', { name: /descending/i });
    userEvent.click(descOption);

    const sortBtn = screen.getByRole('button', { name: /order/i });
    userEvent.click(sortBtn);

    const sortPlanets = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino',
      'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];
    const planetsName = screen.getAllByTestId(planetsNameTestId);
    sortPlanets.forEach((planet, index) => {
      expect(planetsName[index]).toHaveTextContent(planet);
    });
  });

  test('sort the planets from least populous to most populous', () => {
    const columnSortInput = screen.getByRole('combobox', { name: /order by:/i });
    userEvent.selectOptions(columnSortInput, ['population']);

    const descOption = screen.getByRole('radio', { name: /descending/i });
    userEvent.click(descOption);

    const ascOption = screen.getByRole('radio', { name: /ascending/i });
    userEvent.click(ascOption);

    const sortBtn = screen.getByRole('button', { name: /order/i });
    userEvent.click(sortBtn);

    const sortPlanets = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor',
      'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Hoth', 'Dagobah'];
    const planetsName = screen.getAllByTestId(planetsNameTestId);
    sortPlanets.forEach((planet, index) => {
      expect(planetsName[index]).toHaveTextContent(planet);
    });
  });
});
