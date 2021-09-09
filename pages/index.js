import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function Home({ data }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
    <div>
      <section className={utilStyles.headingMd}>
        <p>Welcome to the Image Annotation Demo created by Josh Cross. Below you will find a list of patients. Click on a patient to view their sonogram images and add/save annotations.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Patients</h2>
        <ul className={utilStyles.list}>
          {data.map(({ study_id, patient_id, ia_demo }) => (
            <li className={utilStyles.listItem} key={ia_demo}>
              <div className={utilStyles.row} style={{justifyContent:'flex-start'}}>
                <div style={{marginRight:"25px"}}>
                  <span className={utilStyles.label}>Patient</span>
                  {patient_id}
                </div>
                <div>
                  <span className={utilStyles.label}>Study</span>
                  <Link href={`/studies/${study_id}`}>
                    <a> {study_id}</a>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
    </Layout>
  )
}

/**
 * 
 * @returns props object which contains a data object
 * 
 * This is a NextJS feature. It will run this code on the server side without the client ever seeing any of it.
 */
export async function getServerSideProps() {
  const res = await fetch(`https://mka3pn0td1.execute-api.us-east-1.amazonaws.com/default/ia-patient-study-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'qLE99fhPaJ5RWf7UspH5j4oe4auIMHir2j67W75a'
    },
    referrerPolicy: 'no-referrer'
  });
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data:data.Items}, // will be passed to the page component as props
  }
}