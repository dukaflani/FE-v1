import React from 'react'
import Link from 'next/link'
import { PlayPauseIcon } from '@heroicons/react/24/solid'

const AlbumTrack = ({ track }) => {
  
  return (
    <div className='p-1 mb-4 flex items-center justify-center'>
        <div className='w-10/12'>
            <div className='text-sm text-gray-800'>{track?.title}</div>
            <hr className='mb-1'/>
            <div className='text-xs text-gray-400'>{track?.featuring ? `ft. ${track?.featuring}` : "solo project"}</div>
        </div>
        <div className='w-2/12 flex items-center justify-center'>
          {track?.video ? (
            <Link href={{pathname: `/watch/`, query: {v: track?.url_id, tab: "links"}}} >< PlayPauseIcon className='h-5 w-5 text-blue-600 cursor-pointer' /></Link> 
          ) : (
            <div>< PlayPauseIcon className='h-5 w-5 text-gray-100' /></div>
          )}
        </div>
    </div>
  )
}

export default AlbumTrack