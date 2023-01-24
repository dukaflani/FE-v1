import React from 'react'

const CurrrentVideoPanelSkeleton = () => {
  return (
    <div className='border animate-pulse mt-20'>
        <div className='flex py-4 border-b px-1 bg-white'>
            <div className='w-2/12 flex items-center justify-center'>
                <div className='relative h-12 w-12 rounded-full bg-gray-300'></div>
            </div>
            <div className='w-8/12 flex flex-col items-start justify-center space-y-2'>
                <div className='bg-gray-300 p-2 rounded-full w-7/12'></div>
                <div className='text-sm tracking-tight bg-gray-300 p-1 rounded-full w-4/12'></div>
            </div>
            <div className='w-2/12 flex items-center justify-center'>
                {/* <button className='uppercase p-1 bg-gray-800 text-white font-semibold tracking-wider text-xs'>Leave</button> */}
                <button className='uppercase font-semibold tracking-wider text-xs bg-gray-300 px-6 py-3'></button>
            </div>
        </div>
        <div className='mx-2 my-5 flex'>
            <div className='w-4/12'>
            <div className='relative h-full w-full bg-gray-300'></div>
            </div>
            <div className='w-8/12 pl-1 space-y-2 pt-1'>
                <p className='text-base line-clamp-2 tracking-tighter leading-4 bg-gray-300 p-1'></p>
                <div className='flex'>
                    <div className='w-2/12 flex items-center justify-center'>
                        <div className='relative h-8 w-8 bg-gray-300'></div>
                    </div>
                    <div className='pl-1 w-10/12'>
                        <p className='text-xs text-gray-800 font-semibold line-clamp-1 bg-gray-300 p-2'></p>
                        <p className='text-xs font-light line-clamp-1 bg-gray-300 p-2'></p>
                    </div>
                </div>
                <div className='flex items-center justify-center bg-sky-200 cursor-pointer'>
                    <button className='uppercase text-xs font-semibold tracking-wide text-sky-700 p-1'>learn more</button>
                </div>
            </div>
        </div>
        <div className='flex mb-5 mt-10 px-1 space-x-2'>
            {[...Array(6).keys()].map((tab, i) => (
                <div className='px-2 py-4 bg-gray-300 w-2/12' key={i}>
                    </div>
            ))}
        </div>
        <div>
           {/* {
            {
                0 : <StreamingLinks/>,
                1 : <ProductCard/>,
                2 : <LyricsPage/>,
                3 : <SkizaTunesPage/>,
                4 : <AlbumPage/>,
                5 : <EventsPage/>,
            }[activeTab]
           } */}
        </div>
    </div>
  )
}

export default CurrrentVideoPanelSkeleton