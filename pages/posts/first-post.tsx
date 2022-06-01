import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Layout from "../../components/layout";
import styles from '../../styles/Home.module.css'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script

      />
      <div className={styles.title}> 
        <h1>First post</h1>
        <h2>
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </h2>
      </div>
    </Layout>
  )
}