import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import SidebarNav from '../../../components/SidebarNav'
import Navigation from '../../../components/Navigation'
import { TvIcon, BuildingStorefrontIcon, TicketIcon, ChevronDoubleRightIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import MoreItemsWrapper from '../../../components/MoreItemsWrapper'



const moreItems = () => {
    const router = useRouter()
    const [videoTitle, setVideoTitle] = useState('')
    const [currentInput, setCurrentInput] = useState(0)

  return (
    <SidebarNav>
      <Head>
        <title>Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
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
                    <div className='uppercase '>More Items</div>
                </div>
                <div onClick={() => router.push("/dashboard")} className='w-2/12 flex items-center justify-center font-medium border text-xs uppercase border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Dashboard</div>
            </div>
                <MoreItemsWrapper currentInput={currentInput} setCurrentInput={setCurrentInput} videoTitle={videoTitle} setVideoTitle={setVideoTitle} />  
          </div>
        </section>
      </main>
    </SidebarNav>
  )
}

export default moreItems