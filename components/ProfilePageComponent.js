import { useEffect, useState } from 'react'
import Image from "next/legacy/image";
import { useSelector } from 'react-redux'
import avatar from '../media/noimage.webp'
import FanbaseButton from '../components/FanbaseButton'
import { useFetchUserProfileQuery } from '../redux/features/videos/videosApiSlice'

const ProfilePageComponent = () => {
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser,
  }
  const { data: profile } = useFetchUserProfileQuery(queryParams) 
  const userProfile = profile?.data[0] ? profile?.data[0] : null
  



  const [profileImage, setProfileImage] = useState('')
  const [stageName, setStageName] = useState('')
  const [management, setManagement] = useState('')
  const [bookingEmail, setBookingEmail] = useState('')
  const [bookingContact, setBookingContact] = useState('')
  const [about, setAbout] = useState('')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [youtubeChannel, setYoutubeChannel] = useState('')


  useEffect(() => {
    setProfileImage(userProfile?.profile_avatar)
    setManagement(userProfile?.management)
    setBookingEmail(userProfile?.booking_email)
    setBookingContact(userProfile?.booking_contact)
    setAbout(userProfile?.about)
    setFacebook(userProfile?.facebook)
    setTwitter(userProfile?.twitter)
    setInstagram(userProfile?.instagram)
    setTiktok(userProfile?.tiktok)
    setYoutubeChannel(userProfile?.youtube_channel)
    setStageName(userProfile?.stage_name)
    
  }, [profile])



  return (
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
                    <div className='w-8/12'>
                        <div className='text-base text-gray-800 font-medium tracking-tight'>{stageName}</div>
                        <div className='text-sm text-gray-500'>Fanbase 2.4m</div>
                    </div>
                    <div className='w-2/12 flex items-center justify-center'>
                        <FanbaseButton/>
                        <button onClick={() => router.push("/account/login")} className='uppercase p-1 bg-gray-800 text-white font-semibold tracking-wider text-xs'>Join</button>
                    </div>
                </div>
                <div className='flex w-full'>
                    <div className='w-1/2 p-2 space-y-2'>
                        <div>
                            <div className='uppercase text-sm font-semibold text-gray-600 tracking-tight pt-1'>{`About ${stageName}`}</div>
                            <div className='text-sm text-gray-500 tracking-tight leading-4'>{about}</div>
                        </div>
                        <div className='pb-5'>
                            <div className='uppercase text-sm font-semibold text-gray-600 tracking-tight pt-2'>Management</div>
                            <div className='text-sm text-gray-500 tracking-tight leading-4'>{management}</div>
                            <div className='uppercase text-sm font-semibold text-gray-600 tracking-tight pt-1'>Booking</div>
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
  )
}

export default ProfilePageComponent