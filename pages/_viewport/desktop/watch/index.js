import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { loadCurrentVideo } from '../../../../redux/features/videos/videosSlice'
import SidebarNav from '../../../../components/SidebarNav'
import Navigation from '../../../../components/Navigation'
import CurrentVideoPlayer from '../../../../components/CurrentVideoPlayer'
import CurrentVideoPanel from '../../../../components/CurrentVideoPanel'
import CurrentVideoPlayerSkeleton from '../../../../components/CurrentVideoPlayerSkeleton'
import CurrrentVideoPanelSkeleton from '../../../../components/CurrrentVideoPanelSkeleton'

const WatchCurrentVideo = ({ currentVideo, videoProfile }) => {
  const router = useRouter()
  // const { v } = router.query
  const dispatch = useDispatch() 

  // const queryParams = {
  //   video_id: v,
  // }

  // const { data: currentVideo, isLoading } = useCurrentVideoQuery(queryParams)


  
  useEffect(() => {
    if (currentVideo) {
      dispatch(loadCurrentVideo({details: currentVideo?.results[0]}))
    }
  }, [currentVideo])
  
  
  return (
    <SidebarNav>
      <Head>
        <title>{`${currentVideo?.results[0]?.title} | ${currentVideo?.results[0]?.stage_name} - Dukaflani`}</title>
        <meta name="title" content={`${currentVideo?.results[0]?.title} | ${currentVideo?.results[0]?.stage_name} - Dukaflani`} />
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${currentVideo?.results[0]?.youtube_id}&tab=links`} />
        <meta property="og:title" content={`${currentVideo?.results[0]?.title} | ${currentVideo?.results[0]?.stage_name} - Dukaflani`} />
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        {/* <meta property="og:image" content={currentVideo?.results[0]?.thumbnail} /> */}
        <meta 
            property="og:image" 
            content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${currentVideo?.results[0]?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${currentVideo?.results[0]?.song_title}&video_title=${currentVideo?.results[0]?.title}&avatar=${currentVideo?.results[0]?.profile_avatar}`} />

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${currentVideo?.results[0]?.youtube_id}&tab=links`} />
        <meta property="twitter:title" content={`${currentVideo?.results[0]?.title} | ${currentVideo?.results[0]?.stage_name} - Dukaflani`} />
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        {/* <meta property="twitter:image" content={currentVideo?.results[0]?.thumbnail} />   */}
        <meta 
            property="twitter:image" 
            content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${currentVideo?.results[0]?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${currentVideo?.results[0]?.song_title}&video_title=${currentVideo?.results[0]?.title}&avatar=${currentVideo?.results[0]?.profile_avatar}`} />
      </Head>


      <Navigation/>
      {/* <main className='pt-20'> */}
      <main className='scroll-smooth'>
        <div className='flex max-w-6xl mx-auto space-x-5'>
            <section className='w-8/12 pl-4 xl:pl-0'>
              {currentVideo?.results[0]?.id ? <CurrentVideoPlayer video={currentVideo?.results[0]} /> : <CurrentVideoPlayerSkeleton/>}
            </section>
            <section className='w-4/12 pr-4 xl:pr-0'>
              {currentVideo?.results[0]?.id ? <CurrentVideoPanel videoProfile={videoProfile} video={currentVideo?.results[0]} /> : <CurrrentVideoPanelSkeleton/>}
            </section>
        </div>
      </main>
    </SidebarNav>
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