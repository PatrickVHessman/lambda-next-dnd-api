import { useState, useEffect } from 'react';
import lambdaURL from '../lambdaURL';
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import axios from 'axios';

function SpellList () {

  const [spells,setSpells] = useState([]);
  

  useEffect(() => {
      axios.get(`${lambdaURL}/spells/`).then(res => {
      setSpells(res.data[0].results);
    })
  }, []);

  // Mapping out the API response in a separate function instead of on the main render in case of errors on the API call.
  const SpellListHandler = () => {
    if (spells !== undefined) {
      return spells.map(spell => {
      return <Link key={spell.index} href={`/spells/${spell.index}`}><a className={styles.card} style={{display: "block"}} >{spell.name}</a></Link>
    })}
    else {
      return <div>Sorry, an error has occurred!</div>
    }
  }

  return (
    <div className={styles.linkContainer}>
      <SpellListHandler />
    </div>
  )
}

export default SpellList;
