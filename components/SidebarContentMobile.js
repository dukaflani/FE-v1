import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from "next/legacy/image";
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, Cog6ToothIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { HomeIcon as HomeSolid, RectangleGroupIcon as RGSolid, UserCircleIcon as UCSolid, Cog6ToothIcon as C6Solid, 
    CloudArrowUpIcon as CloudArrowUpIconSolid, Bars3Icon } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux'
import { togglesideNavOpen } from '../redux/features/navigation/navigationSlice'
import logoLight from '../public/branding/dukaflani-blue-black-logo-large.png'


const SidebarContentMobile = () => {
    const router = useRouter()
    const destination = router.pathname
    const destinationLength = destination.split("/").length
    const destinationArray = destination.split("/")
    const splitDestinationArray = destinationArray.splice(3, destinationLength - 1)
    const newDestination = "/" + splitDestinationArray.toString().replace(/,/g, "/")

    const navLinkItems = [
        {
            title: "Home",
            link:'/',
            iconOutline: <HomeIcon className="w-5 h-5" />,
            iconSolid: <HomeSolid className="w-5 h-5" />,
        },
        {
            title: "Dashboard",
            link:'/dashboard',
            iconOutline: <RectangleGroupIcon className="w-5 h-5" />,
            iconSolid: <RGSolid className="w-5 h-5" />,
        },
        {
            title: "Profile",
            link:'/profile',
            iconOutline: <UserCircleIcon className="w-5 h-5" />,
            iconSolid: <UCSolid className="w-5 h-5" />,
        },
        {
            title: "Upload",
            link:'/dashboard/upload',
            iconOutline: <CloudArrowUpIcon className="w-5 h-5" />,
            iconSolid: <CloudArrowUpIconSolid className="w-5 h-5" />,
        },
    ]
    const dispatch = useDispatch()
    const regularLinkStyles = "flex items-center justify-start gap-4 pl-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
    const activeLinkStyles = "flex items-center justify-start gap-4 pl-3 py-2 text-sm bg-gray-200 font-medium hover:bg-gray-100 cursor-pointer"


  return (
    <aside className='flex flex-col h-screen' onClick={() => dispatch(togglesideNavOpen())}>
        <div className='flex py-4 px-2 items-center justify-between shadow-sm border-b bg-white fixed top-0 left-0 right-0'>
            <div className="flex items-center gap-2 pl-1 mr-1">
                <div className='cursor-pointer'>
                    <Bars3Icon className="w-5 h-5" />
                </div>
                <Link href='/'>
                        <div className='w-28 relative cursor-pointer'>
                        <Image src={logoLight} 
                            alt="Dukaflani Logo" 
                            layout="responsive"
                            objectFit='contain'
                            />
                        </div>
                </Link>
            </div>
        </div>
        <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-700'>
            <nav className='flex pt-20 w-full border-b pb-5'>
                <ul className="w-full">
                    {navLinkItems.map((navLinkItem, i) => (
                        <li key={i} onClick={() => router.push(navLinkItem.link)} className={newDestination == navLinkItem.link ? activeLinkStyles : regularLinkStyles}>
                                    <div>
                                        {newDestination == navLinkItem.link ? navLinkItem.iconSolid : navLinkItem.iconOutline}
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

export default SidebarContentMobile