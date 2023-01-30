import Head from 'next/head'
import Navigation from '../../../../components/Navigation'
import ProfileSettingsComponent from '../../../../components/ProfileSettingsComponent'
import SidebarNav from '../../../../components/SidebarNav'

const settings = () => {
  return (
    <SidebarNav>
      <Head>
        <title>Profile Settings | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Profile Settings | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
        <>
            <Navigation/>
            <ProfileSettingsComponent/>
        </>
    </SidebarNav>
  )
}

export default settings