import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { HomeIcon as HomeOutline, RectangleGroupIcon as RGOutline, 
  UserCircleIcon  as UCOutline, Cog6ToothIcon as C6Outline, CloudArrowUpIcon as CloudArrowUpIconOutline} from '@heroicons/react/24/outline'
import useFetchVideos from '../../../customHooks/useFetchVideos' 
import SidebarNav from '../../../components/SidebarNav'
import GenreTabs from '../../../components/GenreTabs'
import Navigation from '../../../components/Navigation'
import VideoCardMapPage from '../../../components/VideoCardMapPage'
import VideoSkeletonMapPage from '../../../components/VideoSkeletonMapPage'





const Home = () => {
  const router = useRouter()
  const [pageNumber, setPageNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [userId, setUserId] = useState('')
  const [genreId, setGenreId] = useState('')
  const [uniqueId, setUniqueId] = useState('')

  const { loading, error, videos, hasMore } = useFetchVideos(searchQuery, userId, pageNumber, genreId, uniqueId)


  useEffect(() => {
    setPageNumber(1)
  }, [])
  

  

  return (
    <SidebarNav>
      <Navigation/>
      <main className='pt-36'>
        <section>
          <GenreTabs/>
        </section>
        <section className='flex'>
          <div className='w-1/12 flex items-start justify-start pl-5 fixed left-0 top-40'>
            <nav>
              <ul className='space-y-10'>
                <li onClick={() => router.push({ pathname: '/' })} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {true ? <HomeIcon className="w-6 h-6"/> : <HomeOutline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Home</div> */}
                </li>
                <li onClick={() => router.push({ pathname: '/dashboard' })} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {!true ? <RectangleGroupIcon className="w-6 h-6"/> : <RGOutline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Dashboard</div> */}
                </li>
                <li onClick={() => router.push({ pathname: '/profile' })} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {!true ? <UserCircleIcon className="w-6 h-6"/> : <UCOutline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Profile</div> */}
                </li>
                <li onClick={() => router.push({ pathname: '/dashboard/upload', query: { item: 'video' } })} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {!true ? <CloudArrowUpIcon className="w-6 h-6"/> : <CloudArrowUpIconOutline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Upload</div> */}
                </li>
              </ul>
            </nav>
          </div>
          <div className='w-1/12'></div>
          {/* <div className='flex-1 pr-5 w-11/12 pl-24'> */}
          <div className='flex-1 pr-5 w-11/12 max-w-7xl mx-auto'>
            <div className='grid grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-10'>
              {videos?.length > 0 ? 
              <VideoCardMapPage videos={videos} loading={loading} hasMore={hasMore} setPageNumber={setPageNumber} />
              :
              <VideoSkeletonMapPage/>
            }
            </div>
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
      </main>
    </SidebarNav>
  )
}

export default Home
