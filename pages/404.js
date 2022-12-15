import React from 'react'
import { useRouter } from 'next/router'

const errorPage = () => {
    const router = useRouter()

  return (
    <div className='flex items-start justify-center h-screen'>
        <div className='flex flex-col'>
            <div className='flex items-center justify-center'>
            <div className='w-2/6'>
                <img src='/media/404-page.png' alt='page not found'/>
            <div className='flex items-center justify-center w-4/12 mx-auto'>
                <img src='/branding/dukaflani-logo-black-medium.png' alt='logo'/>
            </div>
            <div className='flex items-center justify-center '>
                <button onClick={() => router.back()} className='cursor-pointer'>Go Back</button>
            </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default errorPage