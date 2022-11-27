import React from 'react'
import VideoCardSkeleton from './VideoCardSkeleton'

const VideoSkeletonMapPage = () => {
  return (
    <>
            {[...Array(24).keys()].map((item, i) => (
                <VideoCardSkeleton key={i}/>
              ))}
    </>
  )
}

export default VideoSkeletonMapPage