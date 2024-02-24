import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { apiData, testTableData } from './mocks/testData';

describe('Tests for the Planet Name Filter', () => {
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

  const planetsNameTestId = 'planet-name';
  const planetNamePlaceholder = 'Planet Name';
  const allPlanetsName = testTableData.map(({ name }) => name);
  const planetsWithOInName = [
    'Tatooine', 'Hoth', 'Dagobah', 'Endor', 'Naboo', 'Coruscant', 'Kamino'];
  const planetsWithOOInName = ['Tatooine', 'Naboo'];

  test('if the text input for name filter is rendered', () => {
    const nameFilterInput = screen.getByPlaceholderText(planetNamePlaceholder);
    expect(nameFilterInput).toHaveAttribute('data-testid', 'name-filter');
  });

  test('if a filter for planets with the letter "o" in name can be done', () => {
    const nameFilterInput = screen.getByPlaceholderText(planetNamePlaceholder);
    userEvent.type(nameFilterInput, 'o');
    const planetsName = screen.getAllByTestId(planetsNameTestId);
    planetsWithOInName.forEach((name, index) => {
      expect(planetsName[index]).toHaveTextContent(name);
    });
  });

  test('if a filter for planets with "oo" in name can be done', () => {
    const nameFilterInput = screen.getByPlaceholderText(planetNamePlaceholder);
    userEvent.type(nameFilterInput, 'oo');
    const planetsName = screen.getAllByTestId(planetsNameTestId);
    planetsWithOOInName.forEach((name, index) => {
      expect(planetsName[index]).toHaveTextContent(name);
    });
  });

  test('if a planet name filter can be cleared', () => {
    const nameFilterInput = screen.getByPlaceholderText(planetNamePlaceholder);
    userEvent.type(nameFilterInput, 'oo');
    let planetsName = screen.getAllByTestId(planetsNameTestId);
    planetsWithOOInName.forEach((name, index) => {
      expect(planetsName[index]).toHaveTextContent(name);
    });

    userEvent.clear(nameFilterInput);
    planetsName = screen.getAllByTestId(planetsNameTestId);
    allPlanetsName.forEach((name, index) => {
      expect(planetsName[index]).toHaveTextContent(name);
    });
  });
});
