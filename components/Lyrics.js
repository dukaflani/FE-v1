import React from 'react'

const Lyrics = ({ verse }) => {
  return (
    <>
    {verse?.id ? <div className='text-sm mb-5'>
        <div className='text-sm uppercase font-semibold text-gray-700 tracking-tighter'>{verse?.type.replace(/_/g, "-")}</div>
        <div className='text-xs text-gray-500'>{verse?.artist}</div>
        {/* <div className='prose prose-sm'>{verse?.body}</div> */}
        <div className='text-sm text-gray-800 tracking-tight whitespace-pre-wrap leading-snug'>{verse?.body}</div>
    </div> : <div className='text-sm text-gray-800 tracking-tight whitespace-pre-wrap leading-snug'>No lyrics available...</div>}
    </>
  )
}

export default Lyrics