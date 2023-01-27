import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFetchStreamingLinksQuery, useFetchOneStreamingLinkQuery } from '../../../../../../redux/features/videos/videosApiSlice'
import SidebarNavMobile from '../../../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../../../components/NavigationMobile'
import EditStreamingLinkMobile from '../../../../../../components/EditStreamingLinkMobile'
import BottomNavigationMobile from '../../../../../../components/BottomNavigationMobile'

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
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here - STREAMING LINKS | MERCHANDISE | LYRICS | SKIZA TUNES | ALBUMS | EVENTS | VIDEOS""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <NavigationMobile/>
      <>
      <main className='flex flex-col items-center justify-center py-20'>
        <article className='bg-white border-b shadow-sm max-w-md mx-2 p-5'>
        <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Edit Streaming & Download Links</div>
        <div className='text-sm mb-5 tracking-tighter text-gray-700'>{streamingLink?.data?.title}</div>
            {[...Array(numOfLinks).keys()].map((item, i) => (
                <EditStreamingLinkMobile link={streamingLinks?.data[i]} key={i}/>
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

export default editLinks