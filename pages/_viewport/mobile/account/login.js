import Head from 'next/head'
import LoginComponentMobile from '../../../../components/LoginComponentMobile'



const login = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Head>
        <title>Login | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Login | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
       </Head>
      <div className='max-w-md h-4/6 bg-white shadow mx-2'>
        <LoginComponentMobile/>
      </div>
    </div>
  )
}

export default login