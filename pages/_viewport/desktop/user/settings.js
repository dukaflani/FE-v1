import Head from 'next/head'
import Navigation from '../../../../components/Navigation'
import SidebarNav from '../../../../components/SidebarNav'
import UserSettingsComponent from '../../../../components/UserSettingsComponent'

const settings = () => {
  return (
    <SidebarNav>
      <Head>
        <title>User Settings | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="User Settings | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
        <>
            <Navigation/>
            <UserSettingsComponent/>
        </>
    </SidebarNav>
  )
}

export default settings