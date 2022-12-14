import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'
import { loadCurrentVideo } from '../../../../redux/features/videos/videosSlice'
import { useCurrentVideoQuery } from '../../../../redux/features/videos/videosApiSlice'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import CurrentVideoPlayerMobile from '../../../../components/CurrentVideoPlayerMobile'
import CurrentVideoPanel from '../../../../components/CurrentVideoPanel'
import CurrentVideoPlayerSkeleton from '../../../../components/CurrentVideoPlayerSkeleton'
import CurrrentVideoPanelSkeleton from '../../../../components/CurrrentVideoPanelSkeleton'
import CurrentVideoPlayerMobileSkeleton from '../../../../components/CurrentVideoPlayerMobileSkeleton'

const WatchCurrentVideo = () => {
  const [showSkeleton, setShowSkeleton] = useState(true)
  const { ref: mobileWatchNavbarRef, inView: navbarVisisble } = useInView();
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

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowSkeleton(false)
      }, 3000);
    }
  }, [isLoading])
  
  
  
  return (
    <SidebarNavMobile>
      <Head>
        <title>{currentVideo?.data?.results[0]?.title ? `${currentVideo?.data?.results[0]?.title} | ${currentVideo?.data?.results[0]?.stage_name} - Dukaflani` : 'Dukaflani — Home of Music Videos'}</title>
        <meta name="title" content={`${currentVideo?.data?.results[0]?.title} | ${currentVideo?.data?.results[0]?.stage_name} - Dukaflani`} />
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content={`${currentVideo?.data?.results[0]?.title} | ${currentVideo?.data?.results[0]?.stage_name} - Dukaflani`} />
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        {/* <meta property="og:image" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=madam&song_title=mbona `}/> */}
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content={`${currentVideo?.data?.results[0]?.title} | ${currentVideo?.data?.results[0]?.stage_name} - Dukaflani`} />
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

      </Head>
      <div ref={mobileWatchNavbarRef}>
        <NavigationMobile/>
      </div>
      <main>
        <div className='flex max-w-lg landscape:max-w-lg min-h-screen mx-auto'>
            {showSkeleton ? <section className='w-full md:pt-3 landscape:pt-3'>
              <CurrentVideoPlayerMobileSkeleton/>
            </section> : <section className='w-full md:pt-3 landscape:pt-3'>
              <CurrentVideoPlayerMobile video={currentVideo} navbarVisisble={navbarVisisble} />
            </section>}
        </div>
      </main>
    </SidebarNavMobile>
  )
}

export default WatchCurrentVideo