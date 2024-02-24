import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import styles from '../styles/NumericFilterForm.module.css';

function NumericFilterForm() {
  const { columnFilterOptions,
    currNumericFilters,
    handleNumericFiltersChange,
    handleNumericFilter } = useContext(MyContext);

  return (
    <form className={ styles.container }>
      <label htmlFor="column">
        Property
        <select
          data-testid="column-filter"
          id="column"
          value={ currNumericFilters.column }
          onChange={ (event) => handleNumericFiltersChange(event) }
        >
          { (columnFilterOptions.length > 0) && columnFilterOptions.map((option) => (
            <option key={ option }>{ option }</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison">
        Operator
        <select
          data-testid="comparison-filter"
          id="comparison"
          value={ currNumericFilters.comparison }
          onChange={ (event) => handleNumericFiltersChange(event) }
        >
          <option>greater than</option>
          <option>less than</option>
          <option>equal to</option>
        </select>
      </label>
      <label htmlFor="value">
        Value
        <input
          type="number"
          data-testid="value-filter"
          id="value"
          min={ 0 }
          value={ currNumericFilters.value }
          onChange={ (event) => handleNumericFiltersChange(event) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        disabled={ columnFilterOptions.length <= 0 }
        onClick={ handleNumericFilter }
      >
        FILTER
      </button>
    </form>
  );
}

export default NumericFilterForm;
