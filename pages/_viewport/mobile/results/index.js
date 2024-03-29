import { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BuildingStorefrontIcon, TicketIcon, RectangleGroupIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import VideoCardMobile from '../../../../components/VideoCardMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import useFetchVideos from '../../../../customHooks/useFetchVideos'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'

const videoSearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const { search_query } = router.query
  const formatedSearchQuery = search_query?.replace(/"+"/g, " ")

  useEffect(() => {
    setSearchTerm(formatedSearchQuery)
  }, [search_query])

const [pageNumber, setPageNumber] = useState('')
const [searchQuery, setSearchQuery] = useState('')
const [userId, setUserId] = useState('')
const [genreId, setGenreId] = useState('')
const [uniqueId, setUniqueId] = useState('')

useEffect(() => {
  setSearchQuery(search_query)
  setPageNumber(1)
}, [search_query])

const { loading, error, videos, hasMore } = useFetchVideos(searchQuery, userId, pageNumber, genreId, uniqueId)
const numOfVideos = videos?.length ? videos?.length : 0

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


  return (
    <SidebarNavMobile>
      <Head>
        <title>{searchTerm} — Entrepreneurs In Music Sell Their Products Here</title>
        <meta name="title" content={`${searchTerm} — Entrepreneurs In Music Sell Their Products Here`}/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <NavigationMobile setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <main className='pt-[3.7rem] md:pt-[5rem] landscape:pt-[5rem] pb-10'>
        <section className='flex'>
          <div className='hidden lg:flex w-1/12 items-start justify-start pl-5 fixed left-0 top-40'>
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
          <div className='hidden lg:block w-1/12'></div>
          <div className='flex-1 w-full max-w-7xl mx-auto'>
            {/* <div className='mb-2 font-semibold flex items-center justify-between pr-10'> */}
                {/* <div> */}
                    {/* <div className='uppercase'>Search Results For:</div> */}
                    {/* <div className='text-base text-gray-600 font-normal'>{searchTerm}</div> */}
                    {/* <div className='text-xs text-gray-600 font-normal'>{numOfVideos} {numOfVideos == 1 ? "video" : 'videos'}</div> */}
                {/* </div> */}
                {/* <div onClick={() => router.push("/dashboard/upload?item=video")} className='font-medium border text-xs  border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Upload Video</div> */}
            {/* </div> */}
            {search_query ? 
            (<div className='grid grid-cols-1'>
                {videos?.map((video, i) => {
                  if (videos?.length === i + 1) {
                    return <div className='col-span-4' key={i} ref={lastVideoElementRef} ><VideoCardMobile video={video}/></div>
                  } else {
                    return <div className='col-span-4' key={i}><VideoCardMobile video={video}/></div>
                  }
                  
                }
                )}
            </div>) : (<div className='flex items-center justify-center text-sm'>Enter your search in the searchbox above</div>)
            }   
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
          </div>
        </section>
        {videos.length == 0 && !loading && <div className='p-2 flex justify-center items-start text-gray-600'>No results found for&nbsp;<span className='font-semibold tracking-tight'>{searchTerm}</span>.&nbsp;Please try a different search!</div>}
      </main>
      <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default videoSearchResults