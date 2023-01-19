import React from 'react'
import { useSelector } from 'react-redux';
import { useFetchSkizaTunesQuery } from '../redux/features/videos/videosApiSlice';
import SkizaTuneMobile from './SkizaTuneMobile'

const SkizaTunesMapPageMobile = () => {
  const { video } = useSelector((state) => state.videos)

  const queryParams = {
    skizaTune_id: video?.details?.skiza,
  }

  const { data: skizaTune, isLoading } = useFetchSkizaTunesQuery(queryParams)

  return (
    <div className='px-5'>
    <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Skiza Tunes</div>
    <div className='text-sm mb-5 tracking-tighter text-gray-700'>Follow the instructions below to set up {video?.details?.song_title} by {video?.details?.stage_name} as your ringback tune</div>
        <div className='p-2 bg-white border-b shadow-sm'>
        {isLoading && <div className='text-sm tracking-tight leading-4 text-gray-800'>Loading skiza tunes...</div>}
        {!isLoading && [...Array(skizaTune?.data?.length).keys()].map((skiza, i) => (
            <SkizaTuneMobile skiza={skizaTune?.data[i]} key={i}/>
        ))}
        </div>
    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>Terms & Conditions Apply</footer>
    </div>
  )
}

export default SkizaTunesMapPageMobile