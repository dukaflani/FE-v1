import Head from 'next/head'
import TagManager, { TagManagerArgs } from 'react-gtm-module'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../redux/app/store'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || " ";
  const tagManagerArgs : TagManagerArgs = {
    gtmId,
  };

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, [])
  



  return (
    <>
    <Head>
        <title>Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Dukaflani — Buy From Musicians"/>
        <meta property="og:description" content="Entrepreneurs In Music Sell Their Products Here"/>
        {/* <meta property="og:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/> */}

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Dukaflani — Buy From Musicians"/>
        <meta property="twitter:description" content="Entrepreneurs In Music Sell Their Products Here"/>
        {/* <meta property="twitter:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/> */}
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
