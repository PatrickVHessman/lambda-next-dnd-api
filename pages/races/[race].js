import Head from 'next/head'
import lambdaURL from '../../lambdaURL';
import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout';
import axios from 'axios';
import RaceList from '../../components/raceList';

function Race(props) {
    const RaceHandler = () => {
        if (props.valid) {
            return (<>
            <h2>{props.race}</h2>
        <h3>{props.raceName}</h3>
        <p><b>Alignment:</b>{" "}{props.alignment}</p>
        <p><b>Age:</b>{" "}{props.age}</p>
        <p><b>Size:</b>{" "}{props.size}</p>
        <p><b>Languages:</b>{" "}{props.language}</p>
            </>)
        }
        else {
            return (<em>Invalid URL!</em>)
        }
    }
  return (
    <Layout>
      <Head>
        <title>{`${props.raceName} - Dungeons and Dragons API Browser`}</title>
        <meta name="description" content={props.alignment} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className={styles.mainCard}>
          <RaceHandler />
    </div>
    <h4 style={{textAlign: "center"}}>More Races</h4>
      <RaceList />
    
    </Layout>
  )
}

// As this page is served via static hosting, getInitialProps will not work, but I have included the code to demonstrate how it would be used.

// Race.getInitialProps = async (ctx) => {
//        let res = await axios.get(`${lambdaURL}/races/${ctx.query.race}`).then(response => {
//         return { 
//             valid: true,
//             alignment: response.data.alignment,
//             raceName: response.data.name,
//             age: response.data.age,
//             size: response.data.size_description,
//             language: response.data.language_desc
//             }
//        })
//        // Error handling in case of invalid URL.
//        .catch(response => {
//         return {
//             valid: false,
//             raceName: "Error",
//             alignment: "Please enter a valid URL."
//         }
//     });
// return res;
       
// }

// This function gets called at build time and builds out HTML pages for individual paths based on the API call.
export async function getStaticPaths() {
    const res = await axios.get(`${lambdaURL}/races/`);
    const paths = res.data[0].results.map((race) => ({
      params: { race: race.index },
    }))
    return { paths, fallback: false }
  }

  export async function getStaticProps({ params }) {
    let res = await axios.get(`${lambdaURL}/races/${params.race}`).then(response => {
     return { 
         valid: true,
         alignment: response.data.alignment,
         raceName: response.data.name,
         age: response.data.age,
         size: response.data.size_description,
         language: response.data.language_desc
         }
    })
    // Error handling in case of invalid URL.
    .catch(response => {
     return {
         valid: false,
         raceName: "Error",
         alignment: "Please enter a valid URL."
     }
 });
 return {props: res};
    
}
  

export default Race;
