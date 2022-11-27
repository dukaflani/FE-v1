import Head from 'next/head'
import React from 'react'
import AccountRegister from '../../components/AccountRegister'

const register = () => {
  return (
    <div className='w-7/12 mx-auto'>
        <Head>
        <title>Register | Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
        <AccountRegister/>
    </div>
  )
}

export default register