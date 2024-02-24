import React from 'react';
import ReactLoading from 'react-loading';
import styles from '../styles/Loading.module.css';

export default function Loading() {
  return (
    <div className={ styles.container }>
      <ReactLoading
        type="spin"
        color="#ffffff"
        height={ 70 }
        width={ 110 }
      />
      <h1>Loading...</h1>
    </div>
  );
}
