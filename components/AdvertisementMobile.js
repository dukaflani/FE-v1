import { useState } from "react"
import Image from "next/legacy/image";
import {  XMarkIcon, LinkIcon, ShoppingBagIcon, MicrophoneIcon,
MusicalNoteIcon, TicketIcon, DevicePhoneMobileIcon, PlayIcon } from '@heroicons/react/24/outline'
import logo from '../public/apple-touch-icon.png'


const AdvertisementMobile = () => {
    const [showDetails, setShowDetails] = useState(false)

  return (
    <>
        <div className="p-2 bg-white border-b shadow-sm flex items-center">
            <div>
                <picture>
                    <img
                        src="/apple-touch-icon.png"
                        alt="Advertiser logo"
                        className="h-12 w-12 md:h-14 md:w-14 landscape:h-14 landscape:w-14 bg-gray-200"
                    />
                </picture>
            </div>
            <div className="flex-1 pl-2 pr-3 flex flex-col">
                <span className="font-semibold text-gray-800 tracking-tight text-sm md:text-base landscape:text-base line-clamp-1">Sell, Advertise & Promote on Dukaflani</span>
                <div className="text-xs md:text-sm landscape:text-sm text-gray-500 tracking-tight space-x-1 font-medium">
                    <span className="mr-1 bg-yellow-200 font-bold">Ad</span>
                    &bull;
                    <span>Dukaflani Ads</span>
                </div>
            </div>
            <button onClick={() => setShowDetails(true)}  className="text-sm py-1 px-2 bg-blue-500 text-white font-medium rounded-lg tracking-tight">Info</button>
        </div>
        {/* Advertisement Details */}
        <div className={showDetails ? 'bg-white p-2 fixed bottom-0 left-0 right-0 border-t rounded-t-lg h-[70%]' : 'hidden'}>
        <nav className='relative pt-10'>
            <div className='flex items-center justify-between px-2 border-b pb-2 absolute top-0 left-0 right-0'>
                <span className='font-medium tracking-tight'>Sponsored</span>
                <span onClick={() => setShowDetails(false)}>
                    <XMarkIcon className='w-4 h-4'/>
                </span>
            </div>
            <div className='max-h-[35rem] overflow-y-auto pb-20 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent'>
                <ul className='flex flex-col items-start justify-center mx-auto max-w-sm text-sm space-y-5 pb-32 pt-5'>
                    <li  className='flex items-center justify-center space-x-2'>
                        <div>
                            {/* <div className='relative h-24 w-full'>
                                {album?.data?.cover && <Image
                                    src={!album?.data?.cover ? cover : album?.data?.cover}
                                    layout="fill"
                                    objectFit='cover'
                                    />}
                            </div> */}
                            <div className='relative h-20 w-20 bg-gray-100 rounded-md'>
                                <Image
                                    src={logo}
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
                    </li>
                    <li  className='flex items-center justify-center space-x-2 w-full pl-2 pr-5'>
                        <span className=" border-b w-full">Details:</span>
                    </li>
                    <li  className='flex flex-col space-y-2 items-start justify-start space-x-2 w-full pl-2 pr-5'>
                        <span className="tracking-tight leading-4">Dukaflani is an Online Marketplace powered by <strong>Music Videos</strong>.</span>
                        <span className="tracking-tight leading-4 uppercase font-medium">What You Can Do:</span>
                        <div >
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
                                <li>
                                <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    </>
  )
}

export default AdvertisementMobile