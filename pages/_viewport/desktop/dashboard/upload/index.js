import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
// import { useSelector } from 'react-redux'
import { TvIcon, BuildingStorefrontIcon, TicketIcon, ChevronDoubleRightIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import SidebarNav from '../../../../../components/SidebarNav'
import Navigation from '../../../../../components/Navigation'
import UploadVideo from '../../../../../components/UploadVideo'
// import Unauthorized from '../../../../../components/Unauthorized'
import { useFetchUserProfileQuery } from '../../../../../redux/features/videos/videosApiSlice'



const uploadPage = () => {
    const router = useRouter()
    const { item } = router.query
    const [videoTitle, setVideoTitle] = useState('')
    const [currentInput, setCurrentInput] = useState(0)

    // const { user } = useSelector((state) => state.auth)
    // const currentUser = user?.info?.id

    // const queryParams = {
    //   user: currentUser,
    // }

    // const { data: profile } = useFetchUserProfileQuery(queryParams) 
    // const userProfile = profile?.data[0] ? profile?.data[0] : null


    // const userRole = userProfile?.role

    // if (userRole != 'ARTIST') {
    //   return  <Unauthorized/> 
    // }



  return (
    <SidebarNav>
      <Head>
        <title>Upload Page | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Upload Page | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <Navigation/>
      <main className='pt-24'>
        <section className='flex'>
          <div className='w-1/12 flex items-start justify-start pl-5 fixed left-0 top-40'>
            <nav>
            <ul className='space-y-10'>
                <li onClick={() => router.push("/dashboard")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <RectangleGroupIcon className="w-6 h-6" />
                  </div>
                  <div className='text-sm'>Dashboard</div>
                </li>
                <li onClick={() => router.push("/dashboard/products")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <BuildingStorefrontIcon className="w-6 h-6" />
                  </div>
                  <div className='text-sm'>My Products</div>
                </li>
                <li onClick={() => router.push("/dashboard/events")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <TicketIcon className="w-6 h-6" />
                  </div>
                  <div className='text-sm'>My Events</div>
                </li>
                <li onClick={() => router.push("/dashboard/more-items")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <ChevronDoubleRightIcon className="w-6 h-6" />
                  </div>
                  <div className='text-sm'>More Items</div>
                </li>
              </ul>
            </nav>
          </div>
          <div className='w-1/12'></div>
          {/* <div className='flex-1 pr-5 w-11/12 pl-24'> */}
          <div className='flex-1 pr-5 w-11/12 max-w-7xl'>
            <div className='mb-2 font-semibold flex items-center justify-between pr-10'>
                <div className='w-10/12'>
                    <div className='uppercase '>Upload Video</div>
                    <div className='text-sm text-gray-600 font-normal line-clamp-1 pr-3'>{videoTitle ? videoTitle : "-"}</div>
                </div>
                {
                  {
                    "video" :<div onClick={() => router.push("/dashboard")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>My Videos</div>,
                    "smart-links" :<div onClick={() => router.push("/dashboard/more-items?view=smart-links")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>My Smart Links</div>,
                    "product" :<div onClick={() => router.push("/dashboard/products?view=products")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>My Products</div>,
                    "lyrics" :<div onClick={() => router.push("/dashboard/more-items?view=lyrics")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>My Lyrics</div>,
                    "skiza-tunes" :<div onClick={() => router.push("/dashboard/more-items?view=skiza-tune")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>My Skiza Tunes</div>,
                    "music-collection" :<div onClick={() => router.push("/dashboard/more-items?view=music-collection")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>My Albums</div>,
                    "event" :<div onClick={() => router.push("/dashboard/events")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>My Events</div>,
                  }[item]
                }
            </div>
                <UploadVideo currentInput={currentInput} setCurrentInput={setCurrentInput} videoTitle={videoTitle} setVideoTitle={setVideoTitle} />  
          </div>
        </section>
      </main>
    </SidebarNav>
  )
}

export default uploadPage