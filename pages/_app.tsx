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
        <title>Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Dukaflani — Home of Music Videos"/>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Dukaflani — Home of Music Videos"/>
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content="/media/dukaflani-default-og-poster.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Dukaflani — Home of Music Videos"/>
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content="/media/dukaflani-default-og-poster.png"/>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
