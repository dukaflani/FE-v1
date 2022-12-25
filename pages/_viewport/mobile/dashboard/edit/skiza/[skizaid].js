import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFetchOneSkizaTuneQuery, useFetchSkizaTuneLinksQuery } from '../../../../../../redux/features/videos/videosApiSlice'
import SidebarNavMobile from '../../../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../../../components/NavigationMobile'
import EditSkizaTune from '../../../../../../components/EditSkizaTune'

const editSkiza = () => {
  const router = useRouter()
  const { skizaid } = router.query

  const skizaQuery = {
    "skizatune_id": skizaid
  }

  const { data: skizatunes } = useFetchOneSkizaTuneQuery(skizaQuery)
  const { data: skizatuneLinks } = useFetchSkizaTuneLinksQuery(skizaQuery)
  const numOfSkizaLinks = skizatuneLinks?.data?.length



  return (
    <SidebarNavMobile>
      <Head>
        <title>Edit Skiza Tune | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Edit Skiza Tune | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Edit Skiza Tune | Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Edit Skiza Tune | Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

        
        {/* // <link rel="icon" href="/dukaflani-blue-logo-small.png" /> */}
      </Head>
      <NavigationMobile/>
      <>
      <main className='flex flex-col items-center justify-center pt-20'>
        <article className='bg-white border-b shadow-sm w-5/12 p-5'>
        <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Edit Skiza Ringback Tunes</div>
        <div className='text-sm mb-5 tracking-tighter text-gray-700'>{skizatunes?.data?.title}</div>
            {[...Array(numOfSkizaLinks).keys()].map((item, i) => (
                <EditSkizaTune skizaLink={skizatuneLinks?.data[i]} key={i}/>
            ))}
        </article>
        <footer className='flex items-center justify-center p-5'>
            <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
        </footer>
      </main>
      </>
    </SidebarNavMobile>
  )
}

export default editSkiza