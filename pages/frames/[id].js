import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Image from 'next/image'

export default function Study({study, image}) {
  return (
    <Layout>
      <Head>
        <title>{study?.study_id || 'Loading...'}</title>
      </Head>
      <div>
        <Image
          priority
          src={image?.url}
          className={utilStyles.borderCircle}
          height={600}
          width={800}
          alt={image?.id}
        />
      </div>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}

export async function getServerSideProps({params}) {
  // console.log('Page params:', params)
  const res = await fetch(`https://mka3pn0td1.execute-api.us-east-1.amazonaws.com/default/ia-patient-study-list`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'x-api-key': 'qLE99fhPaJ5RWf7UspH5j4oe4auIMHir2j67W75a'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  const data = await res.json()

  let study = {};
  let image = {};

  if (!data) {
    return {
      notFound: true,
    }
  } else {
    for(let s of data.Items) {
      for(let i of s.frames) {
        // console.log('Data: ', params.id, i, s);
        if(params.id === i.id){
          console.log('We got a match!')
          study = s;
          image = i;
        }
      }
    }
  }

  return {
    props: {study, image}, // will be passed to the page component as props
  }
}