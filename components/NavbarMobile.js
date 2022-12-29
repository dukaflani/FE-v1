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
import MobileSearchInput from './MobileSearchInput';

const NavbarMobile = ({ myAvatar, searchTerm }) => {
  const [navSearchTerm, setNavSearchTerm] = useState('')
  const [mobileSearch, setMobileSearch] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const urlPathname = router.pathname
  
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
    <nav className={urlPathname == "/_viewport/mobile/watch" ? "shadow-sm border-b bg-white  z-40" : "shadow-sm border-b bg-white fixed top-0 left-0 right-0 z-40"}>
      <div className={mobileSearch ? 'hidden' : 'flex px-2 py-3 items-center justify-between'}>
        <div className="flex items-center gap-2 pl-1 mr-1">
          <div onClick={() => dispatch(togglesideNavOpen())} className='cursor-pointer hidden'>
            <Bars3Icon className="w-5 h-5" />
          </div>
          <Link href='/'>
              <div className='w-20 relative cursor-pointer'>
                <Image src={logoLight} 
                  alt="Dukaflani Logo" 
                  layout="responsive"
                  objectFit='contain'
                  />
              </div>
          </Link>
        </div>
        <div className="pr-1 ml-1 flex items-center justify-end gap-3">
          <div onClick={() => setMobileSearch(true)} className='cursor-pointer'>
            <MagnifyingGlassIcon className='w-5 h-5'/>
          </div>
          <div className='cursor-pointer'>
            <BellIcon className='w-5 h-5'/>
          </div>
          <div className='cursor-pointer'>
            <ShoppingCartIcon className='w-5 h-5'/>
          </div>
          <div className="ml-1 cursor-pointer">
          <div className='relative h-[2.1rem] w-[2.1rem] bg-gray-200 rounded-full'>
                <Image
                    src={myAvatar? myAvatar : noAvatar}
                    layout="fill"
                    objectFit='cover'
                    className='rounded-full'
                    />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile search */}
      <MobileSearchInput  
          setMobileSearch={setMobileSearch} 
          setNavSearchTerm={setNavSearchTerm} 
          navSearchTerm={navSearchTerm} 
          mobileSearch={mobileSearch} 
          handleSearchByClick={handleSearchByClick} 
          handleSearch={handleSearch}
         />
</nav>
  )
}

export default NavbarMobile