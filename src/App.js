import React from 'react';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import MyProvider from './context/MyProvider';
import ColumnSortForm from './components/ColumnSortForm';
import Logo from './components/Logo';
import styles from './styles/App.module.css';
import NumericFilter from './components/NumericFilter';

function App() {
  return (
    <MyProvider>
      <main className={ styles.container }>
        <section className={ styles.logo }>
          <Logo />
        </section>
        <section className={ styles.search }>
          <NameFilter />
          <div className={ styles.planetsForm }>
            <NumericFilter />
            <ColumnSortForm />
          </div>
          <Table />
        </section>
      </main>
    </MyProvider>
  );
}

export default App;
