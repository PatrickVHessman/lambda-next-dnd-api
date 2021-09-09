import { useState, useEffect } from 'react';
import lambdaURL from '../lambdaURL';
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import axios from 'axios';

function RaceList () {

  const [races,setRaces] = useState([]);
  

  useEffect(() => {
      axios.get(`${lambdaURL}/races/`).then(res => {
      setRaces(res.data[0].results);
    })
  }, []);

  // Mapping out the API response in a separate function instead of on the main render in case of errors on the API call.
  const RaceListHandler = () => {
    if (races !== undefined) {
      return races.map(race => {
      return <Link key={race.index} href={`/races/${race.index}`}><a className={styles.card} style={{display: "block"}} >{race.name}</a></Link>
    })}
    else {
      return <div>Sorry, an error has occurred!</div>
    }
  }

  return (
    <div className={styles.linkContainer}>
      <RaceListHandler />
    </div>
  )
}

export default RaceList;
