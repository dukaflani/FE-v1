import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from "next/legacy/image";
// Outline Icons
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, Cog6ToothIcon, CloudArrowUpIcon, ShoppingBagIcon, TicketIcon,
 LinkIcon, MicrophoneIcon, DevicePhoneMobileIcon, MusicalNoteIcon} from '@heroicons/react/24/outline'
//  Solid Icons
import { HomeIcon as HomeSolid, RectangleGroupIcon as RGSolid, UserCircleIcon as UCSolid, Cog6ToothIcon as C6Solid, 
    CloudArrowUpIcon as CloudArrowUpIconSolid, Bars3Icon, ShoppingBagIcon as ShoppingBagSolid, TicketIcon as TicketSolid,
 LinkIcon as LinkSolid, MicrophoneIcon as MicrophoneSolid, DevicePhoneMobileIcon as MobileSolid, 
 MusicalNoteIcon as MusicalSolid} from '@heroicons/react/24/solid'

import { useDispatch } from 'react-redux'
import { togglesideNavOpen } from '../redux/features/navigation/navigationSlice'
import logoLight from '../public/branding/dukaflani-blue-black-logo-large.png'


const SidebarContentMobile = () => {
    const router = useRouter()
    const { view } = router.query
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
            link:'/dashboard/upload?item=video',
            iconOutline: <CloudArrowUpIcon className="w-5 h-5" />,
            iconSolid: <CloudArrowUpIconSolid className="w-5 h-5" />,
        },
    ]

    const myDashboardLinkItems = [
        {
            title: "Products",
            link:'/dashboard/products',
            linkQuery: 'my-products',
            iconOutline: <ShoppingBagIcon className="w-5 h-5" />,
            iconSolid: <ShoppingBagSolid className="w-5 h-5" />,
        },
        {
            title: "Events",
            link:'/dashboard/events',
            linkQuery: 'my-events',
            iconOutline: <TicketIcon className="w-5 h-5" />,
            iconSolid: <TicketSolid className="w-5 h-5" />,
        },
        {
            title: "Smart Links",
            link:'/dashboard/more-items?view=smart-links',
            linkQuery: 'smart-links',
            iconOutline: <LinkIcon className="w-5 h-5" />,
            iconSolid: <LinkSolid className="w-5 h-5" />,
        },
        {
            title: "Lyrics",
            link:'/dashboard/more-items?view=lyrics',
            linkQuery: 'lyrics',
            iconOutline: <MicrophoneIcon className="w-5 h-5" />,
            iconSolid: <MicrophoneSolid className="w-5 h-5" />,
        },
        {
            title: "Skiza Tunes",
            link:'/dashboard/more-items?view=skiza-tune',
            linkQuery: 'skiza-tune',
            iconOutline: <DevicePhoneMobileIcon className="w-5 h-5" />,
            iconSolid: <MobileSolid className="w-5 h-5" />,
        },
        {
            title: "Collections (Albums)",
            link:'/dashboard/more-items?view=music-collection',
            linkQuery: 'music-collection',
            iconOutline: <MusicalNoteIcon className="w-5 h-5" />,
            iconSolid: <MusicalSolid className="w-5 h-5" />,
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
            <p className='uppercase text-base py-5 px-4'>My Uploads</p>
            <nav className='flex w-full border-b pb-5'>
                <ul className="w-full">
                    {myDashboardLinkItems.map((myDashboardLinkItem, i) => (
                        <li key={i} onClick={() => router.push({pathname:  myDashboardLinkItem.link, query: {view: myDashboardLinkItem.linkQuery}})} className={newDestination == myDashboardLinkItem.title || view == myDashboardLinkItem.linkQuery ? activeLinkStyles : regularLinkStyles}>
                            <div>
                                {newDestination == myDashboardLinkItem.title || view == myDashboardLinkItem.linkQuery ? myDashboardLinkItem.iconSolid : myDashboardLinkItem.iconOutline}
                            </div>
                            <div>{myDashboardLinkItem.title}</div>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
        <footer className='flex items-center justify-center p-3'>
            <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
        </footer>
    </aside>
  )
}

export default SidebarContentMobile