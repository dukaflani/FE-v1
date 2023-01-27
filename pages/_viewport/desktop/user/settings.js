import Head from 'next/head'
import Navigation from '../../../../components/Navigation'
import SidebarNav from '../../../../components/SidebarNav'
import UserSettingsComponent from '../../../../components/UserSettingsComponent'

const settings = () => {
  return (
    <SidebarNav>
      <Head>
        <title>User Settings | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="User Settings | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here.  STREAMING LINKS | MERCHANDISE | LYRICS | SKIZA TUNES | ALBUMS | EVENTS | VIDEOS""/>
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