import { useState, Fragment, useEffect } from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router'
import { Disclosure, Dialog, Transition } from '@headlessui/react'
// import ReactTooltip from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral'
import Modal from 'react-modal'
import noAvatar from '../public/media/noimage.webp'
import poster from '../public/apple-touch-icon.png'
import poster1 from '../public/media/dukaflani-advert-poster.jpg'
import { CheckBadgeIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import {  XMarkIcon, LinkIcon, ShoppingBagIcon, MicrophoneIcon,
    MusicalNoteIcon, TicketIcon, DevicePhoneMobileIcon, PlayIcon } from '@heroicons/react/24/outline'
import { tabButtons } from '../data/tabButtons';
import StreamingLinks from './StreamingLinks'
import ProductCard from './ProductCard'
import LyricsPage from './LyricsPage'
import SkizaTunesPage from './SkizaTunesPage'
import AlbumPage from './AlbumPage'
import EventsPage from './EventsPage'
import { toggleSignInModalOpen } from '../redux/features/navigation/navigationSlice'
import { useCurrentVideoQuery, useFetchCurrentVideoProfileQuery, useProfileLikedQuery, 
    useJoinFanbaseMutation, useLeaveFanbaseMutation } from '../redux/features/videos/videosApiSlice';
import Link from 'next/link';
import ProfileModalContent from './ProfileModalContent';


Modal.setAppElement("#__next")



const CurrentVideoPanel = ({ video }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { v, tab } = router.query
    const { user } = useSelector((state) => state.auth)
    const [modalOpen, setModalOpen] = useState(false)
    const [fanbaseErrors, setFanbaseErrors] = useState(null)
    let [isOpen, setIsOpen] = useState(false)
    const [is_loggedin, setIs_loggedin] = useState(false)
    const [is_a_fan, setIs_a_fan] = useState(false)
    const [totalFanBaseCount, setTotalFanBaseCount] = useState('')

    
    // const videoQueryParams = {
    //     video_id: v,
    // }
    
    // const {data: currentvideo} = useCurrentVideoQuery(videoQueryParams)
    const currentVideoProfileId = video?.customuserprofile
    
    const videoProfileQueryParams = {
        profile_id: currentVideoProfileId ? currentVideoProfileId : 0,
    }
    
    
    const {data: videoProfile} = useFetchCurrentVideoProfileQuery(videoProfileQueryParams)
    const {data: videoProfileLiked } = useProfileLikedQuery(videoProfileQueryParams)
    // const is_loggedin = !!user?.info?.id
    // const is_a_fan = !!videoProfileLiked?.data[0]?.id

    useEffect(() => {
        setIs_loggedin(!!user?.info?.id)
        setIs_a_fan(!!videoProfileLiked?.data[0]?.id)
        setTotalFanBaseCount(videoProfile?.data?.fanbase_count)
    }, [user?.info?.id, videoProfileLiked?.data[0]?.id, videoProfile?.data?.fanbase_count])
    


    const fanbase2 = totalFanBaseCount ? totalFanBaseCount : 0
    let fanbase3 = ''
    fanbase2 < 1000 || fanbase2 % 10 === 0 ? fanbase3 = numeral(fanbase2).format('0a') :  fanbase3 = numeral(fanbase2).format('0.0a')
    const numOfFanbase = fanbase3 == 0 ? 0 : fanbase3

    
    const activeStyles = "w-2/12 flex flex-col items-center justify-center text-xs cursor-pointer uppercase tracking-tight leading-4 py-2 border-b-2 border-black"
    const regularStyles = "w-2/12 flex flex-col items-center justify-center text-xs cursor-pointer uppercase tracking-tight leading-4 py-2 border-b-2 border-transparent hover:border-gray-200"

    const [ joinFanbase ] = useJoinFanbaseMutation() 
    const [ leaveFanbase ] = useLeaveFanbaseMutation()


    function closeModal() {
        setIsOpen(false)
      }
    
    function openModal() {
        setIsOpen(true)
      }


    const joinDetails = {
        "customuserprofile_id": video?.customuserprofile
    }

    const leaveDetails = {
        "fanbase_id": videoProfileLiked?.data[0]?.id
    }



    const handleJoin = async () => {
        try {
            setIs_a_fan(true)
            setTotalFanBaseCount(prevFanbaseCount => prevFanbaseCount + 1)
            await joinFanbase(joinDetails)
        } catch (error) {
            setFanbaseErrors(error)
        }

    }

    const handleLeave = async () => {
        try {
            setIs_a_fan(false)
            setTotalFanBaseCount(prevFanbaseCount => prevFanbaseCount - 1)
            await leaveFanbase(leaveDetails)
        } catch (error) {
            setFanbaseErrors(error)
        }
    }


  return (
    <>
        <div className='border mt-20'>
            <div className='flex py-4 border-b px-1 bg-white'>
                <div className='w-2/12 flex items-center justify-center'>
                    <div className='relative h-12 w-12'>
                        {!is_loggedin && <Image
                            src={video?.profile_avatar ? video?.profile_avatar : noAvatar}
                            layout="fill"
                            objectFit='cover'
                            className='rounded-full'
                            />}
                        {is_loggedin && <Image
                            src={videoProfile?.data?.profile_avatar ? videoProfile?.data?.profile_avatar : noAvatar}
                            layout="fill"
                            objectFit='cover'
                            className='rounded-full'
                            />}
                    </div>
                </div>
                <div className='w-8/12 flex flex-col items-start justify-center'>
                    {!is_loggedin && <div className='flex space-x-1'>
                        <div onClick={() => setModalOpen(true)} className='text-base tracking-tight cursor-pointer font-medium text-gray-900 line-clamp-2'>{video?.stage_name ? video?.stage_name : ''}</div>
                        {video?.verified && 
                        <span>
                            <CheckBadgeIcon className="w-4 h-4 text-blue-600" />
                        </span>
                        }
                    </div>}
                    {is_loggedin && <div className='flex space-x-1'>
                        <div onClick={() => setModalOpen(true)} className='text-base tracking-tight cursor-pointer font-medium text-gray-900 line-clamp-2'>{videoProfile?.data?.stage_name ? video?.stage_name : ''}</div>
                        {videoProfile?.data?.is_verified == 'True' && 
                        <span>
                            <CheckBadgeIcon className="w-4 h-4 text-blue-600" />
                        </span>
                        }
                    </div>}
                    {!is_loggedin && <div className='mx-1 text-sm tracking-tight text-gray-600'>Login to view fanbase</div>}
                    {is_loggedin && <div className='mx-1 text-sm tracking-tight text-gray-600'>Fanbase {numOfFanbase}</div>}
                </div>
                {is_loggedin && <div className='w-2/12 flex items-center justify-center'>
                    {is_a_fan ? <button onClick={handleLeave} className='uppercase p-1 border border-gray-700 text-gray-800 font-semibold tracking-wider text-xs'>Leave</button> 
                    : 
                    <button onClick={handleJoin} className='uppercase p-1 bg-gray-800 text-white font-semibold tracking-wider text-xs'>Join</button>}
                 </div>}
                {!is_loggedin && <div className='w-2/12 flex items-center justify-center'>
                    <button onClick={() => dispatch(toggleSignInModalOpen(true))} className='uppercase p-1 bg-gray-800 text-white font-semibold tracking-wider text-xs'>Login</button>
                </div>}
            </div>
            <div className='mx-2 my-5 flex'>
                <div className='w-4/12'>
                <div className='relative h-full w-full'>
                        <Image
                            src={poster1}
                            layout="fill"
                            objectFit='contain'
                            priority
                            />
                    </div>
                </div>
                <div className='w-8/12 pl-1 space-y-2 pt-1'>
                    <p className='text-base line-clamp-2 tracking-tighter leading-4'>Sell, Advertise & Promote on Dukaflani</p>
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
                            <p className='text-xs text-gray-800 font-semibold line-clamp-1'>Dukaflani Ads</p>
                            <p className='text-xs font-light line-clamp-1'><span className='font-semibold bg-yellow-200'>Ad</span> &bull; dukaflani.com/business</p>
                        </div>
                    </div>
                    <div  
                        className='flex items-center justify-center bg-sky-200 cursor-pointer'
                        onClick={openModal}
                        >
                        <div className='uppercase text-xs font-semibold tracking-wide text-sky-700 p-1'>More Info</div>
                    </div>
                </div>
            </div>
            <div className='flex mb-5 mt-10 px-1'>
                {tabButtons.map((tabButtonItem, i) => (
                    <Link 
                        href={{
                            pathname: `/watch/`,
                            query: { v: v, tab: tabButtonItem.urlQueryParams.tab },
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
                    "product" : <ProductCard title={video?.details?.title} />,
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
            <ProfileModalContent setModalOpen={setModalOpen} info={video} fanbase={fanbase2} />
          </div>
        </Modal>



        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className='flex items-center justify-between'>
                        <span>Sponsored</span>
                        <span onClick={closeModal}>
                            <XMarkIcon className='w-4 h-4 cursor-pointer'/>
                        </span>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                        <div  className='flex items-center justify-center space-x-2'>
                            <div>
                                <div className='relative h-20 w-20 bg-gray-100 rounded-md'>
                                    <Image
                                        src={poster}
                                        layout="fill"
                                        objectFit='cover'
                                        className="rounded-md"
                                        />
                                </div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <span className="text-base font-bold leading-4 tracking-tight text-gray-800 line-clamp-3">Sell, Advertise & Promote on Dukaflani</span>
                                <span className="text-gray-600 text-xs pt-2 line-clamp-1">dukaflani.com/business</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 mb-2">
                      Dukaflani is an Online Marketplace powered by <strong>Music Videos</strong>
                    </p>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                                    <div className='uppercase text-xs font-semibold tracking-wide text-gray-800 p-1'>What You Can Do</div>
                                    <ChevronUpIcon
                                        className={`${
                                            open ? 'rotate-180 transform' : ''
                                        } h-4 w-4 text-gray-800`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 mt-4 pt-2 pb-2 text-sm text-gray-500 max-h-52 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-700">
                                <ul className="space-y-3">
                                <li className="space-y-1">
                                    <div className="flex items-center justify-start space-x-2">
                                        <span className="p-2 bg-gray-200 rounded-full">
                                            <LinkIcon className="h-4 w-4"/>
                                        </span>
                                        <span className="tracking-tight text-gray-800 font-medium flex-1">Smart Links (Link in Bio)</span>
                                    </div>
                                    <p className="tracking-tight text-gray-600 leading-4">Promote your music by linking to over a dozen of the most popular
                                     music streaming platforms for free.</p>
                                </li>
                                <li className="space-y-1">
                                    <div className="flex items-center justify-start space-x-2">
                                        <span className="p-2 bg-gray-200 rounded-full">
                                            <ShoppingBagIcon className="h-4 w-4"/>
                                        </span>
                                        <span className="tracking-tight text-gray-800 font-medium flex-1">Products & Merchandise Sales</span>
                                    </div>
                                    <p className="tracking-tight text-gray-600 leading-4">Sell with every video you add to Dukaflani and have 
                                    orders made directly to your WhatsApp at no cost.</p>
                                </li>
                                <li className="space-y-1">
                                    <div className="flex items-center justify-start space-x-2">
                                        <span className="p-2 bg-gray-200 rounded-full">
                                            <MicrophoneIcon className="h-4 w-4"/>
                                        </span>
                                        <span className="tracking-tight text-gray-800 font-medium flex-1">Lyrics</span>
                                    </div>
                                    <p className="tracking-tight text-gray-600 leading-4">Share your lyrics with every video you add to Dukaflani in a 
                                    structured and well organised setup that makes it easy for your fans to find & sing along to.</p>
                                </li>
                                <li className="space-y-1">
                                    <div className="flex items-center justify-start space-x-2">
                                        <span className="p-2 bg-gray-200 rounded-full">
                                            <DevicePhoneMobileIcon className="h-4 w-4"/>
                                        </span>
                                        <span className="tracking-tight text-gray-800 font-medium flex-1">Skiza Tunes</span>
                                    </div>
                                    <p className="tracking-tight text-gray-600 leading-4">Sell more Ringback tunes at no cost by adding an unlimited number of SMS & USSD codes from mobile phone service providers in different
                                    countries with every video you add to Dukaflani.</p>
                                </li>
                                <li className="space-y-1">
                                    <div className="flex items-center justify-start space-x-2">
                                        <span className="p-2 bg-gray-200 rounded-full">
                                            <MusicalNoteIcon className="h-4 w-4"/>
                                        </span>
                                        <span className="tracking-tight text-gray-800 font-medium flex-1">Album Links</span>
                                    </div>
                                    <p className="tracking-tight text-gray-600 leading-4">Make it convinient for people to discover and buy your albums, mixtapes e.t.c by 
                                    linking to them on Dukaflani at no cost.</p>
                                </li>
                                <li className="space-y-1">
                                    <div className="flex items-center justify-start space-x-2">
                                        <span className="p-2 bg-gray-200 rounded-full">
                                            <TicketIcon className="h-4 w-4"/>
                                        </span>
                                        <span className="tracking-tight text-gray-800 font-medium flex-1">Events & Tickets</span>
                                    </div>
                                    <p className="tracking-tight text-gray-600 leading-4">Promote your events or sell event tickets from different ticketing companies at no cost 
                                    by linking to them on Dukaflani. Events appear under all your videos with the latest event on top.</p>
                                </li>
                                <li className="space-y-1">
                                    <div className="flex items-center justify-start space-x-2">
                                        <span className="p-2 bg-gray-200 rounded-full">
                                            <PlayIcon className="h-4 w-4"/>
                                        </span>
                                        <span className="tracking-tight text-gray-800 font-medium flex-1">YouTube Views & Revenue</span>
                                    </div>
                                    <p className="tracking-tight text-gray-600 leading-4">Your view count & revenue on YouTube will not be affected as your video
                                     on Dukaflani is embedded directly from YouTube.</p>
                                </li>
                            </ul>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                  </div>
                  <div className="mt-4">
                    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CurrentVideoPanel