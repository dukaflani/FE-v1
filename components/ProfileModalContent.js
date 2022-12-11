import React, {useState, useEffect} from 'react'
import Image from "next/legacy/image";
import { useSelector } from 'react-redux';
import numeral from 'numeral';
import ShowMoreText from "react-show-more-text";
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import cover from '../public/media/dukaflani-profile-cover-default.png'
import facebook from '../public/media/Facebook-logo.png'
import instagram from '../public/media/Instagram-logo.png'
import tiktok from '../public/media/tiktok-logo.png'
import twitter from '../public/media/twitter-logo.png'
import youtube from '../public/media/youtube-logo.png'

const ProfileModalContent = ({ setModalOpen, info, fanbase }) => {
  const countryArr = info?.country
  const splitCountryArr = countryArr.split(",")
  const country = splitCountryArr[1]
  const totalFanbase = numeral(fanbase).format('0,0')

  const [about, setAbout] = useState('')
  const [role, setRole] = useState('')
  const [joined, setJoined] = useState('')
  const [management, setManagement] = useState('')
  const [bookingContact, setBookingContact] = useState('')
  const [bookingEmail, setBookingEmail] = useState('')
  const [videoCount, setVideoCount] = useState('')
  const [eventCount, setEventCount] = useState('')
  const [productCount, setProductCount] = useState('')
  const [facebookLink, setFacebookLink] = useState('')
  const [twitterLink, setTwitterLink] = useState('')
  const [instagramLink, setInstagramLink] = useState('')
  const [tiktokLink, setTiktokLink] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')

  const { userProfile } = useSelector((state) => state.auth)
  console.log("profile object @ profile module:", userProfile?.info[0]);

  useEffect(() => {
    setAbout(userProfile?.info[0]?.about)
    setRole(userProfile?.info[0]?.role)
    setJoined(userProfile?.info[0]?.date)
    setManagement(userProfile?.info[0]?.management)
    setBookingContact(userProfile?.info[0]?.booking_contact)
    setBookingEmail(userProfile?.info[0]?.booking_email)
    setVideoCount(userProfile?.info[0]?.video_count)
    setEventCount(userProfile?.info[0]?.events_count)
    setProductCount(userProfile?.info[0]?.product_count)
    setFacebookLink(userProfile?.info[0]?.facebook)
    setTwitterLink(userProfile?.info[0]?.twitter)
    setInstagramLink(userProfile?.info[0]?.instagram)
    setTiktokLink(userProfile?.info[0]?.tiktok)
    setYoutubeLink(userProfile?.info[0]?.youtube_channel)
  }, [userProfile?.info])

  const lowerCaseRole = role.toLocaleLowerCase()
  const dateJoined = new Date(joined).toDateString()

  
  const numOfEvents = numeral(eventCount).format('0,0')
  const numOfVideos = numeral(videoCount).format('0,0')
  const numOfProducts = numeral(productCount).format('0,0')
  


  return (
    <div className='w-full h-full flex flex-col relative'>
      <div className='bg-gray-100 w-full h-1/4 relative'>
        <Image
          src={cover}
          layout="fill"
          objectFit='cover'
          />
      </div>
      <div className='py-3 flex items-center justify-center absolute w-full top-14'>
        <div className='w-8/12'>
          <div className='flex space-x-3 items-end'>
            <div className='relative h-20 w-2/12 border-4 border-white rounded-full'>
              {info?.profile_avatar && <Image
                src={info?.profile_avatar}
                layout="fill"
                objectFit='cover'
                className='rounded-full'
                />}
            </div>
            <div className='flex flex-col w-10/12'>
              <div className='flex flex-row space-x-1'>
                <div className='-mb-1 font-medium text-gray-800 line-clamp-2 tracking-tight'>
                  <span >{info?.stage_name}</span> 
                </div>
                {info?.verified  && <CheckBadgeIcon className="w-4 h-4 text-blue-600" />}
              </div>
              <div className='text-sm tracking-tight text-gray-600'>{country}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='py-7'></div>
      <div className='flex-1 bg-gray-100 border-b border-b-gray-300 flex items-start justify-center py-5 pl-5 pr-16 space-x-3 relative'>
        <div className='bg-white shadow-md w-6/12 h-full border-b'>
          <div className='p-1 border-b font-medium text-gray-800'>Info</div>
          <div className='p-2 text-gray-600 text-sm capitalize'>{lowerCaseRole}</div>
          <div className='overflow-y-auto h-32 scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-800'>
              <div className='px-2 text-gray-400 text-xs'>Member since {dateJoined}</div>
              <div className='p-1 font-medium text-gray-800'>For Business</div>
              <div className='px-2 text-gray-600 text-sm'>{management}</div>
              <div className='px-2 text-gray-600 text-sm'>{bookingContact}</div>
              <div className='px-2 text-gray-600 text-sm'>{bookingEmail}</div>
              <div className='p-1 font-medium text-gray-800'>Account</div>
              <div className='px-2 text-gray-600 text-sm'>Fanbase: {totalFanbase}</div>
              <div className='px-2 text-gray-600 text-sm'>Videos: {numOfVideos}</div>
              <div className='px-2 text-gray-600 text-sm'>Products: {numOfProducts}</div>
              <div className='px-2 text-gray-600 text-sm'>Events: {numOfEvents}</div>
          </div>
        </div>
        <div className='bg-white shadow-md w-6/12 h-full border-b'>
            <div className='p-1 border-b font-medium text-gray-800'>About</div>
            <div className='overflow-y-auto h-40 scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-800'>
            <div className='p-2 text-gray-600 text-sm'>
            <ShowMoreText
                    lines={3}
                    more="Show more"
                    less="Show less"
                    className="content-css text-sm leading-4 tracking-tight text-gray-600 whitespace-pre-wrap"
                    anchorClass="text-xs tracking-tight uppercase text-blue-700 ml-1"
                    expanded={false}
                    truncatedEndingComponent={" ... "}
                >
                  {about}
                </ShowMoreText>
            </div>
            </div>
        </div>
      <div className='absolute right-3'>
        {facebookLink && <a href={facebookLink} rel="noopener" target="_blank">
          <div className='h-10 w-10 relative cursor-pointer hover:bg-white'>
            <Image
              src={facebook}
              layout="fill"
              objectFit='contain'
            />
          </div>
        </a>}
        {twitterLink && <a href={twitterLink} rel="noopener" target="_blank">
          <div className='h-10 w-10 relative cursor-pointer hover:bg-white'>
            <Image
              src={twitter}
              layout="fill"
              objectFit='contain'
            />
          </div>
        </a>}
        {instagramLink && <a href={instagramLink} rel="noopener" target="_blank">
          <div className='h-10 w-10 relative cursor-pointer hover:bg-white'>
            <Image
              src={instagram}
              layout="fill"
              objectFit='contain'
            />
          </div>
        </a>}
        {tiktokLink && <a href={tiktokLink} rel="noopener" target="_blank">
          <div className='h-10 w-10 relative cursor-pointer hover:bg-white'>
            <Image
              src={tiktok}
              layout="fill"
              objectFit='contain'
            />
          </div>
        </a>}
        {youtubeLink && <a href={youtubeLink} rel="noopener" target="_blank">
          <div className='h-10 w-10 relative cursor-pointer hover:bg-white'>
            <Image
              src={youtube}
              layout="fill"
              objectFit='contain'
            />
          </div>
        </a>}
      </div>
      </div>
      <div onClick={() => setModalOpen(false)} className='bg-gray-100 py-1 flex items-center justify-center cursor-pointer text-sm font-semibold text-gray-800 uppercase tracking-tight'>Go Back</div>
    </div>
  )
}

export default ProfileModalContent