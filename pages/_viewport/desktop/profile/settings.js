import Head from 'next/head'
import Navigation from '../../../../components/Navigation'
import ProfileSettingsComponent from '../../../../components/ProfileSettingsComponent'
import SidebarNav from '../../../../components/SidebarNav'

const settings = () => {
  return (
    <SidebarNav>
      <Head>
        <title>Profile Settings | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Profile Settings | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here - STREAMING LINKS | MERCHANDISE | LYRICS | SKIZA TUNES | ALBUMS | EVENTS | VIDEOS""/>
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