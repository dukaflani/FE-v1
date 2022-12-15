import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const errorPage = () => {
    const router = useRouter()

  return (
    <div className='flex items-start justify-center h-screen'>
        <Head>
        <title>Not Found | Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
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