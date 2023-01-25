import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { HomeIcon as HomeOutline, RectangleGroupIcon as RGOutline, 
  UserCircleIcon  as UCOutline, Cog6ToothIcon as C6Outline, CloudArrowUpIcon as CloudArrowUpIconOutline} from '@heroicons/react/24/outline'
import useFetchVideos from '../../../customHooks/useFetchVideos' 
import SidebarNavMobile from '../../../components/SidebarNavMobile'
import GenreTabsMobile from '../../../components/GenreTabsMobile'
import NavigationMobile from '../../../components/NavigationMobile'
import VideoCardMapPageMobile from '../../../components/VideoCardMapPageMobile'
import VideoSkeletonMapPageMobile from '../../../components/VideoSkeletonMapPageMobile'
import BottomNavigationMobile from '../../../components/BottomNavigationMobile'





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
    <SidebarNavMobile>
      {/* <Head>
        <title>Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

        
      </Head> */}
      <NavigationMobile/>
      <main className='pt-[6.3rem] md:pt-[8rem] landscape:pt-[8rem] pb-10'>
        <section>
          <GenreTabsMobile/>
        </section>
        <section className='flex'>
          <div className='hidden lg:flex w-1/12 items-start justify-start pl-5 fixed left-0 top-40'>
            <nav>
              <ul className='space-y-10'>
                <li onClick={() => router.push('/')} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {true ? <HomeIcon className="w-6 h-6"/> : <HomeOutline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Home</div> */}
                </li>
                <li onClick={() => router.push('/dashboard')} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {!true ? <RectangleGroupIcon className="w-6 h-6"/> : <RGOutline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Dashboard</div> */}
                </li>
                <li onClick={() => router.push('/profile')} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
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
          <div className='hidden lg:block w-1/12'></div>
          <div className='flex-1 w-full max-w-7xl mx-auto'>
            <div className='grid grid-cols-1'>
              {videos?.length > 0 ? 
              <VideoCardMapPageMobile videos={videos} loading={loading} hasMore={hasMore} setPageNumber={setPageNumber} />
              :
              <VideoSkeletonMapPageMobile/>
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
      <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default Home
