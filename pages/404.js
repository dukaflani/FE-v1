import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const errorPage = () => {
    const router = useRouter()

  return (
    <div className='flex items-start justify-center h-screen'>
        <Head>
        <title>Page Not Found | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Page Not Found | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Page Not Found | Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Page Not Found | Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
        <div className='flex flex-col'>
            <div className='flex items-center justify-center'>
            <div className='w-2/6'>
                <img src='/media/404-page.png' alt='page not found'/>
            <div className='flex items-center justify-center w-4/12 mx-auto'>
                <img src='/branding/dukaflani-logo-black-medium.png' alt='logo'/>
            </div>
            <div className='flex items-center justify-center '>
                <button onClick={() => router.back()} className='cursor-pointer'>Go Back</button>
            </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default errorPage