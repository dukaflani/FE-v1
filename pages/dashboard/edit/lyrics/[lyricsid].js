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
        <title>Edit | Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
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