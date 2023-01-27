import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { HomeIcon as HomeOutline, RectangleGroupIcon as RGOutline, 
  UserCircleIcon  as UCOutline, Cog6ToothIcon as C6Outline, CloudArrowUpIcon as CloudArrowUpIconOutline} from '@heroicons/react/24/outline'
import SidebarNav from '../../../../components/SidebarNav'
import GenreTabs from '../../../../components/GenreTabs'
import Navigation from '../../../../components/Navigation'
import VideoCardMapPage from '../../../../components/VideoCardMapPage'
import useFetchVideos from '../../../../customHooks/useFetchVideos'





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
    <SidebarNav>
      <Head>
        <title>{genre?.replace(/-/g, " ")} | Dukaflani — Home of Music Videos</title>
        <meta name="title" content={`${genre?.replace(/-/g, " ")} | Dukaflani — Home of Music Videos`} />
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <Navigation/>
      <main className='pt-36'>
        <section>
          <GenreTabs/>
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
          <div className='flex-1 pr-5 w-11/12 max-w-7xl'>
            <div className='grid grid-cols-4 gap-x-3 gap-y-10'>
              <VideoCardMapPage videos={filteredVideoArr} loading={loading} hasMore={hasMore} setPageNumber={setPageNumber} />
            </div>
          </div>
        </section>
          {filteredVideoArr?.length == 0 && !loading && <div className='p-2 flex justify-center items-start text-gray-600'>No&nbsp;<span className='uppercase font-semibold tracking-tight'>{genre?.replace(/-/g, " ")}</span>&nbsp;videos available</div>}
      </main>
    </SidebarNav>
  )
}

export default FilterPage
