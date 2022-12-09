import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from "next/legacy/image";
import { useDispatch, useSelector } from 'react-redux'
import { setUserProfile } from '../redux/features/auth/authSlice'
import { togglesideNavOpen } from '../redux/features/navigation/navigationSlice'
import logoLight from '../public/branding/dukaflani-blue-black-logo-large.png'
import { useFetchUserProfileQuery } from '../redux/features/videos/videosApiSlice'
import noAvatar from '../public/media/noimage.webp'

const Navbar = ({ myAvatar }) => {
  const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser,
  }
  const { data: userProfile } = useFetchUserProfileQuery(queryParams)

  useEffect(() => {
    if(userProfile?.data){
      dispatch(setUserProfile({info: userProfile?.data}))
    }
  }, [userProfile?.data])

  




  return (
    <nav className="flex p-2 items-center justify-between shadow-sm border-b bg-white fixed top-0 left-0 right-0 z-40">
  <div className="flex items-center gap-5 pl-3 mr-60">
    <div onClick={() => dispatch(togglesideNavOpen())} className='cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </div>
    <Link href='/'>
        <div className='w-32 relative cursor-pointer'>
          <Image src={logoLight} 
            alt="Dukaflani Logo" 
            layout="responsive"
            objectFit='contain'
            />
        </div>
    </Link>
  </div>
  <div className="flex flex-1 border-gray-300 max-w-lg">
    {/* focus:outline-none focus:ring-0  border-r border-gray-300 */}
    <input placeholder="Search..." className="py-2 px-2 w-11/12 placeholder-gray-400 focus:ring-transparent focus:border-gray-300 border-gray-300" type="text"/>
    <div className="flex items-center justify-center bg-gray-100 w-1/12 border-r border-t border-b border-r-gray-300 border-t-gray-300 border-b-gray-300">
      <div className='cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-600">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
  <div className="pr-3 ml-60 flex items-center justify-end gap-6">
    <div className='cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animateIcon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    </div>
    <div className='cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animateIcon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    </div>
    <div className="ml-5 cursor-pointer">
    <div className='relative h-10 w-10'>
          <Image
              src={myAvatar? myAvatar : noAvatar}
              layout="fill"
              objectFit='cover'
              className='rounded-full'
              />
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar