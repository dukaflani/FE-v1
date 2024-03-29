import Head from 'next/head'
import LoginComponent from '../../../../components/LoginComponent'



const login = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Head>
        <title>Login | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Login | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <div className='w-6/12 h-4/6 bg-white shadow'>
        <LoginComponent/>
      </div>
    </div>
  )
}

export default login