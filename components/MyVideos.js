import React from 'react'
import Image from "next/legacy/image";
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import thumbnail from '../media/thumbnail.jpg'

const MyVideos = () => {
  return (
    <>
        <div className='col-span-3 space-x-2 flex items-center bg-white shadow justify-start border-r border-r-gray-300 pr-2'>
            <div className='w-3/12 h-28 relative'>
                 <Image 
                    src={thumbnail}
                    layout="fill"
                    objectFit='cover'
                  />
            </div>
            <div className='w-8/12 flex flex-col items-start justify-center'>
                <div className='text-base tracking-tighter line-clamp-2'>Video title goes here (Official Music Video)</div>
                <div className='text-xs text-gray-800 font-semibold tracking-tighter flex items-center justify-start space-x-2'>
                    <div className='uppercase'>product:</div>
                    <div className='text-gray-700 text-sm font-normal'>Product title</div>
                </div>
                <div className='text-xs text-gray-800 font-semibold tracking-tighter flex items-center justify-start space-x-2'>
                    <div className='uppercase'>Album:</div>
                    <div className='text-gray-700 text-sm font-normal'>Album title</div>
                </div>
                <div className='text-xs text-gray-800 font-semibold tracking-tighter flex items-center justify-start space-x-2'>
                    <div className='uppercase'>Genre:</div>
                    <div className='text-blue-700 text-xs font-normal uppercase '>Hip Hop</div>
                </div>
            </div>
            <div className='w-1/12 flex flex-col items-end justify-start h-full space-y-2 uppercase text-xs font-medium tracking-tighter text-gray-600'>
                <div className='cursor-pointer mt-2'>
                    <EllipsisVerticalIcon className='h-5 w-5'  />
                </div>
            </div>
        </div>
        <div className='px-2 flex flex-col items-start justify-center'>
            <div className='text-xs text-gray-800'>Added 20 Aug 2022</div>
            <div className='text-xs text-gray-800'>2,456,234 views</div>
            <div className='text-xs text-gray-800'>43,476 Likes</div>
            <div className='text-xs text-gray-800'>308 Dislikes</div>
        </div>
    </>
  )
}

export default MyVideos