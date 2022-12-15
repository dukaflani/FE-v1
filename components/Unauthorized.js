import React from 'react'
import Head from 'next/head'
import Navigation from './Navigation'
import SidebarNav from './SidebarNav'

const Unauthorized = () => {
  return (
    <SidebarNav>
        <Head>
        <title>Unauthorized</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
      <Navigation/>
        <div className='flex justify-center pt-20'>
            <div className='w-3/12 flex justify-center'>
                <img src='/media/unauthorized-page.png' alt='unauthorized'/>
            </div>
        </div>
    </SidebarNav>
  )
}

export default Unauthorized