import Head from 'next/head'
import React from 'react'
import Navigation from '../../components/Navigation'
import ProfileSettingsComponent from '../../components/ProfileSettingsComponent'
import SidebarNav from '../../components/SidebarNav'

const settings = () => {
  return (
    <SidebarNav>
        <Head>
        <title>Profile Settings | Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
        <>
            <Navigation/>
            <ProfileSettingsComponent/>
        </>
    </SidebarNav>
  )
}

export default settings