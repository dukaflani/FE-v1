import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { HomeIcon as HomeOutline, RectangleGroupIcon as RGOutline, 
  UserCircleIcon  as UCOutline, Cog6ToothIcon as C6Outline, CloudArrowUpIcon as CloudArrowUpIconOutline} from '@heroicons/react/24/outline'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import GenreTabsMobile from '../../../../components/GenreTabsMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import VideoCardMapPageMobile from '../../../../components/VideoCardMapPageMobile'
import useFetchVideos from '../../../../customHooks/useFetchVideos'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'





const FilterPage = () => {
  const router = useRouter()
  const { gid, genre } = router.query
  const [pageNumber, setPageNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [userId, setUserId] = useState('')
  const [genreId, setGenreId] = useState('')
  const [uniqueId, setUniqueId] = useState('')

  useEffect(() => {
    setPageNumber(1)
    setGenreId(gid)
  }, [gid])

  const { loading, error, videos, hasMore } = useFetchVideos(searchQuery, userId, pageNumber, genreId, uniqueId)

  const filteredVideoArr = videos.filter( filteredVideo =>  {
    return filteredVideo?.genre == gid
  })


  


  return (
    <SidebarNavMobile>
      <Head>
        <title>{genre?.replace(/-/g, " ")} | Dukaflani — Buy From Musicians</title>
        <meta name="title" content={`${genre?.replace(/-/g, " ")} | Dukaflani — Buy From Musicians`} />
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
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
                <li onClick={() => router.push('/dashboard/upload')} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
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
              <VideoCardMapPageMobile videos={filteredVideoArr} loading={loading} hasMore={hasMore} setPageNumber={setPageNumber} />
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
          {filteredVideoArr.length == 0 && !loading && <div className='p-2 flex justify-center items-start text-gray-600'>No&nbsp;<span className='uppercase font-semibold tracking-tight'>{genre?.replace(/-/g, " ")}</span>&nbsp;videos available</div>}
      </main>
      <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default FilterPage
