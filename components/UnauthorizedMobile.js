import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';
import Image from "next/legacy/image";
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import Poster from '../public/media/unauthorized-page.png'
import NavigationMobile from './NavigationMobile'
import SidebarNavMobile from './SidebarNavMobile'
import BottomNavigationMobile from './BottomNavigationMobile';

const UnauthorizedMobile = () => {
  const router = useRouter()
  return (
    <SidebarNavMobile>
        <Head>
        <title>Unauthorized!</title>
        <meta name="title" content="Unauthorized!"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Unauthorized!"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Unauthorized!"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

        
        {/* // <link rel="icon" href="/dukaflani-blue-logo-small.png" /> */}
      </Head>
      <NavigationMobile/>
      <div className='h-screen w-screen flex items-start justify-center pt-20'>
        {/* <div className='relative w-11/12 h-3/6 sm:w-5/12 sm:h-5/6  md:w-4/12 md:h-5/6 lg:w-4/12 lg:h-4/6'> */}
        <div className='relative w-48 h-48'>
          <Image 
            src={Poster}
            layout="fill"
            objectFit='cover'
            alt='Page not found'
            />
        </div>
            <div onClick={() => router.back()} className='absolute cursor-pointer bottom-16 font-semibold tracking-tight uppercase flex items-center justify-center space-x-2'>
              <ArrowUturnLeftIcon className='h-5 w-5'/>   
              <button>Go Back</button>
            </div>
      </div>
      <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default UnauthorizedMobile