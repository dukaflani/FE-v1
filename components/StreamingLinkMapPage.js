import React from 'react'
import { useSelector } from 'react-redux'
import StreamingLinkCard from './StreamingLinkCard'

const StreamingLinkMapPage = () => {
  const { video } = useSelector((state) => state.videos)

  return (
    <div className='px-5'>
    <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Streaming & Download Links</div>
    <div className='text-sm mb-5 tracking-tighter text-gray-700'>Click on the links below to stream or download {video?.details?.title} by {video?.details?.stage_name}</div>
        <StreamingLinkCard/>
    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>Terms & Conditions Apply</footer>
    </div>
  )
}

export default StreamingLinkMapPage