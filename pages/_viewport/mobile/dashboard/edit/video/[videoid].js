import Head from 'next/head'
import SidebarNavMobile from '../../../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../../../components/NavigationMobile'
import EditVideoMobile from '../../../../../../components/EditVideoMobile'
import BottomNavigationMobile from '../../../../../../components/BottomNavigationMobile'

const editVideo = () => {
  return (
    <SidebarNavMobile>
    <Head>
        <title>Edit Video | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Edit Video | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <NavigationMobile/>
      <>
      <main className='flex flex-col items-center justify-center py-20'>
        <article className='bg-white border-b shadow-sm max-w-md mx-2 p-5'>
            <EditVideoMobile/>
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

export default editVideo