import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { apiData, testTableData } from './mocks/testData';

describe('Tests for Table component', () => {
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

  test('if the API request was properly done', () => {
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith('https://swapi.dev/api/planets/');
  });

  test('if the Table has been properly populated with the data from API', () => {
    const planetsInfo = Object.keys(testTableData[0]);
    const tableHeader = screen.getAllByRole('columnheader');
    expect(tableHeader).toHaveLength(planetsInfo.length);
    planetsInfo.forEach((info, index) => {
      expect(tableHeader[index]).toHaveTextContent(info);
    });

    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(testTableData.length + 1);

    const planetsName = testTableData.map(({ name }) => name);
    planetsName.forEach((name) => {
      const planetName = screen.getByRole('cell', { name });
      expect(planetName).toBeInTheDocument();
    });
  });
});
