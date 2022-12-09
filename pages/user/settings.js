import Head from 'next/head'
import React from 'react'
import Navigation from '../../components/Navigation'
import SidebarNav from '../../components/SidebarNav'
import UserSettingsComponent from '../../components/UserSettingsComponent'

const settings = () => {
  return (
    <SidebarNav>
        <Head>
        <title>User Settings | Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
        <>
            <Navigation/>
            <UserSettingsComponent/>
        </>
    </SidebarNav>
  )
}

export default settings