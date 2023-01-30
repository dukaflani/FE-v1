import Head from 'next/head'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import ProfileSettingsComponentMobile from '../../../../components/ProfileSettingsComponentMobile'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'

const settings = () => {
  return (
    <SidebarNavMobile>
      <Head>
        <title>Profile Settings | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Profile Settings | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
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