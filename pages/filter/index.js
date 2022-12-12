import Head from 'next/head'
import { useRouter } from 'next/router'
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { HomeIcon as HomeOutline, RectangleGroupIcon as RGOutline, 
  UserCircleIcon  as UCOutline, Cog6ToothIcon as C6Outline, CloudArrowUpIcon as CloudArrowUpIconOutline} from '@heroicons/react/24/outline'
import SidebarNav from '../../components/SidebarNav'
import GenreTabs from '../../components/GenreTabs'
import Navigation from '../../components/Navigation'
import VideoCardMapPage from '../../components/VideoCardMapPage'
import VideoSkeletonMapPage from '../../components/VideoSkeletonMapPage'
import { useFilterVideoGenreQuery } from '../../redux/features/videos/videosApiSlice'
import { useEffect } from 'react'





const FilterPage = () => {
  const router = useRouter()
  const { gid } = router.query


  const queryParams = {
    genre_id: gid
  }

  const { data: filteredVideos, isLoading } = useFilterVideoGenreQuery(queryParams)
  

  

  return (
    <SidebarNav>
      <Head>
        <title>Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
      <Navigation/>
      <main className='pt-36'>
        <section>
          <GenreTabs/>
          {/* <GenreTabsEX/> */}
        </section>
        <section className='flex'>
          <div className='w-1/12 flex items-start justify-start pl-5 fixed left-0 top-40'>
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
          <div className='w-1/12'></div>
          {/* <div className='flex-1 pr-5 w-11/12 pl-24'> */}
          <div className='flex-1 pr-5 w-11/12 max-w-7xl'>
            <div className='grid grid-cols-4 gap-x-3 gap-y-10'>
              {isLoading ? 
              <VideoSkeletonMapPage/>
              :
              <VideoCardMapPage videos={filteredVideos}/>
            }
            </div>
          </div>
        </section>
      </main>
    </SidebarNav>
  )
}

export default FilterPage