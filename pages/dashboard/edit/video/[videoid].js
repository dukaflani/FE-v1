import React from 'react'
import Head from 'next/head'
import SidebarNav from '../../../../components/SidebarNav'
import Navigation from '../../../../components/Navigation'
import EditVideo from '../../../../components/EditVideo'

const editVideo = () => {
  return (
    <SidebarNav>
    <Head>
        <title>Edit Video | Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
      <Navigation/>
      <>
      <main className='flex flex-col items-center justify-center pt-20'>
        <article className='bg-white border-b shadow-sm w-7/12 p-5'>
            <EditVideo/>
        </article>
        <footer className='flex items-center justify-center p-5'>
            <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
        </footer>
      </main>
      </>
    </SidebarNav>
  )
}

export default editVideo