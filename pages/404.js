import Head from 'next/head'
import Image from "next/legacy/image";
import { useRouter } from 'next/router'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import Poster from '../public/media/404-page.png'

const errorPage = () => {
    const router = useRouter()

  return (
    <>
      <Head>
        <title>Page Not Found | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Page Not Found | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <div className='h-screen flex items-start justify-center'>
        <div className='relative w-5/12 h-4/6 pt-10'>
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
    </>
  )
}

export default errorPage