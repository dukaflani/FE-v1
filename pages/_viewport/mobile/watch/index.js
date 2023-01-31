import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'
import { loadCurrentVideo } from '../../../../redux/features/videos/videosSlice'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import CurrentVideoPlayerMobile from '../../../../components/CurrentVideoPlayerMobile'
import CurrentVideoPlayerMobileSkeleton from '../../../../components/CurrentVideoPlayerMobileSkeleton'



const WatchCurrentVideo = ({ currentVideo, videoProfile }) => {
  const [showSkeleton, setShowSkeleton] = useState(true)
  const { ref: mobileWatchNavbarRef, inView: navbarVisisble } = useInView();
  const dispatch = useDispatch() 

  
  useEffect(() => {
    if (currentVideo) {
      dispatch(loadCurrentVideo({details: currentVideo?.results[0]}))
    }
  }, [currentVideo])

  useEffect(() => {
    if (currentVideo?.results[0]?.id) {
      setTimeout(() => {
        setShowSkeleton(false)
      }, 3000);
    }
  }, [currentVideo?.results[0]?.id])
  
  
  
  return (
    <>
      <Head>
        <title>{`${currentVideo?.results[0]?.title} | ${currentVideo?.results[0]?.stage_name} - Dukaflani`}</title>
        <meta name="title" content={`${currentVideo?.results[0]?.title} | ${currentVideo?.results[0]?.stage_name} - Dukaflani`} />
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${currentVideo?.results[0]?.youtube_id}&tab=links`} />
        <meta property="og:title" content={`${currentVideo?.results[0]?.title} | ${currentVideo?.results[0]?.stage_name} - Dukaflani`} />
        <meta property="og:description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta 
            property="og:image" 
            content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${currentVideo?.results[0]?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${currentVideo?.results[0]?.song_title}&video_title=${currentVideo?.results[0]?.title}&avatar=${currentVideo?.results[0]?.profile_avatar}`} />

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${currentVideo?.results[0]?.youtube_id}&tab=links`} />
        <meta property="twitter:title" content={`${currentVideo?.results[0]?.title} | ${currentVideo?.results[0]?.stage_name} - Dukaflani`} />
        <meta property="twitter:description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta 
            property="twitter:image" 
            content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${currentVideo?.results[0]?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${currentVideo?.results[0]?.song_title}&video_title=${currentVideo?.results[0]?.title}&avatar=${currentVideo?.results[0]?.profile_avatar}`} />
      </Head>

      <SidebarNavMobile>
        <div ref={mobileWatchNavbarRef}>
          <NavigationMobile/>
        </div>
        <main>
          <div className='flex max-w-lg landscape:max-w-lg min-h-screen mx-auto'>
              {showSkeleton ? <section className='w-full md:pt-3 landscape:pt-3'>
                <CurrentVideoPlayerMobileSkeleton/>
              </section> : <section className='w-full md:pt-3 landscape:pt-3'>
                <CurrentVideoPlayerMobile videoProfile={videoProfile} video={currentVideo?.results[0]} navbarVisisble={navbarVisisble} />
              </section>}
          </div>
        </main>
      </SidebarNavMobile>
    </>
  )
}

export default WatchCurrentVideo


export async function getServerSideProps( context ) {
  const { query } = context
  

  const videosApiCallResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/videos/?youtube_id=${query?.v}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
    });

    const videoData = await videosApiCallResponse.json();

    const profileApiCallResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/user-profile/${videoData?.results[0]?.customuserprofile}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      }
  });
  const profileData = await profileApiCallResponse.json();

  return {
    props: {
      currentVideo: videoData,
      videoProfile: profileData,
    }
  }

}