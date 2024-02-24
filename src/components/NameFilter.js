import React, { useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import MyContext from '../context/MyContext';
import styles from '../styles/NameFilter.module.css';

function NameFilter() {
  const { filterByName, handleNameFilter } = useContext(MyContext);

  return (
    <form className={ styles.container }>
      <label htmlFor="planetName">
        <input
          type="text"
          data-testid="name-filter"
          id="planetName"
          placeholder="Planet Name"
          value={ filterByName.name }
          onChange={ (event) => handleNameFilter(event) }
        />
        <BsSearch className={ styles.icon } />
      </label>
    </form>
  );
}

export default NameFilter;
