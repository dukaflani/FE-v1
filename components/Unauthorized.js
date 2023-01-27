import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';
import Image from "next/legacy/image";
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import Poster from '../public/media/unauthorized-page.png'
import Navigation from './Navigation'
import SidebarNav from './SidebarNav'

const Unauthorized = () => {
  const router = useRouter()
  return (
    <SidebarNav>
      <Head>
        <title>Unauthorized!</title>
        <meta name="title" content="Unauthorized!"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <Navigation/>
      <div className='h-screen w-screen flex items-start justify-center pt-14'>
        <div className='relative w-3/12 h-4/6'>
          <Image 
            src={Poster}
            layout="fill"
            objectFit='cover'
            alt='Page not found'
            />
        </div>
            <div onClick={() => router.back()} className='absolute cursor-pointer bottom-32 font-semibold tracking-tight uppercase flex items-center justify-center space-x-2'>
              <ArrowUturnLeftIcon className='h-5 w-5'/>   
              <button>Go Back</button>
            </div>
      </div>
    </SidebarNav>
  )
}

export default Unauthorized