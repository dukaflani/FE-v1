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
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
