import React, { useContext } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import MyContext from '../context/MyContext';
import styles from '../styles/NumericFilterList.module.css';

function NumericFilterList() {
  const { filterByNumericValues,
    removeNumericFilter,
    clearNumericFilters } = useContext(MyContext);
  return (
    <div className={ styles.container }>
      <button
        type="button"
        data-testid="button-remove-filters"
        disabled={ filterByNumericValues.length <= 0 }
        onClick={ clearNumericFilters }
        className={ styles.remove }
      >
        REMOVE FILTERS
      </button>
      <div className={ styles.list }>
        { (filterByNumericValues.length > 0)
        && filterByNumericValues.map(({ column, comparison, value }, index) => (
          <div data-testid="filter" key={ index }>
            <span>{ `${column} ${comparison} ${value}` }</span>
            <button type="button" onClick={ () => removeNumericFilter(column) }>
              <MdDeleteForever />
            </button>
          </div>
        )) }
      </div>
    </div>
  );
}

export default NumericFilterList;
