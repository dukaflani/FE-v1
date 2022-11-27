import React from 'react'
import Image from "next/legacy/image";
import ShowMoreText from "react-show-more-text";
import productImage from '../media/event3.jpg'

const MyEvents = () => {
  return (
    <div className='bg-white shadow'>
            <div>
                <div className='relative h-[17rem] w-full'>
                    <Image
                        src={productImage}
                        layout="fill"
                        objectFit='cover'
                        />
                </div>
            </div>
            <div className='text-xs py-1 px-2 uppercase tracking-wide bg-blue-500 text-white font-semibold'>
                <div className='line-clamp-1'>Club Event</div>
            </div>
            <div>
                <div className='flex flex-col mt-3'>
                    <div className='flex items-center justify-start px-2 font-semibold text-base leading-4 text-gray-800'>
                        <p>Event title goes here</p>
                    </div>
                    <div className='flex items-start justify-start px-2 tracking-tight text-sm font-medium text-gray-500'>
                        <p className='flex items-start justify-start'>Venue goes here</p>
                    </div>
                    <div className='flex items-start justify-start px-2 tracking-tight text-xs text-gray-500'>
                        <p className='flex items-start justify-start'>Date &bull; Entry</p>
                    </div>
                </div>
                <div className='px-2 mt-2'>
                    <div className='text-sm font-semibold tracking-tight text-gray-800'>Description</div>
                    <div className="text-sm leading-4 tracking-tight text-gray-800 whitespace-pre-wrap line-clamp-1">Events description</div>
                </div>
            </div>
            <div className='grid grid-cols-2 border-t bg-gray-100 items-center justify-center cursor-pointer mt-3 uppercase text-xs tracking-wider font-semibold'>
              <div className='flex items-center justify-center text-blue-500 p-2 hover:bg-gray-50 border-r border-r-gray-300'>Edit</div>
              <div className='flex items-center justify-center text-red-500 p-2 hover:bg-gray-50'>Delete</div>
            </div>
        </div>
  )
}

export default MyEvents