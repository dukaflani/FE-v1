import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFetchOneSkizaTuneQuery, useFetchSkizaTuneLinksQuery } from '../../../../../../redux/features/videos/videosApiSlice'
import SidebarNav from '../../../../../../components/SidebarNav'
import Navigation from '../../../../../../components/Navigation'
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
    <SidebarNav>
      <Head>
        <title>Edit Skiza Tune | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Edit Skiza Tune | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <Navigation/>
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
    </SidebarNav>
  )
}

export default editSkiza