import React from 'react'
import Poster from '../../media/g-like-that.png'
import logoLight from '../../branding/dukaflani-logo-blue-medium.png'
import Button from '../../components/reuseable-components/Button'
import InputFieldPassword from '../../components/reuseable-components/InputFieldPassword'
import InputField from '../../components/reuseable-components/InputField'
import Image from 'next/image'
import LoginComponent from '../../components/LoginComponent'
import Head from 'next/head'



const login = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Head>
        <title>Login | Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
      <div className='w-6/12 h-4/6 bg-white shadow'>
        <LoginComponent/>
      </div>
    </div>
  )
}

export default login