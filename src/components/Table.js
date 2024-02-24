import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import styles from '../styles/Table.module.css';
import Loading from './Loading';

function Table() {
  const { planetsData, filteredPlanets } = useContext(MyContext);

  if (planetsData.length > 0) {
    const planetsInfo = Object.keys(planetsData[0]);
    return (
      <div className={ styles.container }>
        <table>
          <thead>
            <tr>
              { planetsInfo.map((info) => <th key={ info }>{ info }</th>) }
            </tr>
          </thead>
          <tbody>
            { filteredPlanets.map((planet) => (
              <tr key={ planet.name }>
                { planetsInfo.map((info, index) => (
                  <td
                    key={ index }
                    data-testid={ (info === 'name') ? 'planet-name' : '' }
                  >
                    { info !== 'films'
                      ? planet[info]
                      : planet[info].map((film, filmIndex) => (
                        <>
                          <span key={ filmIndex }>{ film }</span>
                          <br />
                        </>
                      )) }
                  </td>
                )) }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <Loading />;
}

export default Table;
