import Head from 'next/head'
import React from 'react'
import LoginComponent from '../../../../components/LoginComponent'
// import icon from '../../../../media/dukaflani-default-og-poster.png'
// import icon from '../../../../dukaflani-blue-logo-small.png'



const login = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Head>
        <title>Login | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Login | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Login | Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Login | Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

        
        {/* <link rel="icon" href="/../../../../public/dukaflani-blue-logo-small.png" /> */}
      </Head>
      <div className='w-6/12 h-4/6 bg-white shadow'>
        <LoginComponent/>
      </div>
    </div>
  )
}

export default login