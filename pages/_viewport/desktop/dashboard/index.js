import { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import useFetchVideos from '../../../../customHooks/useFetchVideos'
import { useFetchUserProfileQuery } from '../../../../redux/features/videos/videosApiSlice'
import { BuildingStorefrontIcon, TicketIcon, RectangleGroupIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import { TvIcon as TvSolid, RectangleGroupIcon as RGSolid } from '@heroicons/react/24/solid'
import SidebarNav from '../../../../components/SidebarNav'
import MyVideos from '../../../../components/MyVideos'
import Navigation from '../../../../components/Navigation'
import Unauthorized from '../../../../components/Unauthorized'

const dashboard = () => {
  const router = useRouter()
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser
  }

const { data: profile } = useFetchUserProfileQuery(queryParams) 
const userProfile = profile?.data[0] ? profile?.data[0] : null
const userRole = userProfile?.role

const [pageNumber, setPageNumber] = useState('')
const [searchQuery, setSearchQuery] = useState('')
const [userId, setUserId] = useState('')
const [genreId, setGenreId] = useState('')
const [uniqueId, setUniqueId] = useState('')


const { loading, error, videos, hasMore } = useFetchVideos(searchQuery, userId, pageNumber, genreId, uniqueId)

  useEffect(() => {
    if (!!user?.info?.id) {
    setUserId(user?.info?.id)
    setPageNumber(1)
    }
  }, [user?.info?.id])

  

  const observer = useRef()
  const lastVideoElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPage => prevPage + 1)
      }
    }) 
    if (node) observer.current.observe(node)
  }, [ loading, hasMore ])

    if (userRole != 'ARTIST') {
      return  <Unauthorized/> 
    }


  return (
    <SidebarNav>
      {/* <Head>
        <title>Dashboard | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Dashboard | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Dashboard | Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Dashboard | Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

      
      </Head> */}
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
            <div className='mb-2 uppercase font-semibold flex items-center justify-between pr-10'>
                <div>
                    <div>My Videos</div>
                    <div className='text-xs text-gray-600 font-normal'>{videos?.length} {videos?.length == 1 ? "video" : 'videos'}</div>
                </div>
                <div onClick={() => router.push("/dashboard/upload?item=video")} className='font-medium border text-xs  border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Upload Video</div>
            </div>
            {currentUser ? 
            (<div className='grid grid-cols-4 gap-x-3 gap-y-4 p-5'>
                {videos?.map((myVideo, i) => {
                  if (videos?.length === i + 1) {
                    return  <div className='col-span-4' key={i} ref={lastVideoElementRef}><MyVideos video={myVideo}/></div>
                  } else {
                    return  <div className='col-span-4' key={i}><MyVideos video={myVideo}/></div>
                  }
                }
                )}
            </div>) : (<div>You do not have any <strong>videos</strong> yet...</div>)
            }
          </div>
        </section>
        {loading ? <div className='flex items-center justify-center py-3'>
            <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-800 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading Videos...
            </button>
            </div>
            :
            <div className='flex items-center justify-center py-3'>
              <span className='font-semibold leading-6 text-sm text-gray-800 transition ease-in-out duration-150 cursor-not-allowed'>The End</span>
            </div>
            }
      </main>
    </SidebarNav>
  )
}

export default dashboard