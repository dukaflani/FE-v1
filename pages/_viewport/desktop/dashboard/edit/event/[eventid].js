import Head from 'next/head'
import SidebarNav from '../../../../../../components/SidebarNav'
import Navigation from '../../../../../../components/Navigation'
import EditEvent from '../../../../../../components/EditEvent'

const editEvent = () => {
  return (
    <SidebarNav>
      <Head>
        <title>Edit Event | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Edit Event | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <Navigation/>
      <>
      <main className='flex flex-col items-center justify-center pt-20'>
        <article className='bg-white border-b shadow-sm w-7/12 p-5'>
            <EditEvent/>
        </article>
        <footer className='flex items-center justify-center p-5'>
            <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
        </footer>
      </main>
      </>
    </SidebarNav>
  )
}

export default editEvent