import React from 'react'
import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { loadCurrentVideo } from '../../redux/features/videos/videosSlice'
import SidebarNav from '../../components/SidebarNav'
import Navigation from '../../components/Navigation'
import CurrentVideoPlayer from '../../components/CurrentVideoPlayer'
import CurrentVideoPanel from '../../components/CurrentVideoPanel'
import CurrentVideoPlayerSkeleton from '../../components/CurrentVideoPlayerSkeleton'
import CurrrentVideoPanelSkeleton from '../../components/CurrrentVideoPanelSkeleton'
import { useCurrentVideoQuery } from '../../redux/features/videos/videosApiSlice'

const WatchCurrentVideo = () => {
  const router = useRouter()
  const { v } = router.query
//   const { videoid } = router.query
  const dispatch = useDispatch() 

  const queryParams = {
    video_id: v,
}
//   const queryParams = {
//     video_id: videoid,
// }

  const { data: currentVideo, isLoading } = useCurrentVideoQuery(queryParams)

  
  useEffect(() => {
    if (currentVideo) {
      dispatch(loadCurrentVideo({details: currentVideo?.data?.results[0]}))
    }
  }, [currentVideo])
  
  
  return (
    <SidebarNav>
      <Head>
        <title>Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
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