import Head from 'next/head'
import Timer from '../components/Timer'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
        <Timer/>
    </div>
  )
}
