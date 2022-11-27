import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import FormData from 'form-data'
import InputField from './reuseable-components/InputField'
import TextAreaField from './reuseable-components/TextAreaField'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'
import { useFetchAccessTokenQuery,  useFetchUserProfileQuery } from '../redux/features/videos/videosApiSlice'

const ProfileSettingsComponent = () => {
  const router = useRouter()

  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser,
  }
  const { data: profile } = useFetchUserProfileQuery(queryParams)
  const userProfile = profile?.data[0] ? profile?.data[0] : null


  const [profileImage, setProfileImage] = useState('')
  const [management, setManagement] = useState('')
  const [bookingEmail, setBookingEmail] = useState('')
  const [bookingContact, setBookingContact] = useState('')
  const [about, setAbout] = useState('')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [youtubeChannel, setYoutubeChannel] = useState('')
  const [profileId, setProfileId] = useState('')
  const [updatedProfile, setupdatedProfile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { data: accessToken } = useFetchAccessTokenQuery()

  useEffect(() => {
    setManagement(userProfile?.management)
    setBookingEmail(userProfile?.booking_email)
    setBookingContact(userProfile?.booking_contact)
    setAbout(userProfile?.about)
    setFacebook(userProfile?.facebook)
    setTwitter(userProfile?.twitter)
    setInstagram(userProfile?.instagram)
    setTiktok(userProfile?.tiktok)
    setYoutubeChannel(userProfile?.youtube_channel)
    setProfileId(userProfile?.id)
    
  }, [profile])


  const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

      const profileUpdateInfo = new FormData();
      profileUpdateInfo.append("management", management);
      profileUpdateInfo.append("profile_avatar", profileImage);
      profileUpdateInfo.append("booking_email", bookingEmail);
      profileUpdateInfo.append("booking_contact", bookingContact);
      profileUpdateInfo.append("about", about);
      profileUpdateInfo.append("facebook", facebook);
      profileUpdateInfo.append("twitter", twitter);
      profileUpdateInfo.append("instagram", instagram);
      profileUpdateInfo.append("tiktok", tiktok);
      profileUpdateInfo.append("youtube_channel", youtubeChannel);

      const handleUpdateProfile = () => {
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/user-profile/${profileId}/`,
        {
            method: 'PATCH',
            headers: myHeaders,
            body: profileUpdateInfo,
        }
        )
        .then((response) => response.json())
        .then((result) => {
            setupdatedProfile(result)
            router.push('/profile')
        })
        .catch((error) => {
            setErrorMessage(error)
        });
    }





  return (
    <div className='pt-20 w-full'>
      <div className='w-5/12 mx-auto bg-white shadow p-5 space-y-4'>
        <div className='text-gray-800 font-bold tracking-tight uppercase'>Profile Settings</div>
        <div>
          <InputField
            primaryState={management}
            setPrimaryState={setManagement}
            title='Management'
            helperText='Name of manager or company'
          />
        </div>
        <div>
          <InputField
            primaryState={bookingEmail}
            setPrimaryState={setBookingEmail}
            title='Booking Email'
          />
        </div>
        <div>
          <InputField
            primaryState={bookingContact}
            setPrimaryState={setBookingContact}
            title='Booking Contact'
            helperText='Phone number'
          />
        </div>
        <div>
          <TextAreaField
            primaryState={about}
            setPrimaryState={setAbout}
            title='About'
          />
        </div>
        <div className='text-gray-800 font-bold tracking-tight uppercase text-sm'>Social Media Links</div>
        <div className='w-full grid grid-cols-2 gap-x-2 gap-y-3'>
          <div className='w-full'>
            <InputField
              primaryState={facebook}
              setPrimaryState={setFacebook}
              title='Facebook'
            />
          </div>
          <div className='w-full'>
            <InputField
              primaryState={twitter}
              setPrimaryState={setTwitter}
              title='Twitter'
            />
          </div>
          <div className='w-full'>
            <InputField
              primaryState={instagram}
              setPrimaryState={setInstagram}
              title='Instagram'
            />
          </div>
          <div className='w-full'>
            <InputField
              primaryState={tiktok}
              setPrimaryState={setTiktok}
              title='Tik Tok'
            />
          </div>
          <div className='w-full'>
            <InputField
              primaryState={youtubeChannel}
              setPrimaryState={setYoutubeChannel}
              title='YouTube Channel'
            />
          </div>
        </div>
        <div className='flex items-center justify-between py-2'>
          <div>
            <div>
              <input accept='image/*' onChange={(e) => setProfileImage(e.target.files[0])} type="file"  className='w-full border-gray-300 focus:outline-none' />
              <div className='py-1 text-xs text-gray-400'>Upload profile image max size 300KB</div>
            </div>
          </div>
          <div>
            <ApiButtonWithSpinner
              title='Update Profile'
              bgColor='bg-blue-500'
              textColor='text-white'
              hoverColor='hover:bg-blue-400'
              onClick={handleUpdateProfile}
              loading={loading}
             />
          </div>
        </div>
      </div>
      <footer className='flex items-center justify-center pb-2 pt-5 text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
    </div>
  )
}

export default ProfileSettingsComponent