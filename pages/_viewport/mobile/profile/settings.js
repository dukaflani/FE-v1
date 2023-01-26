import Head from 'next/head'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import ProfileSettingsComponentMobile from '../../../../components/ProfileSettingsComponentMobile'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'

const settings = () => {
  return (
    <SidebarNavMobile>
      <Head>
        <title>Profile Settings | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Profile Settings | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
        <>
            <NavigationMobile/>
            <ProfileSettingsComponentMobile/>
        </>
        <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default settings