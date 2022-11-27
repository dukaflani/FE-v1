import React, { useState } from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import numeral from 'numeral'
import noAvatar from '../media/noimage.webp'
import poster from '../media/MED.png'
import { LinkIcon, ShoppingBagIcon, MicrophoneIcon, DevicePhoneMobileIcon, MusicalNoteIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import StreamingLinks from './streamingLinks'
import ProductCard from './ProductCard'
import LyricsPage from './LyricsPage'
import SkizaTunesPage from './SkizaTunesPage'
import AlbumPage from './AlbumPage'
import EventsPage from './EventsPage'
import FanbaseButton from './FanbaseButton';
import { useCurrentVideoQuery, useFanbaseCountQuery } from '../redux/features/videos/videosApiSlice';

const CurrentVideoPanel = () => {
    const router = useRouter()
    const { videoid } = router.query
    const { video } = useSelector((state) => state.videos)
    const { user } = useSelector((state) => state.auth)

    const is_loggedin = user?.info


    const queryParams = {
        fan_of: video?.details?.user,
      }

    const { data: fancount } = useFanbaseCountQuery(queryParams)

    const videoQueryParams = {
        video_id: videoid,
      }

    const {data: currentvideo} = useCurrentVideoQuery(videoQueryParams)


    const fanbase2 = fancount?.data?.length
          let fanbase3 = ''
          fanbase2 < 1000 || fanbase2 % 10 === 0 ? fanbase3 = numeral(fanbase2).format('0a') :  fanbase3 = numeral(fanbase2).format('0.0a')

      

    const [activeTab, setActiveTab] = useState(0)
    const tabs = [
        {
            name: 'Links',
            icon: <LinkIcon className="h-5 w-5" />,
        },
        {
            name: 'Shop',
            icon: <ShoppingBagIcon className="h-5 w-5" />,
        },
        {
            name: 'Lyrics',
            icon: <MicrophoneIcon className="h-5 w-5" />,
        },
        {
            name: 'Skiza',
            icon: <DevicePhoneMobileIcon className="h-5 w-5" />,
        },
        {
            name: 'Album',
            icon: <MusicalNoteIcon className="h-5 w-5" />,
        },
        {
            name: 'Events',
            icon: <CalendarDaysIcon className="h-5 w-5" />,
        },
    ]
    const activeStyles = "w-2/12 flex flex-col items-center justify-center text-xs cursor-pointer uppercase tracking-tight leading-4 py-2 border-b-2 border-black"
    const regularStyles = "w-2/12 flex flex-col items-center justify-center text-xs cursor-pointer uppercase tracking-tight leading-4 py-2 border-b-2 border-transparent hover:border-gray-200"

  return (
    <div className='border'>
        <div className='flex py-4 border-b px-1 bg-white'>
            <div className='w-2/12 flex items-center justify-center'>
                <div className='relative h-12 w-12'>
                    <Image
                        src={currentvideo?.data?.avatar ? currentvideo?.data?.avatar : noAvatar}
                        layout="fill"
                        objectFit='cover'
                        className='rounded-full'
                        />
                </div>
            </div>
            <div className='w-8/12 flex flex-col items-start justify-center'>
                <div className='flex space-x-1'>
                    <div className='text-base tracking-tighter font-medium text-gray-900 line-clamp-2'>{currentvideo?.data?.stage_name ? currentvideo?.data?.stage_name : `${currentvideo?.data?.first_name} ${currentvideo?.data?.last_name}`}</div>
                    {currentvideo?.data?.verified && 
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                    </span>
                    }
                </div>
                <div className='mx-1 text-sm tracking-tight'>Fanbase {fanbase3}</div>
            </div>
            <div className='w-2/12 flex items-center justify-center'>
                <FanbaseButton/>
                {!is_loggedin && <button onClick={() => router.push("/account/login")} className='uppercase p-1 bg-gray-800 text-white font-semibold tracking-wider text-xs'>Join</button>}
            </div>
        </div>
        <div className='mx-2 my-5 flex'>
            <div className='w-4/12'>
            <div className='relative h-full w-full'>
                    <Image
                        src={poster}
                        layout="fill"
                        objectFit='contain'
                        />
                </div>
            </div>
            <div className='w-8/12 pl-1 space-y-2 pt-1'>
                <p className='text-base line-clamp-2 tracking-tighter leading-4'>Join the biggest medical channel in Africa. Get daily updates from our resident physician</p>
                <div className='flex'>
                    <div className='w-2/12 flex items-center justify-center'>
                        <div className='relative h-8 w-8'>
                            <Image
                                src={poster}
                                layout="fill"
                                objectFit='cover'
                                />
                        </div>
                    </div>
                    <div className='pl-1 w-10/12'>
                        <p className='text-xs text-gray-800 font-semibold line-clamp-1'>Safaricom PLC</p>
                        <p className='text-xs font-light line-clamp-1'><span className='font-semibold bg-yellow-200'>Ad</span> &bull; www.safaricom.co.ke</p>
                    </div>
                </div>
                <div className='flex items-center justify-center bg-sky-200 cursor-pointer'>
                    <button className='uppercase text-xs font-semibold tracking-wide text-sky-700 p-1'>learn more</button>
                </div>
            </div>
        </div>
        <div className='flex mb-5 mt-10 px-1'>
            {tabs.map((tab, i) => (
                <div key={i} onClick={() => setActiveTab(i)} className={activeTab === i ? activeStyles : regularStyles}>
                <div>{tab.icon}</div>
                    <p>{tab.name}</p>
                    </div>
            ))}
        </div>
        <div>
           {
            {
                0 : <StreamingLinks/>,
                1 : <ProductCard/>,
                2 : <LyricsPage/>,
                3 : <SkizaTunesPage/>,
                4 : <AlbumPage/>,
                5 : <EventsPage/>,
            }[activeTab]
           }
        </div>
    </div>
  )
}

export default CurrentVideoPanel