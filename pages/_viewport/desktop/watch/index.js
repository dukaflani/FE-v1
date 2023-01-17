import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { loadCurrentVideo } from '../../../../redux/features/videos/videosSlice'
import { useCurrentVideoQuery } from '../../../../redux/features/videos/videosApiSlice'
import SidebarNav from '../../../../components/SidebarNav'
import Navigation from '../../../../components/Navigation'
import CurrentVideoPlayer from '../../../../components/CurrentVideoPlayer'
import CurrentVideoPanel from '../../../../components/CurrentVideoPanel'
import CurrentVideoPlayerSkeleton from '../../../../components/CurrentVideoPlayerSkeleton'
import CurrrentVideoPanelSkeleton from '../../../../components/CurrrentVideoPanelSkeleton'

const WatchCurrentVideo = () => {
  const router = useRouter()
  const { v } = router.query
  const dispatch = useDispatch() 

  const queryParams = {
    video_id: v,
}

  const { data: currentVideo, isLoading } = useCurrentVideoQuery(queryParams)


  
  useEffect(() => {
    if (currentVideo) {
      dispatch(loadCurrentVideo({details: currentVideo?.data?.results[0]}))
    }
  }, [currentVideo])
  
  
  return (
    <SidebarNav>
      <Head>
        <title>{currentVideo?.data?.results[0]?.title ? `${currentVideo?.data?.results[0]?.title} | ${currentVideo?.data?.results[0]?.stage_name} - Dukaflani` : 'Dukaflani — Home of Music Videos'}</title>
        <meta name="title" content={`${currentVideo?.data?.results[0]?.title} | ${currentVideo?.data?.results[0]?.stage_name} - Dukaflani`} />
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${currentVideo?.data?.results[0]?.url_id}&tab=links`} />
        <meta property="og:title" content={`${currentVideo?.data?.results[0]?.title} | ${currentVideo?.data?.results[0]?.stage_name} - Dukaflani`} />
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content={currentVideo?.data?.results[0]?.thumbnail} />

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${currentVideo?.data?.results[0]?.url_id}&tab=links`} />
        <meta property="twitter:title" content={`${currentVideo?.data?.results[0]?.title} | ${currentVideo?.data?.results[0]?.stage_name} - Dukaflani`} />
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content={currentVideo?.data?.results[0]?.thumbnail} />

        
      </Head>
      <Navigation/>
      <main className='pt-20'>
        <div className='flex max-w-6xl mx-auto space-x-5'>
            <section className='w-8/12'>
              {!isLoading ? <CurrentVideoPlayer video={currentVideo} /> : <CurrentVideoPlayerSkeleton/>}
            </section>
            <section className='w-4/12'>
              {!isLoading ? <CurrentVideoPanel video={currentVideo} /> : <CurrrentVideoPanelSkeleton/>}
            </section>
        </div>
      </main>
    </SidebarNav>
  )
}

export default WatchCurrentVideo