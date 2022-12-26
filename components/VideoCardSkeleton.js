import React from 'react'


const VideoCardSkeleton = () => {
  return (
    <div className="h-64 animate-pulse">
        <div className="h-4/6 bg-gray-300 rounded-md"></div>
        <div className="h-2/6 flex space-x-1 pt-2">
        <div className="w-2/12">
        <div className="h-11 w-11 rounded-full bg-gray-300"></div>
        </div>
        <div className="w-10/12">
        <div className="h-3/5">
        <div className="bg-gray-300 p-2 rounded-lg"></div>
        <div className="h-2/5">
        <div className="bg-gray-300 p-2 rounded-lg mt-2 w-44"></div>
        <div className="bg-gray-300 p-2 rounded-lg mt-2 w-36"></div>
        </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default VideoCardSkeleton