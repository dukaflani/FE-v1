import Head from 'next/head'
import AccountRegisterMobile from '../../../../components/AccountRegisterMobile'

const register = () => {
  return (
    <div className='max-w-md mx-auto'>
      <Head>
        <title>Register | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Register | Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
        <AccountRegisterMobile/>
    </div>
  )
}

export default register