import Head from 'next/head'
import SidebarNav from '../../../../components/SidebarNav'
import Navigation from '../../../../components/Navigation'
import ProfilePageComponent from '../../../../components/ProfilePageComponent'

const index = () => {

  return (
    <SidebarNav>
        <Head>
        <title>Profile | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Profile | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
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