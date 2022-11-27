import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import avatar from '../../media/g-like-that.png'
import SidebarNav from '../../components/SidebarNav'
import Navigation from '../../components/Navigation'
import Image from "next/legacy/image";
import FanbaseButton from '../../components/FanbaseButton'
import ProfilePageComponent from '../../components/ProfilePageComponent'

const index = () => {
    const router = useRouter()

  return (
    <SidebarNav>
        <Head>
        <title>Profile | Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
      <div>
      <Navigation/>
        <>
            <ProfilePageComponent/>
        </>
    </div>
    </SidebarNav>
  )
}

export default index