import Head from 'next/head'
import lambdaURL from '../../lambdaURL';
import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout';
import axios from 'axios';
import SpellList from '../../components/spellList';

function Spell(props) {

      // Not all Spells have a Higher Level feature, so this is a way to hide that spot on the UI.
  const HigherLevel = () => {
    if (props.higher === null) {
        return <></>
    }
    else {
      return <p><b>At Higher Levels:</b>{" "}{props.higher}</p>;
    }
}

const SpellHandler = () => {
    if (props.valid !== false) {
        return (<>
        <h3>{props.spellName}</h3>
        <p><em>{props.desc}</em></p>
        <p><b>Level:</b>{" "}{props.level}</p>
        <p><b>Range:</b>{" "}{props.range}</p>
        {<HigherLevel />}
        </>)
    }
    else {
        return (<em>Invalid URL!</em>)
    }
}

  return (
    <Layout>
      <Head>
        <title>{`${props.spellName} - Dungeons and Dragons API Browser`}</title>
        <meta name="description" content={props.desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainCard}>
        <SpellHandler />
        
    </div>
    <h4 style={{textAlign: "center"}}>More Spells</h4>
      <SpellList />
    
    </Layout>
  )
}

// As this page is served via static hosting, getInitialProps will not work, but I have included the code to demonstrate how it would be used.

// Spell.getInitialProps = async (ctx) => {
//        let res = await axios.get(`${lambdaURL}/spells/${ctx.query.spell}`).then(response => {
//             return {
//                 valid: true,  
//                 spellName: response.data.name,
//                 desc: response.data.desc,
//                 higher: response.data.higher_level,
//                 range: response.data.range,
//                 level: response.data.level
// }
// });
// return res;
// }

// This function gets called at build time and builds out HTML pages for individual paths based on the API call.
export async function getStaticPaths() {
    const res = await axios.get(`${lambdaURL}/spells/`);
    const paths = res.data[0].results.map((spell) => ({
      params: { spell: spell.index },
    }))
    return { paths, fallback: false }
  }
  
  export async function getStaticProps({ params }) {
       let res = await axios.get(`${lambdaURL}/spells/${params.spell}`).then(response => {
        let higher;
        if (response.data.higher === undefined) {
            higher = null;
        }
        else {
            higher = response.data.higher_level;
        }
            return {
                valid: true,  
                spellName: response.data.name,
                desc: response.data.desc,
                higher: higher,
                range: response.data.range,
                level: response.data.level
                }
       })
       // Error handling in case of invalid URL.
       .catch(response => {
           return {
               valid: false,
               spellName: "Error",
               desc: "Please enter a valid URL."
           }
       });

       return {props: res};
}

export default Spell;
