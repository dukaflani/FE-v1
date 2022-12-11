import React, { useState } from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router'
// import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import numeral from 'numeral'
import Modal from 'react-modal'
import noAvatar from '../public/media/noimage.webp'
import poster from '../public/media/MED.png'
import { LinkIcon, ShoppingBagIcon, MicrophoneIcon, DevicePhoneMobileIcon, 
    MusicalNoteIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import StreamingLinks from './streamingLinks'
import ProductCard from './ProductCard'
import LyricsPage from './LyricsPage'
import SkizaTunesPage from './SkizaTunesPage'
import AlbumPage from './AlbumPage'
import EventsPage from './EventsPage'
import FanbaseButton from './FanbaseButton';
import { useCurrentVideoQuery, useFanbaseCountQuery } from '../redux/features/videos/videosApiSlice';
import Link from 'next/link';
import ProfileModalContent from './ProfileModalContent';


Modal.setAppElement("#__next")



const CurrentVideoPanel = () => {
    const router = useRouter()
    const { videoid, tab } = router.query
    const { video } = useSelector((state) => state.videos)
    const { user } = useSelector((state) => state.auth)
    const [modalOpen, setModalOpen] = useState(false)

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

      
    const tabButtons = [
        {
            name: 'Links',
            icon: <LinkIcon className="h-5 w-5" />,
            urlQueryParams: {tab: 'links'},
        },
        {
            name: 'Shop',
            icon: <ShoppingBagIcon className="h-5 w-5" />,
            urlQueryParams: {tab: 'product'},
        },
        {
            name: 'Lyrics',
            icon: <MicrophoneIcon className="h-5 w-5" />,
            urlQueryParams: {tab: 'lyrics'},
        },
        {
            name: 'Skiza',
            icon: <DevicePhoneMobileIcon className="h-5 w-5" />,
            urlQueryParams: {tab: 'skiza'},
        },
        {
            name: 'Album',
            icon: <MusicalNoteIcon className="h-5 w-5" />,
            urlQueryParams: {tab: 'album'},
        },
        {
            name: 'Events',
            icon: <CalendarDaysIcon className="h-5 w-5" />,
            urlQueryParams: {tab: 'events'},
        },
    ]
    const activeStyles = "w-2/12 flex flex-col items-center justify-center text-xs cursor-pointer uppercase tracking-tight leading-4 py-2 border-b-2 border-black"
    const regularStyles = "w-2/12 flex flex-col items-center justify-center text-xs cursor-pointer uppercase tracking-tight leading-4 py-2 border-b-2 border-transparent hover:border-gray-200"

  return (
    <>
        <div className='border'>
            <div className='flex py-4 border-b px-1 bg-white'>
                <div className='w-2/12 flex items-center justify-center'>
                    <div className='relative h-12 w-12'>
                        <Image
                            src={currentvideo?.data?.profile_avatar ? currentvideo?.data?.profile_avatar : noAvatar}
                            layout="fill"
                            objectFit='cover'
                            className='rounded-full'
                            />
                    </div>
                </div>
                <div className='w-8/12 flex flex-col items-start justify-center'>
                    <div className='flex space-x-1'>
                        <div onClick={() => setModalOpen(true)} className='text-base tracking-tight cursor-pointer font-medium text-gray-900 line-clamp-2'>{currentvideo?.data?.stage_name ? currentvideo?.data?.stage_name : ''}</div>
                        {currentvideo?.data?.verified && 
                        <span>
                            <CheckBadgeIcon className="w-4 h-4 text-blue-600" />
                        </span>
                        }
                    </div>
                    <div className='mx-1 text-sm tracking-tight text-gray-600'>Fanbase {fanbase3}</div>
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
                            priority
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
                {tabButtons.map((tabButtonItem, i) => (
                    <Link 
                        href={{
                            pathname: `/watch/${videoid}`,
                            query: { tab: tabButtonItem.urlQueryParams.tab },
                        }}
                        key={i} 
                        className={tab === tabButtonItem.urlQueryParams.tab ? activeStyles : regularStyles}
                        >
                        <div className='flex flex-col items-center justify-center'>
                            <div>{tabButtonItem.icon}</div>
                            <p>{tabButtonItem.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div>
            {
                {
                    "links" : <StreamingLinks/>,
                    "product" : <ProductCard/>,
                    "lyrics" : <LyricsPage/>,
                    "skiza" : <SkizaTunesPage/>,
                    "album" : <AlbumPage/>,
                    "events" : <EventsPage />,
                }[tab]
            }
            </div>
            {/* <ReactTooltip /> */}
        </div>


        <Modal 
          isOpen={modalOpen}
          style={{content:{backgroundColor:'transparent', border:'none', display:'flex', alignItems:'center', justifyContent:'center'}, 
                  overlay:{backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex:'99999'}}}
          >
          <div className='bg-white shadow w-7/12 h-5/6'>
            <ProfileModalContent setModalOpen={setModalOpen} info={currentvideo?.data} fanbase={fanbase2} />
          </div>
        </Modal>
    </>
  )
}

export default CurrentVideoPanel