import Head from 'next/head'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import ProfilePageComponentMobile from '../../../../components/ProfilePageComponentMobile'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'

const index = () => {

  return (
    <SidebarNavMobile>
      <Head>
        <title>Profile | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Profile | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here  STREAMING LINKS  MERCHANDISE  LYRICS  SKIZA TUNES  ALBUMS  EVENTS  VIDEOS""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <div>
      <NavigationMobile/>
        <>
            <ProfilePageComponentMobile/>
        </>
    </div>
    <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default index