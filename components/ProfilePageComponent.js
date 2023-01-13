import { useEffect, useState, Fragment } from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import { Menu, Transition, Dialog } from '@headlessui/react'
// import ReactTooltip from 'react-tooltip';
import { EllipsisVerticalIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { UserIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import avatar from '../public/media/noimage.webp'
import { useFetchUserProfileQuery } from '../redux/features/videos/videosApiSlice'
import numeral from 'numeral';
import Spinner from './Spinner';

const ProfilePageComponent = () => {
  const router = useRouter()
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser,
  }

  const { data: profile, isLoading } = useFetchUserProfileQuery(queryParams) 
  const userProfile = profile?.data[0] ? profile?.data[0] : null
  


  const [profileImage, setProfileImage] = useState('')
  const [stageName, setStageName] = useState('')
  const [management, setManagement] = useState('')
  const [country, setCountry] = useState('')
  const [role, setRole] = useState('')
  const [bookingEmail, setBookingEmail] = useState('')
  const [bookingContact, setBookingContact] = useState('')
  const [about, setAbout] = useState('')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [youtubeChannel, setYoutubeChannel] = useState('')
  const [vetified, setVetified] = useState('')
  const [fanbaseCount, setFanbaseCount] = useState('')


  useEffect(() => {
    setProfileImage(userProfile?.profile_avatar)
    setCountry(userProfile?.nationality)
    setManagement(userProfile?.management)
    setRole(userProfile?.role)
    setBookingEmail(userProfile?.booking_email)
    setBookingContact(userProfile?.booking_contact)
    setAbout(userProfile?.about)
    setFacebook(userProfile?.facebook)
    setTwitter(userProfile?.twitter)
    setInstagram(userProfile?.instagram)
    setTiktok(userProfile?.tiktok)
    setYoutubeChannel(userProfile?.youtube_channel)
    setStageName(userProfile?.stage_name)
    setVetified(userProfile?.is_verified)
    setFanbaseCount(userProfile?.fanbase_count)
  }, [profile])


  const fanbase2 = fanbaseCount
  let fanbase3 = ''
  fanbase2 < 1000 || fanbase2 % 10 === 0 ? fanbase3 = numeral(fanbase2).format('0a') :  fanbase3 = numeral(fanbase2).format('0.0a')


  const splitCountryArray = country?.split(",")
  const roleLowerCase = role?.toLowerCase()


  if (isLoading) {
    return  <Spinner loadingStatement='Loading your profile' /> 
  }



  return (
    <>
    <div className='flex flex-col items-center justify-center pt-20'>
            <div className='bg-white border-b shadow-sm w-5/12'>
                <div className='flex items-center justify-center border-b border-b-gray-100'>
                    <div className='w-2/12 flex items-center justify-center p-3 '>
                    <div className='relative h-12 w-12'>
                        <Image
                            src={profileImage ? profileImage : avatar}
                            layout="fill"
                            objectFit='cover'
                            className='rounded-full'
                            />
                    </div>
                    </div>
                    <div className='w-9/12'>
                        <div className='text-base text-gray-800 font-medium tracking-tight flex '>{stageName} {vetified == 'True'  ? <div><CheckBadgeIcon className='h-4 w-4 ml-1 text-blue-500'/></div> : ''}</div>
                        {!fanbase3 ? (
                            <div className='text-sm text-gray-500 capitalize'>{roleLowerCase}</div>
                            ) : (
                            <div className='text-sm text-gray-500 capitalize'>{roleLowerCase} &bull; Fanbase {fanbase3}</div>
                        )}
                    </div>
                    <div className='w-1/12 flex items-center justify-center'>
                    <Menu className="relative inline-block text-left" as="div">
                            <Menu.Button className="inline-flex w-full justify-center focus:outline-none">
                                <EllipsisVerticalIcon className='h-5 w-5 cursor-pointer'/>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white shadow z-10 focus:outline-none">
                                <div>
                                    <Menu.Item onClick={() => router.push("/user/settings")} className="text-sm cursor-pointer px-2 py-2 flex items-center justify-start w-full hover:bg-gray-50">
                                        <button>
                                            <UserIcon className='h-5 w-5 mr-2 ml-1' /> Edit User
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item onClick={() => router.push("/profile/settings")} className="text-sm cursor-pointer px-2 py-2 flex items-center justify-start w-full hover:bg-gray-50">
                                            <button>
                                                <UserCircleIcon className='h-5 w-5 mr-2 ml-1' /> Edit Profile
                                            </button>
                                    </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
                <div className='flex w-full'>
                    <div className='w-1/2 p-2 space-y-2'>
                        <div>
                            <div className='text-sm font-semibold text-gray-600 tracking-tight pt-1'>ABOUT <span className='text-gray-800 font-light'>{stageName}</span></div>
                            <div className='text-sm text-gray-500 tracking-tight leading-4'>{about}</div>
                        </div>
                        <div className='pb-5'>
                            <div className='uppercase text-sm font-semibold text-gray-600 tracking-tight pt-2'>Country</div>
                            <div className='text-sm text-gray-500 tracking-tight leading-4'>{country ? splitCountryArray[1] : ''}</div>
                            <div className='uppercase text-sm font-semibold text-gray-600 tracking-tight'>Business</div>
                            <div className='text-sm text-gray-500 tracking-tight leading-4'>{management}</div>
                            <div className='uppercase text-sm font-semibold text-gray-600 tracking-tight pt-1'>Contact</div>
                            <div className='text-sm text-gray-500 tracking-tight leading-4'>{bookingContact}</div>
                            <div className='text-sm text-gray-500 tracking-tight leading-4'>{bookingEmail}</div>
                        </div>
                    </div>
                    <div className='w-1/2 p-2 flex flex-col items-center justify-start space-y-2'>
                        {facebook && <div onClick={() => window.open(`${facebook}`)} className='text-sm cursor-pointer hover:bg-gray-100 border shadow-sm p-1 w-10/12 flex items-center justify-center'>Facebook</div>}
                        {instagram && <div onClick={() => window.open(`${instagram}`)} className='text-sm cursor-pointer hover:bg-gray-100 border shadow-sm p-1 w-10/12 flex items-center justify-center'>Instagram</div>}
                        {twitter && <div onClick={() => window.open(`${twitter}`)} className='text-sm cursor-pointer hover:bg-gray-100 border shadow-sm p-1 w-10/12 flex items-center justify-center'>Twitter</div>}
                        {tiktok && <div onClick={() => window.open(`${tiktok}`)} className='text-sm cursor-pointer hover:bg-gray-100 border shadow-sm p-1 w-10/12 flex items-center justify-center'>Tik Tok</div>}
                        {youtubeChannel && <div onClick={() => window.open(`${youtubeChannel}`)} className='text-sm cursor-pointer hover:bg-gray-100 border shadow-sm p-1 w-10/12 flex items-center justify-center'>YouTube</div>}
                    </div>
                </div>
            </div>
            <footer className='flex items-center justify-center p-5'>
                <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
            </footer>
        </div>
        {/* <div>
            <ReactTooltip />
        </div> */}
    </>
  )
}

export default ProfilePageComponent