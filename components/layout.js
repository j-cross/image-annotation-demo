import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export const siteTitle = 'Image Annotation Demo'

export default function Layout({ children, home = undefined }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A demo app for image annotation using Next.js"
        />
        <meta
          property="og:image"
          content={`images/BB+Imaging+Logo-01.png`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/BB+Imaging+Logo-01.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt="BB Imaging Demo"
            />
            <h1 className={utilStyles.heading2Xl}>Image Annotation Demo</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/BB+Imaging+Logo-01.png"
                  className={utilStyles.borderCircle}
                  height={144}
                  width={144}
                  alt="BB Imaging Demo"
                />
              </a>
            </Link>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  )
}
