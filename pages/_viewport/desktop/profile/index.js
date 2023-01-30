import Head from 'next/head'
import SidebarNav from '../../../../components/SidebarNav'
import Navigation from '../../../../components/Navigation'
import ProfilePageComponent from '../../../../components/ProfilePageComponent'

const index = () => {

  return (
    <SidebarNav>
        <Head>
        <title>Profile | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Profile | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
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