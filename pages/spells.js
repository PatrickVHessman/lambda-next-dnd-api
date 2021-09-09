import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout';
import SpellList from '../components/spellList';

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Dungeons and Dragons API Browser</title>
        <meta name="description" content="Information on D&D 5E spells." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <h2 style={{textAlign: "center"}}>Select a Spell</h2>
    <div className={styles.overviewContainer}>
      <SpellList />
    </div>
    
    </Layout>
  )
}
