import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import { MagnifyingGlassIcon, ShoppingCartIcon, BellIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { setUserProfile } from '../redux/features/auth/authSlice'
import { togglesideNavOpen } from '../redux/features/navigation/navigationSlice'
import logoLight from '../public/branding/dukaflani-blue-black-logo-large.png'
import { useFetchUserProfileQuery } from '../redux/features/videos/videosApiSlice'
import noAvatar from '../public/media/noimage.webp'

const Navbar = ({ myAvatar, searchTerm }) => {
  const [navSearchTerm, setNavSearchTerm] = useState('')
  const router = useRouter()
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


  const formattedSearchTerm = navSearchTerm?.replace(/%2/g, "+")


  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      router.push({pathname: `/results/`, query: { search_query: formattedSearchTerm }})
    }
  }

  const handleSearchByClick = (e) => {
      router.push({pathname: `/results/`, query: { search_query: formattedSearchTerm }})
  }




  return (
    <nav className="flex p-2 items-center justify-between shadow-sm border-b bg-white fixed top-0 left-0 right-0 z-40">
  <div className="flex items-center gap-5 pl-3 mr-60">
    <div onClick={() => dispatch(togglesideNavOpen())} className='cursor-pointer'>
      <Bars3Icon className="w-6 h-6" />
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
    <input 
        placeholder="Search..." 
        className="py-2 px-2 w-11/12 placeholder-gray-400 focus:ring-transparent focus:border-gray-300 border-gray-300" 
        type="text"
        value={navSearchTerm}
        onChange={(e) => setNavSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    <div onClick={handleSearchByClick} className="flex items-center justify-center bg-gray-100 w-1/12 border-r border-t border-b border-r-gray-300 border-t-gray-300 border-b-gray-300">
      <div className='cursor-pointer'>
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
      </div>
    </div>
  </div>
  <div className="pr-3 ml-60 flex items-center justify-end gap-6">
    <div className='cursor-pointer'>
        <BellIcon className="w-6 h-6 animateIcon" />
    </div>
    <div className='cursor-pointer'>
      <ShoppingCartIcon className="w-6 h-6 animateIcon" />
    </div>
    <div className="ml-5 cursor-pointer">
    <div className='relative h-10 w-10 bg-gray-200 rounded-full'>
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