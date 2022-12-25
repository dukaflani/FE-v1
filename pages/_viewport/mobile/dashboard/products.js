import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { TvIcon, BuildingStorefrontIcon, TicketIcon, ChevronDoubleRightIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import { TvIcon as TvSolid, BuildingStorefrontIcon as StoreSolid, TicketIcon as TicketSolid } from '@heroicons/react/24/solid'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import MyProducts from '../../../../components/MyProducts'
import NavigationMobile from '../../../../components/NavigationMobile'
import { useFetchUserProductsQuery } from '../../../../redux/features/videos/videosApiSlice'

const products = () => {
    const router = useRouter()
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id

    const queryParams = {
      user: currentUser,
    }

    const { data: userProducts, isLoading } = useFetchUserProductsQuery(queryParams)
    const numOfProducts = userProducts?.data?.length


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

        
        {/* // <link rel="icon" href="/dukaflani-blue-logo-small.png" /> */}
      </Head>
      <NavigationMobile/>
      <main className='pt-24'>
        <section className='flex'>
          <div className='w-1/12 flex items-start justify-start pl-5 fixed left-0 top-40'>
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
          <div className='w-1/12'></div>
          {/* <div className='flex-1 pr-5 w-11/12 pl-24'> */}
          <div className='flex-1 pr-5 w-11/12 max-w-7xl'>
            <div className='mb-2 uppercase font-semibold flex items-center justify-between pr-10'>
                <div>
                    <div>My Products</div>
                    <div className='text-xs text-gray-600 font-normal'>{!numOfProducts ? '0' : numOfProducts} {numOfProducts == 1 ? "product" : "products"}</div>
                </div>
                <div onClick={() => router.push("/dashboard/upload?item=product")} className='font-medium border text-xs  border-gray-500 p-2 cursor-pointer hover:bg-gray-200'>Upload Product</div>
            </div>
            {!isLoading && numOfProducts != 0 ? 
            (<div className='grid grid-cols-4 gap-x-3 gap-y-4 p-5'>
                {[...Array(numOfProducts).keys()].map((myItem, i) => (
                    <MyProducts product={userProducts?.data[i]} key={i}/>
                ))}
            </div>) : (
            <>
              {isLoading ? <div>Loading your <strong>products</strong>. Please wait...</div> : <div>You do not have any <strong>products</strong> yet...</div>}
            </>
              )
            }   
          </div>
        </section>
      </main>
    </SidebarNavMobile>
  )
}

export default products