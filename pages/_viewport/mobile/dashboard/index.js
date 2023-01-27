import { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import useFetchVideos from '../../../../customHooks/useFetchVideos'
import { useFetchUserProfileQuery } from '../../../../redux/features/videos/videosApiSlice'
import { BuildingStorefrontIcon, TicketIcon, RectangleGroupIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import { TvIcon as TvSolid, RectangleGroupIcon as RGSolid } from '@heroicons/react/24/solid'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import MyVideosMobile from '../../../../components/MyVideosMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import UnauthorizedMobile from '../../../../components/UnauthorizedMobile'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'

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
      return  <UnauthorizedMobile/> 
    }


  return (
    <SidebarNavMobile>
      <Head>
        <title>Dashboard | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Dashboard | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here - STREAMING LINKS | MERCHANDISE | LYRICS | SKIZA TUNES | ALBUMS | EVENTS | VIDEOS""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <NavigationMobile/>
      <main className='pt-[3.7rem] md:pt-[5rem] landscape:pt-[5rem] pb-10'>
        <section className='flex'>
          <div className='hidden lg:flex w-1/12 items-start justify-start pl-5 fixed left-0 top-40'>
            <nav>
              <ul className='space-y-10'>
                <li className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <RGSolid className="w-6 h-6" />
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
                <li onClick={() => router.push("/dashboard/more-items?view=smart-links")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
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
            {currentUser ? 
            (<div className='grid grid-cols-1'>
                {videos?.map((myVideo, i) => {
                  if (videos?.length === i + 1) {
                    return  <div className='col-span-4' key={i} ref={lastVideoElementRef}><MyVideosMobile video={myVideo}/></div>
                  } else {
                    return  <div className='col-span-4' key={i}><MyVideosMobile video={myVideo}/></div>
                  }
                }
                )}
            </div>) : (<div className='flex items-center justify-center text-sm'>You do not have any&nbsp;<strong>videos</strong>&nbsp;yet...</div>)
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
      <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default dashboard