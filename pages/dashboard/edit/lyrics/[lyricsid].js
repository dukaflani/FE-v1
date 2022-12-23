import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFetchLyricsVerseQuery, useFetchLyricsQuery } from '../../../../redux/features/videos/videosApiSlice'
import SidebarNav from '../../../../components/SidebarNav'
import Navigation from '../../../../components/Navigation'
import EditLyrics from '../../../../components/EditLyrics'
import { useSelector } from 'react-redux'

const editLyrics = () => {
  const router = useRouter()
  const { lyricsid } = router.query
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    "lyrics_id": lyricsid,
  }

  const { data: songLyrics } = useFetchLyricsQuery(queryParams)


  const lyricsQuery = {
    "lyricsVerse_id": lyricsid
  }

  const { data: lyricSVerses } = useFetchLyricsVerseQuery(lyricsQuery)
  const numOfVerses = lyricSVerses?.data?.length


  return (
    <SidebarNav>
    <Head>
        <title>Edit Lyrics | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Edit Lyrics | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Edit Lyrics | Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Edit Lyrics | Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
      <Navigation/>
      <>
      <main className='flex flex-col items-center justify-center pt-20'>
        <article className='bg-white border-b shadow-sm w-5/12 p-5'>
        <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Edit Lyrics</div>
        <div className='text-sm mb-5 tracking-tighter text-gray-700'>{songLyrics?.data?.title}</div>
            {[...Array(numOfVerses).keys()].map((item, i) => (
                <EditLyrics verse={lyricSVerses?.data[i]} key={i}/>
            ))}
        </article>
        <footer className='flex items-center justify-center p-5'>
            <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
        </footer>
      </main>
      </>
    </SidebarNav>
  )
}

export default editLyrics