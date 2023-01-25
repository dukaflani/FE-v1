import { useEffect } from 'react'
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
      <Navigation/>
      {/* <main className='pt-20'> */}
      <main className='scroll-smooth'>
        <div className='flex max-w-6xl mx-auto space-x-5'>
            <section className='w-8/12 pl-4 xl:pl-0'>
              {!isLoading ? <CurrentVideoPlayer video={currentVideo} /> : <CurrentVideoPlayerSkeleton/>}
            </section>
            <section className='w-4/12 pr-4 xl:pr-0'>
              {!isLoading ? <CurrentVideoPanel video={currentVideo} /> : <CurrrentVideoPanelSkeleton/>}
            </section>
        </div>
      </main>
    </SidebarNav>
  )
}

export default WatchCurrentVideo