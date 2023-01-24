import React from 'react'

const CurrentVideoPlayerSkeleton = () => {
  return (
    <article className='pt-20'>
        <div>
            <div className='w-full'>
                <div className='aspect-w-16 aspect-h-9 bg-black'></div>
            </div>
            <div className='w-1/12 uppercase text-sm text-blue-600 pt-2 bg-gray-300 mt-2 rounded-full animate-pulse'></div>
            <h1 className='w-6/12 font-semibold leading-4 text-gray-800 tracking-tight text-xl bg-gray-300 mt-2 p-2 rounded-full animate-pulse'></h1>
            <div className='w-full flex items-center justify-between animate-pulse'>
                <div className='text-sm font-semibold tracking-tight bg-gray-300 p-2 w-3/12 rounded-full'></div>
                <div className='flex justify-end items-center pr-10'>
                    <div className='ml-10 h-8 w-8 rounded-full bg-gray-300'></div>
                    <div className='ml-7 h-8 w-8 rounded-full bg-gray-300'></div>
                    <div className='ml-14 h-8 w-8 rounded-full bg-gray-300'></div>
                </div>
            </div>
            <div className='w-full text-base leading-5 tracking-tight text-gray-300 flex mt-3 animate-pulse'>
                <div className='bg-gray-300 p-2 w-full rounded-full'></div>
            </div>
            <div className='w-2/12 text-sm mt-4 bg-gray-300 p-2 rounded-full animate-pulse'></div>
            <hr className='my-1'/>
            {/* <div className='w-full flex items-center justify-center mt-3 space-x-3 mb-5 animate-pulse'>
                <div className='w-1/12 flex items-center justify-center'>
                    <div className='relative h-12 w-12 rounded-full bg-gray-300'></div>
                </div>
                <div className='w-9/12 flex items-center justify-center border-b hover:border-b-black'>
                    <input placeholder='Comment' className='w-full bg-transparent focus:outline-none py-1' type="text" />
                </div>
                <div className='w-2/12 flex items-center justify-center'>
                    <button className='bg-gray-300 text-gray-300 uppercase text-sm p-2 font-semibold tracking-wider'>comment</button>
                </div>
            </div> */}
            <div className='mt-10'>
                {/* <VideoComments/> */}
            </div>
        </div>
    </article>
  )
}

export default CurrentVideoPlayerSkeleton