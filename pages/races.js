import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout';
import RaceList from '../components/raceList';

function Races() {

  return (
    <Layout>
      <Head>
        <title>Races - Dungeons and Dragons API Browser</title>
        <meta name="description" content="Information on D&D 5E player races." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <h2 style={{textAlign: "center"}}>Select a Race</h2>
    <div className={styles.overviewContainer}>
      <RaceList style={{height: "50vh"}} />
    </div>
    
    </Layout>
  )
}

export default Races;
