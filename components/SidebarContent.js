import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { HomeIcon as HomeSolid, RectangleGroupIcon as RGSolid, UserCircleIcon as UCSolid, Cog6ToothIcon as C6Solid } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { togglesideNavOpen } from '../redux/features/navigation/navigationSlice'
import logoLight from '../branding/dukaflani-blue-black-logo-large.png'


const SidebarContent = () => {
    // const { sideNavOpen } = useSelector((state) => state.navigation)
    const [activeLink, setActiveLink] = useState("Home")
    const navLinkItems = [
        {
            title: "Home",
            iconOutline: <HomeIcon className="w-6 h-6" />,
            iconSolid: <HomeSolid className="w-6 h-6" />,
        },
        {
            title: "Dashboard",
            iconOutline: <RectangleGroupIcon className="w-6 h-6" />,
            iconSolid: <RGSolid className="w-6 h-6" />,
        },
        {
            title: "Profile",
            iconOutline: <UserCircleIcon className="w-6 h-6" />,
            iconSolid: <UCSolid className="w-6 h-6" />,
        },
        {
            title: "Settings",
            iconOutline: <Cog6ToothIcon className="w-6 h-6" />,
            iconSolid: <C6Solid className="w-6 h-6" />,
        },
    ]
    const dispatch = useDispatch()
    const regularLinkStyles = "flex items-center justify-start gap-4 pl-3 py-3 hover:bg-gray-100 cursor-pointer"
    const activeLinkStyles = "flex items-center justify-start gap-4 pl-3 py-3 bg-gray-200 font-medium hover:bg-gray-100 cursor-pointer"

  return (
    <aside className='flex flex-col h-screen' onClick={() => dispatch(togglesideNavOpen())}>
        <div className='flex py-2 px-3 items-center justify-between shadow-sm border-b bg-white fixed top-0 left-0 right-0'>
            <div className="flex items-center gap-5 pl-3 mr-60">
                <div className='cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <Link href='/'>
                    <a>
                        <div className='w-32 relative cursor-pointer'>
                        <Image src={logoLight} 
                            alt="Dukaflani Logo" 
                            layout="responsive"
                            objectFit='contain'
                            />
                        </div>
                    </a>
                </Link>
            </div>
        </div>
        <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-700'>
            <nav className='flex pt-20 w-full border-b pb-5'>
                <ul className="w-full">
                    {navLinkItems.map((navLinkItem, i) => (
                        <li key={i} onClick={() => setActiveLink(navLinkItem.title)} className={activeLink == navLinkItem.title ? activeLinkStyles : regularLinkStyles}>
                            <div>
                                {activeLink == navLinkItem.title ? navLinkItem.iconSolid : navLinkItem.iconOutline}
                            </div>
                            <div>{navLinkItem.title}</div>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* <p className='uppercase text-base py-5 px-4'>More from Dukaflani</p> */}
            {/* <nav className='flex w-full border-b pb-5'>
                <ul className="w-full">
                    {navLinkItems.map((navLinkItem, i) => (
                        <li key={i} onClick={() => setActiveLink(navLinkItem.title)} className={activeLink == navLinkItem.title ? activeLinkStyles : regularLinkStyles}>
                            <div>
                                {activeLink == navLinkItem.title ? navLinkItem.iconSolid : navLinkItem.iconOutline}
                            </div>
                            <div>{navLinkItem.title}</div>
                        </li>
                    ))}
                </ul>
            </nav> */}
        </div>
        <footer className='flex items-center justify-center p-3'>
            <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
        </footer>
    </aside>
  )
}

export default SidebarContent