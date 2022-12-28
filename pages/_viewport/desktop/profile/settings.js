import Head from 'next/head'
import React from 'react'
import Navigation from '../../../../components/Navigation'
import ProfileSettingsComponent from '../../../../components/ProfileSettingsComponent'
import SidebarNav from '../../../../components/SidebarNav'

const settings = () => {
  return (
    <SidebarNav>
        <Head>
        <title>Profile Settings | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Profile Settings | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Profile Settings | Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Profile Settings | Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>

        
        {/* // <link rel="icon" href="/dukaflani-blue-logo-small.png" /> */}
      </Head>
        <>
            <Navigation/>
            <ProfileSettingsComponent/>
        </>
    </SidebarNav>
  )
}

export default settings