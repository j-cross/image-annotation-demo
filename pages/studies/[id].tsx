import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Layout from '../../components/layout'
import { useState } from 'react'

const CornerstoneViewport = dynamic(() => 
  import('../../components/cornerstone').then((cs) => cs.CornerstoneElement),
  { ssr: false }
)

export default function Study({study}) {
  const [activeFrame, setActiveFrame] = useState(study?.frames[0]);

  return (
    <Layout>
      <Head>
        <title>{study?.study_id || 'Loading...'}</title>
      </Head>
      <Link href="/">
        <a>← Back</a>
      </Link>
      <div style={{textAlign:'center', marginBottom: '45px'}}>
        <h3>{study?.patient_id} - {study?.study_id}</h3>
      </div>
      <div>
        <CornerstoneViewport study={study} />
      </div>
    </Layout>
  )
}

/**
 * 
 * @param id ID of the study to load
 * @returns props object which contains a study object
 * 
 * This is a NextJS feature. It will run this code on the server side without the client ever seeing any of it.
 */
export async function getServerSideProps({params}) {
  const res = await fetch(`https://mka3pn0td1.execute-api.us-east-1.amazonaws.com/default/ia-patient-study-list`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'qLE99fhPaJ5RWf7UspH5j4oe4auIMHir2j67W75a'
    },
    referrerPolicy: 'no-referrer'
  });
  const data = await res.json()

  let study;

  if (!data) {
    return {
      notFound: true,
    }
  } else {
    for(let s of data.Items) {
      if(s.study_id === params.id){
        study = s;
        break;
      }
    }
  }
  return {
    props: {study}, // will be passed to the page component as props
  }
}