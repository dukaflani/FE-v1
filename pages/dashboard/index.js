import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useFetchUserVideosQuery } from '../../redux/features/videos/videosApiSlice'
import { BuildingStorefrontIcon, TicketIcon, RectangleGroupIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import { TvIcon as TvSolid, RectangleGroupIcon as RGSolid } from '@heroicons/react/24/solid'
import SidebarNav from '../../components/SidebarNav'
import MyVideos from '../../components/MyVideos'
import Navigation from '../../components/Navigation'

const dashboard = () => {
  const router = useRouter()
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser
  }

const { data: myVideos } = useFetchUserVideosQuery(queryParams)

const numOfVideos = !myVideos?.data ? ' ' : myVideos?.data?.length


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
                <li className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <RGSolid className="w-6 h-6" />
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
            <div className='mb-2 uppercase font-semibold flex items-center justify-between pr-10'>
                <div>
                    <div>My Videos</div>
                    <div className='text-xs text-gray-600 font-normal'>{numOfVideos} {numOfVideos == 1 ? "video" : 'videos'}</div>
                </div>
                <div onClick={() => router.push("/dashboard/upload")} className='font-medium border text-xs  border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Upload Page</div>
            </div>
            {true ? 
            (<div className='grid grid-cols-4 gap-x-3 gap-y-4 p-5'>
                {[...Array(numOfVideos).keys()].map((myItem, i) => (
                    <MyVideos video={myVideos?.data[i]} key={i}/>
                ))}
            </div>) : (<div>You do not have any <strong>videos</strong> yet...</div>)
            }   
          </div>
        </section>
      </main>
    </SidebarNav>
  )
}

export default dashboard