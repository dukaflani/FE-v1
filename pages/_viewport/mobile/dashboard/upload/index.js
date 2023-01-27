import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { TvIcon, BuildingStorefrontIcon, TicketIcon, ChevronDoubleRightIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import SidebarNavMobile from '../../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../../components/NavigationMobile'
import UploadVideoMobile from '../../../../../components/UploadVideoMobile'
import UnauthorizedMobile from '../../../../../components/UnauthorizedMobile'
import { useFetchUserProfileQuery } from '../../../../../redux/features/videos/videosApiSlice'
import BottomNavigationMobile from '../../../../../components/BottomNavigationMobile'



const uploadPage = () => {
    const router = useRouter()
    const { item } = router.query
    const [videoTitle, setVideoTitle] = useState('')
    const [currentInput, setCurrentInput] = useState(0)

    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id

    const queryParams = {
      user: currentUser,
    }

    const { data: profile } = useFetchUserProfileQuery(queryParams) 
    const userProfile = profile?.data[0] ? profile?.data[0] : null


    const userRole = userProfile?.role

    // if (userRole != 'ARTIST') {
    //   return  <UnauthorizedMobile/> 
    // }



  return (
    <SidebarNavMobile>
      <Head>
        <title>Upload Page | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Upload Page | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <NavigationMobile/>
      <main className='pt-[3.7rem] md:pt-[5rem] landscape:pt-[5rem] pb-10'>
        <section className='flex'>
          <div className='hidden lg:flex w-1/12 items-start justify-start pl-5 fixed left-0 top-40'>
            <nav>
            <ul className='space-y-10'>
                <li onClick={() => router.push("/dashboard")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <RectangleGroupIcon className="w-6 h-6" />
                  </div>
                  {/* <div className='text-sm'>Dashboard</div> */}
                </li>
                <li onClick={() => router.push("/dashboard/products")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <BuildingStorefrontIcon className="w-6 h-6" />
                  </div>
                  {/* <div className='text-sm'>My Products</div> */}
                </li>
                <li onClick={() => router.push("/dashboard/events")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <TicketIcon className="w-6 h-6" />
                  </div>
                  {/* <div className='text-sm'>My Events</div> */}
                </li>
                <li onClick={() => router.push("/dashboard/more-items")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <ChevronDoubleRightIcon className="w-6 h-6" />
                  </div>
                  {/* <div className='text-sm'>More Items</div> */}
                </li>
              </ul>
            </nav>
          </div>
          <div className='hidden lg:block w-1/12'></div>
          <div className='flex-1 w-full max-w-7xl mx-auto'>
                <UploadVideoMobile currentInput={currentInput} setCurrentInput={setCurrentInput} videoTitle={videoTitle} setVideoTitle={setVideoTitle} />  
          </div>
        </section>
      </main>
      <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default uploadPage