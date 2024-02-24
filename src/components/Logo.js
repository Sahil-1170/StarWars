import React from 'react';
import graphics from '../images/grafismo-topo.png';
import logo from '../images/logo-star wars.png';
import styles from '../styles/Logo.module.css';

function Logo() {
  return (
    <>
      <img src={ graphics } alt="logo graphics" className={ styles.graphics } />
      <img src={ logo } alt="star wars logo" className={ styles.logo } />
      <h1 className={ styles.title }>PLANETS SEARCH</h1>
    </>
  );
}

export default Logo;
