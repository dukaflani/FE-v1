import Head from 'next/head'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import UserSettingsComponentMobile from '../../../../components/UserSettingsComponentMobile'

const settings = () => {
  return (
    <SidebarNavMobile>
      <Head>
        <title>User Settings | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="User Settings | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here  STREAMING LINKS  MERCHANDISE  LYRICS  SKIZA TUNES  ALBUMS  EVENTS  VIDEOS""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
        <>
            <NavigationMobile/>
            <UserSettingsComponentMobile/>
        </>
        <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default settings