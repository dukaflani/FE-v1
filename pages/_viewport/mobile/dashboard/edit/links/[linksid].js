import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFetchStreamingLinksQuery, useFetchOneStreamingLinkQuery } from '../../../../../../redux/features/videos/videosApiSlice'
import SidebarNavMobile from '../../../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../../../components/NavigationMobile'
import EditStreamingLink from '../../../../../../components/EditStreamingLink'

const editLinks = () => {
const router = useRouter()
const { linksid } = router.query

const linksQuery = {
  "link_id": linksid
}

const { data: streamingLinks } = useFetchStreamingLinksQuery(linksQuery)
const { data: streamingLink } = useFetchOneStreamingLinkQuery(linksQuery)
const numOfLinks = streamingLinks?.data?.length


  return (
    <SidebarNavMobile>
    <Head>
        <title>Edit Links | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Edit Links | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Edit Links | Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Edit Links | Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

        
        {/* // <link rel="icon" href="/dukaflani-blue-logo-small.png" /> */}
      </Head>
      <NavigationMobile/>
      <>
      <main className='flex flex-col items-center justify-center pt-20'>
        <article className='bg-white border-b shadow-sm w-5/12 p-5'>
        <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Edit Streaming & Download Links</div>
        <div className='text-sm mb-5 tracking-tighter text-gray-700'>{streamingLink?.data?.title}</div>
            {[...Array(numOfLinks).keys()].map((item, i) => (
                <EditStreamingLink link={streamingLinks?.data[i]} key={i}/>
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

export default editLinks