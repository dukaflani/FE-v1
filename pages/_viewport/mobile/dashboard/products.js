import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { TvIcon, BuildingStorefrontIcon, TicketIcon, ChevronDoubleRightIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import { TvIcon as TvSolid, BuildingStorefrontIcon as StoreSolid, TicketIcon as TicketSolid } from '@heroicons/react/24/solid'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import MyProductsMobile from '../../../../components/MyProductsMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import { useFetchUserProductsQuery, useFetchUserProfileQuery } from '../../../../redux/features/videos/videosApiSlice'
import UnauthorizedMobile from '../../../../components/UnauthorizedMobile'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'

const products = () => {
    const router = useRouter()
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id

    const queryParams = {
      user: currentUser,
    }

    const { data: userProducts, isLoading } = useFetchUserProductsQuery(queryParams)
    const { data: profile } = useFetchUserProfileQuery(queryParams) 
    const numOfProducts = userProducts?.data?.length
    const userProfile = profile?.data[0] ? profile?.data[0] : null
    const userRole = userProfile?.role

    // if (userRole != 'ARTIST') {
    //   return  <UnauthorizedMobile/> 
    // }


  return (
    <SidebarNavMobile>
      <Head>
        <title>My Products | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="My Products | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="My Products | Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="My Products | Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

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
                  <div className='text-sm'>Dashboard</div>
                </li>
                <li onClick={() => router.push("/dashboard/products")} className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    <StoreSolid className="w-6 h-6" />
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
            {/* <div className='mb-2 uppercase font-semibold flex items-center justify-between pr-10'>
                <div>
                    <div>My Products</div>
                    <div className='text-xs text-gray-600 font-normal'>{!numOfProducts ? '0' : numOfProducts} {numOfProducts == 1 ? "product" : "products"}</div>
                </div>
                <div onClick={() => router.push("/dashboard/upload?item=product")} className='font-medium border text-xs  border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Upload Product</div>
            </div> */}
            {!isLoading && numOfProducts != 0 ? 
            (<div className='grid grid-cols-1'>
                {[...Array(numOfProducts).keys()].map((myItem, i) => (
                    <MyProductsMobile product={userProducts?.data[i]} key={i}/>
                ))}
            </div>) : (
            <>
              {isLoading ? <div className='flex items-center justify-center text-sm'>Loading your &nbsp; <strong>products</strong>. Please wait...</div> : <div className='flex items-center justify-center text-sm'>You do not have any &nbsp; <strong>products</strong> yet...</div>}
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

export default products