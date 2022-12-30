import React from 'react'
import { useSelector } from 'react-redux'
import StreamingLinkCardMobile from './StreamingLinkCardMobile'

const StreamingLinkMapPageMobile = () => {
  const { video } = useSelector((state) => state.videos)

  return (
    <div className='px-5'>
    <div className='text-sm sm:text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Streaming & Download Links</div>
    <div className='text-sm sm:text-sm mb-5 tracking-tighter text-gray-700 leading-4'>Click on the links below to stream or download {video?.details?.song_title} by {video?.details?.stage_name}</div>
        <StreamingLinkCardMobile/>
    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>Terms & Conditions Apply</footer>
    </div>
  )
}

export default StreamingLinkMapPageMobile