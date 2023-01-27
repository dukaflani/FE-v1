import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useFetchLyricsVerseQuery, useFetchLyricsQuery } from '../../../../../../redux/features/videos/videosApiSlice'
import SidebarNavMobile from '../../../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../../../components/NavigationMobile'
import EditLyricsMobile from '../../../../../../components/EditLyricsMobile'
import BottomNavigationMobile from '../../../../../../components/BottomNavigationMobile'

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
    <SidebarNavMobile>
    <Head>
        <title>Edit Lyrics | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Edit Lyrics | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here - STREAMING LINKS | MERCHANDISE | LYRICS | SKIZA TUNES | ALBUMS | EVENTS | VIDEOS""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <NavigationMobile/>
      <>
      <main className='flex flex-col items-center justify-center py-20'>
        <article className='bg-white border-b shadow-sm max-w-md mx-2 p-5'>
        <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Edit Lyrics</div>
        <div className='text-sm mb-5 tracking-tighter text-gray-700'>{songLyrics?.data?.title}</div>
            {[...Array(numOfVerses).keys()].map((item, i) => (
                <EditLyricsMobile verse={lyricSVerses?.data[i]} key={i}/>
            ))}
        </article>
        <footer className='flex items-center justify-center p-5'>
            <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
        </footer>
      </main>
      </>
      <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default editLyrics