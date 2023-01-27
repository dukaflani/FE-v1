import Head from 'next/head'
import SidebarNavMobile from '../../../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../../../components/NavigationMobile'
import EditEventMobile from '../../../../../../components/EditEventMobile'
import BottomNavigationMobile from '../../../../../../components/BottomNavigationMobile'

const editEvent = () => {
  return (
    <SidebarNavMobile>
    <Head>
        <title>Edit Event | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Edit Event | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here  STREAMING LINKS  MERCHANDISE  LYRICS  SKIZA TUNES  ALBUMS  EVENTS  VIDEOS""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <NavigationMobile/>
      <>
      <main className='flex flex-col items-center justify-center py-20'>
        <article className='bg-white border-b shadow-sm max-w-md mx-2 p-5'>
            <EditEventMobile/>
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

export default editEvent