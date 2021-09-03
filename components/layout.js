import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Layout ({children}) {
    return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          AWS Lambda and Next.js Dungeons & Dragons API Browser
        </h1>
        <div className={styles.headerLinks}><Link href="/">
    <a>Races</a>
  </Link> {" | "} 
  <Link href="/spells/">
    <a>Spells</a>
  </Link>
  {" | "} 
  <a href="https://github.com/PatrickVHessman/lambda-next-dnd-api">
    <a>View Source</a>
  </a>
  </div>
        {children}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://patrickvhessman.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Patrick Hessman
        </a>
      </footer>
    </div>
  )
}