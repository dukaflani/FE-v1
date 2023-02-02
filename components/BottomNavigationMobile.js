import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, 
    ChevronUpDownIcon, CloudArrowUpIcon, XMarkIcon, 
    VideoCameraIcon, LinkIcon, ShoppingBagIcon, MicrophoneIcon,
MusicalNoteIcon, TicketIcon, Cog8ToothIcon, MoonIcon, DevicePhoneMobileIcon, ArrowLeftOnRectangleIcon, PowerIcon } from '@heroicons/react/24/outline'
import { HomeIcon as HomeSolid, RectangleGroupIcon as RectangleSolid, UserCircleIcon as UserSolid } from '@heroicons/react/24/solid'
import { useLogoutMutation, useFetchAccessTokenQuery } from '../redux/features/videos/videosApiSlice'

const BottomNavigationMobile = () => {
    const [showUploadLinks, setShowUploadLinks] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [logoutError, setLogoutError] = useState('')
    const router = useRouter()
    const destination = router.pathname
    const destinationLength = destination.split("/").length
    const destinationArray = destination.split("/")
    const splitDestinationArray = destinationArray.splice(3, destinationLength - 1)
    const newDestination = "/" + splitDestinationArray.toString().replace(/,/g, "/")

    const [ logout, { isSuccess } ] = useLogoutMutation()
    const { data: accessToken } = useFetchAccessTokenQuery()

    const handleLogout = async () => {
        try {
          await logout()
        } catch (error) {
          setLogoutError(error)
        }
      }
    
      if (isSuccess == true) {
        window.location.reload(true)
      }



  return (
    <>
    <div className={showUploadLinks ? 'hidden' : 'bg-white p-2 fixed bottom-0 left-0 right-0 flex items-center justify-center border-t'}>
        <nav className='w-full'>
            <ul className='text-xs flex items-center justify-between w-full'>
                <Link href="/">
                    <li className='flex flex-col items-center justify-center'>
                        {newDestination == "/" ? <HomeSolid className="w-5 h-5" /> : <HomeIcon className='w-5 h-5'/>}
                        <span>Home</span>
                    </li>
                </Link>
                <Link href="/dashboard">
                    <li className='flex flex-col items-center justify-center'>
                        {newDestination == "/dashboard" ? <RectangleSolid className="w-5 h-5" /> : <RectangleGroupIcon className='w-5 h-5'/>}
                        <span>Dashboard</span>
                    </li>
                </Link>
                <li onClick={() => setShowUploadLinks(true)} className='flex flex-col items-center justify-center p-1 rounded-full border border-gray-800'>
                    <CloudArrowUpIcon className='w-5 h-5'/>
                </li>
                <Link href="/profile">
                    <li className='flex flex-col items-center justify-center'>
                        {newDestination == "/profile" ? <UserSolid className="w-5 h-5" /> : <UserCircleIcon className='w-5 h-5'/>}
                        <span>Profile</span>
                    </li>
                </Link>
                <li onClick={() => setShowOptions(true)} className='flex flex-col items-center justify-center'>
                    <ChevronUpDownIcon className='w-5 h-5'/>
                    <span>Options</span>
                </li>
            </ul>
        </nav>
    </div>

    <div className={showUploadLinks ? 'bg-white p-2 fixed bottom-0 left-0 right-0 border-t rounded-t-lg max-h-48' : 'hidden'}>
        <nav className='relative pt-10'>
            <div className='flex items-center justify-between px-2 border-b pb-2 absolute top-0 left-0 right-0'>
                <span className='font-medium tracking-tight'>Uploads</span>
                <span onClick={() => setShowUploadLinks(false)}>
                    <XMarkIcon className='w-4 h-4'/>
                </span>
            </div>
            <div className='max-h-48 overflow-y-auto pb-14 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent'>
                <ul className='flex flex-col items-start justify-center mx-auto max-w-sm text-sm space-y-3'>
                    <li onClick={() => {
                            router.push({pathname: '/dashboard/upload', query: {item: 'video'}});
                            setShowUploadLinks(false);
                            }} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <VideoCameraIcon className='h-5 w-5'/>
                        </span>
                        <span>Upload a Video</span>
                    </li>
                    <li onClick={() => {
                            router.push({pathname: '/dashboard/upload', query: {item: 'smart-links'}});
                            setShowUploadLinks(false);
                            }} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <LinkIcon className='h-5 w-5'/>
                        </span>
                        <span>Add Streaming Links</span>
                    </li>
                    <li onClick={() => {
                            router.push({pathname: '/dashboard/upload', query: {item: 'product'}});
                            setShowUploadLinks(false);
                            }} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <ShoppingBagIcon className='h-5 w-5'/>
                        </span>
                        <span>Add a Product</span>
                    </li>
                    <li onClick={() => {
                            router.push({pathname: '/dashboard/upload', query: {item: 'lyrics'}});
                            setShowUploadLinks(false);
                            }} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <MicrophoneIcon className='h-5 w-5'/>
                        </span>
                        <span>Add Lyrics</span>
                    </li>
                    <li onClick={() => {
                            router.push({pathname: '/dashboard/upload', query: {item: 'skiza-tunes'}});
                            setShowUploadLinks(false);
                        }} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <DevicePhoneMobileIcon className='h-5 w-5'/>
                        </span>
                        <span>Add Skiza Tunes</span>
                    </li>
                    <li onClick={() => {
                            router.push({pathname: '/dashboard/upload', query: {item: 'music-collection'}});
                            setShowUploadLinks(false);
                        }} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <MusicalNoteIcon className='h-5 w-5'/>
                        </span>
                        <span>Add an Album (Music Collection)</span>
                    </li>
                    <li onClick={() => {
                            router.push({pathname: '/dashboard/upload', query: {item: 'event'}});
                            setShowUploadLinks(false);
                            }} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <TicketIcon className='h-5 w-5'/>
                        </span>
                        <span>Add an Event</span>
                    </li>
                </ul>
            </div>
        </nav>
    </div>


    <div className={showOptions ? 'bg-white p-2 fixed bottom-0 left-0 right-0 border-t rounded-t-lg max-h-48' : 'hidden'}>
        <nav className='relative pt-10'>
            <div className='flex items-center justify-between px-2 border-b pb-2 absolute top-0 left-0 right-0'>
                <span className='font-medium tracking-tight'>More Options</span>
                <span onClick={() => setShowOptions(false)}>
                    <XMarkIcon className='w-4 h-4'/>
                </span>
            </div>
            <div className='max-h-48 overflow-y-auto pb-14 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent'>
                <ul className='flex flex-col items-start justify-center mx-auto max-w-sm text-sm space-y-3'>
                    <li onClick={() => {
                        router.push('/profile/settings');
                        setShowOptions(false);
                        }} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <UserCircleIcon className='h-5 w-5'/>
                        </span>
                        <span>Profile Settings</span>
                    </li>
                    <li onClick={() => {
                        router.push('/user/settings');
                        setShowOptions(false);
                        }} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <Cog8ToothIcon className='h-5 w-5'/>
                        </span>
                        <span>User Settings</span>
                    </li>
                    <li onClick={() => setShowOptions(false)} className='flex items-center justify-center space-x-2 text-gray-300'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <MoonIcon className='h-5 w-5'/>
                        </span>
                        <span>Dark Mode</span>
                    </li>
                    {accessToken ? <li onClick={handleLogout} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <PowerIcon className='h-5 w-5'/>
                        </span>
                        <span>Logout</span>
                    </li>
                    :
                    <li onClick={() => router.push({ pathname: '/account/login' })} className='flex items-center justify-center space-x-2'>
                        <span className='flex flex-col items-center justify-center p-3 rounded-full bg-gray-100'>
                            <ArrowLeftOnRectangleIcon className='h-5 w-5'/>
                        </span>
                        <span>Login</span>
                    </li>}
                </ul>
            </div>
        </nav>
    </div>
    </>
  )
}

export default BottomNavigationMobile