import Head from 'next/head'
import BottomNavigationMobile from '../../../../components/BottomNavigationMobile'
import NavigationMobile from '../../../../components/NavigationMobile'
import SidebarNavMobile from '../../../../components/SidebarNavMobile'
import UserSettingsComponentMobile from '../../../../components/UserSettingsComponentMobile'

const settings = () => {
  return (
    <SidebarNavMobile>
      <Head>
        <title>User Settings | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="User Settings | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
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