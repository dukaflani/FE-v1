import React from 'react'


const VideoCardSkeletonMobile = () => {
  return (
    <div className="h-64 md:h-28 landscape:h-28 cursor-pointer md:flex landscape:flex md:w-10/12 landscape:w-10/12 md:mx-auto landscape:mx-auto md:mb-4 landscape:mb-4 animate-pulse">
        <div className="h-4/6 md:h-full landscape:h-full md:w-4/12 landscape:w-4/12 relative md:rounded-md landscape:rounded-md bg-gray-300"></div>
        <div className="h-2/6 flex space-x-1 pt-2 px-2 md:w-8/12 landscape:w-8/12 md:flex-col landscape:flex-col">
        <div className='md:hidden landscape:hidden'>
          <div>
            <div className="h-11 w-11 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <div className="flex-1 pl-2">
        <div className="h-3/5 md:space-y-2 landscape:space-y-2">
        <div className="bg-gray-300 p-2 rounded-lg md:mb-3 landscape:mb-3"></div>
          <div className="h-2/5 md:flex landscape:flex items-center justify-start ">
            <div className='hidden md:block landscape:block'>
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            </div>
            <div className='md:pl-2 landscape:pl-2'>
                <div className="bg-gray-300 p-1 rounded-lg mt-2 w-44"></div>
                <div className="bg-gray-300 p-1 rounded-lg mt-2 w-36"></div>
            </div>
          </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default VideoCardSkeletonMobile