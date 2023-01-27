import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { TvIcon, BuildingStorefrontIcon, TicketIcon, ChevronDoubleRightIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import SidebarNav from '../../../../../components/SidebarNav'
import Navigation from '../../../../../components/Navigation'
import MoreItemsWrapper from '../../../../../components/MoreItemsWrapper'



const moreItems = () => {
    const router = useRouter()
    const { view } = router.query
    const [videoTitle, setVideoTitle] = useState('')
    const [currentInput, setCurrentInput] = useState(0)

  return (
    <SidebarNav>
      <Head>
        <title>More Items | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="More Items | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here STREAMING LINKS MERCHANDISE LYRICS SKIZA TUNES ALBUMS EVENTS VIDEOS""/>
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
                <li onClick={() => router.push("/dashboard/more-items?view=smart-links")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
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
                    <div className='uppercase '>More Items</div>
                </div>
                {
                  {
                    "smart-links": <div onClick={() => router.push("/dashboard/upload?item=smart-links")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Upload Smart Links</div>,
                    "lyrics": <div onClick={() => router.push("/dashboard/upload?item=lyrics")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Upload Lyrics</div>,
                    "skiza-tune": <div onClick={() => router.push("/dashboard/upload?item=skiza-tunes")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Upload Skiza Tune</div>,
                    "music-collection": <div onClick={() => router.push("/dashboard/upload?item=music-collection")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Upload Album</div>,
                  }[view]
                }
            </div>
                <MoreItemsWrapper currentInput={currentInput} setCurrentInput={setCurrentInput} videoTitle={videoTitle} setVideoTitle={setVideoTitle} />  
          </div>
        </section>
      </main>
    </SidebarNav>
  )
}

export default moreItems