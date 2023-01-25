import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'
import { loadCurrentVideo } from '../../../../redux/features/videos/videosSlice'
import { useCurrentVideoQuery } from '../../../../redux/features/videos/videosApiSlice'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import CurrentVideoPlayerMobile from '../../../../components/CurrentVideoPlayerMobile'
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