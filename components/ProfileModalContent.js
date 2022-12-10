import React from 'react'
import Image from "next/legacy/image";
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import cover from '../public/media/dukaflani-profile-cover-default.png'

const ProfileModalContent = ({ setModalOpen, info }) => {
  const countryArr = info?.country
  const splitCountryArr = countryArr.split(",")
  const country = splitCountryArr[1]


  return (
    <div className='w-full h-full flex flex-col relative'>
      <div className='bg-red-300 w-full h-1/4 relative'>
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
      <div className='flex-1 bg-gray-100 border-b border-b-gray-300 flex items-start justify-center py-5 pl-5 pr-10 space-x-5 relative'>
        <div className='bg-white shadow-md w-6/12 h-full border-b'>
          <div className='p-1 border-b font-medium text-gray-800'>Info</div>
          <div className='p-2 text-gray-600 text-sm'>Artist</div>
          <div className='overflow-y-auto h-32 scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-800'>
              <div className='p-2 text-gray-600 text-sm'>Member since 20 Dec 2020</div>
              <div className='p-2 text-gray-600'>For Business</div>
              <div className='p-2 text-gray-600 text-sm'>Manager Name</div>
              <div className='p-2 text-gray-600 text-sm'>07345764245</div>
              <div className='p-2 text-gray-600 text-sm'>booking@email.com</div>
              <div className='p-2 text-gray-600'>Account Stats</div>
              <div className='p-2 text-gray-600 text-sm'>Fanbase 2,6785,765</div>
              <div className='p-2 text-gray-600 text-sm'>10 videos</div>
              <div className='p-2 text-gray-600 text-sm'>5 products</div>
              <div className='p-2 text-gray-600 text-sm'>20 events</div>
          </div>
        </div>
        <div className='bg-white shadow-md w-6/12 h-full border-b'>
            <div className='p-1 border-b font-medium text-gray-800'>About</div>
            <div className='overflow-y-auto h-40 scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-800'>
            <div className='p-2 text-gray-600 text-sm'>Description</div>
            </div>
        </div>
      <div className='absolute -right-4 bg-red-400 space-y-2'>
        <div>xxxx</div>
        <div>yyyy</div>
        <div>zzzz</div>
        <div>aaaa</div>
        <div>bbbb</div>
      </div>
      </div>
      <div onClick={() => setModalOpen(false)} className='bg-gray-100 py-1 flex items-center justify-center cursor-pointer text-sm font-semibold text-gray-800 uppercase tracking-tight'>Go Back</div>
    </div>
  )
}

export default ProfileModalContent