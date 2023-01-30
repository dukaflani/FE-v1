import Head from 'next/head'
import AccountRegister from '../../../../components/AccountRegister'

const register = () => {
  return (
    <div className='w-7/12 mx-auto'>
      <Head>
        <title>Register | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Register | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
        <AccountRegister/>
    </div>
  )
}

export default register