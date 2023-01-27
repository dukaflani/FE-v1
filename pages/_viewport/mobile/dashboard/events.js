import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { TvIcon, BuildingStorefrontIcon, TicketIcon, ChevronDoubleRightIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import { TvIcon as TvSolid, BuildingStorefrontIcon as StoreSolid, TicketIcon as TicketSolid } from '@heroicons/react/24/solid'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import MyEventsMobile from '../../../../components/MyEventsMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import { useFetchEventsQuery, useFetchUserProfileQuery } from '../../../../redux/features/videos/videosApiSlice'
import UnauthorizedMobile from '../../../../components/UnauthorizedMobile'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'

const events = () => {
    const router = useRouter()
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id

    const queryParams = {
      user_id: currentUser
      }

      const userProfileQueryParams = {
        user: currentUser,
      }


  const { data: events, isLoading } = useFetchEventsQuery(queryParams)
  const numOfEvents = events?.data?.length
  const { data: profile } = useFetchUserProfileQuery(userProfileQueryParams) 
  const userProfile = profile?.data[0] ? profile?.data[0] : null
    const userRole = userProfile?.role

    if (userRole != 'ARTIST') {
      return  <UnauthorizedMobile/> 
    }

  

  return (
    <SidebarNavMobile>
      <Head>
        <title>My Events | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="My Events | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here  STREAMING LINKS  MERCHANDISE  LYRICS  SKIZA TUNES  ALBUMS  EVENTS  VIDEOS""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <NavigationMobile/>
      <main className='pt-[3.7rem] md:pt-[5rem] landscape:pt-[5rem] pb-10'>
        <section className='flex'>
          <div className='hidden lg:flex w-1/12 items-start justify-start pl-5 fixed left-0 top-40'>
            <nav>
            <ul className='space-y-10'>
                <li onClick={() => router.push("/dashboard")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <RectangleGroupIcon className="w-6 h-6" />
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
                    <TicketSolid className="w-6 h-6" />
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
            {!isLoading && numOfEvents != 0 ? 
            (<div className='grid grid-cols-1'>
                {[...Array(numOfEvents).keys()].map((myItem, i) => (
                    <MyEventsMobile event={events?.data[i]} key={i}/>
                ))}
            </div>) : (
              <>
                {isLoading ? <div className='flex items-center justify-center text-sm'>Loading your &nbsp;<strong>events</strong>. Please wait...</div> : <div className='flex items-center justify-center text-sm'>You do not have any &nbsp;<strong>events</strong> yet...</div>}
              </>
            )
            }   
          </div>
        </section>
      </main>
      <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default events