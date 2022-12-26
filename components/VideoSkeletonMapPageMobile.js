import React from 'react'
import VideoCardSkeletonMobile from './VideoCardSkeletonMobile'

const VideoSkeletonMapPageMobile = () => {
  return (
    <>
            {[...Array(24).keys()].map((item, i) => (
                <VideoCardSkeletonMobile key={i}/>
              ))}
    </>
  )
}

export default VideoSkeletonMapPageMobile