import React from 'react';
import NumericFilterForm from './NumericFilterForm';
import NumericFilterList from './NumericFilterList';
import styles from '../styles/NumericFilter.module.css';

export default function NumericFilter() {
  return (
    <div className={ styles.container }>
      <NumericFilterForm />
      <NumericFilterList />
    </div>
  );
}
