import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MyAlbums from './MyAlbums'
import MyLyrics from './MyLyrics'
import MySKizaTunes from './MySKizaTunes'
import MySmartLinks from './MySmartLinks'

const MoreItemsWrapper = () => {
    const router = useRouter()
    const { view } = router.query
    const activeStyles = 'cursor-pointer bg-gray-200 py-2 border-r-2 border-r-gray-800 w-full flex items-center justify-center'
    const regularStyles = 'hover:bg-gray-100 cursor-pointer py-2 border-r-2 border-r-gray-400 w-full flex items-center justify-center'

  return (
    <div className='md:flex landscape:flex md:space-x-4 landscape:space-x-4 px-2 md:px-0 landscape:px-0'>
        <div className='hidden w-3/12 md:flex landscape:flex flex-col items-center justify-start uppercase text-sm font-medium tracking-tighter'>
            <Link
                href={{
                    pathname: `/dashboard/more-items/`,
                    query: { view: "smart-links" },
                }}
                className={view == "smart-links" ? activeStyles : regularStyles} >
                    My Smart Links
            </Link>
            <Link
                href={{
                    pathname: `/dashboard/more-items/`,
                    query: { view: "lyrics" },
                }}
                className={view == "lyrics" ? activeStyles : regularStyles} >
                    My Lyrics
            </Link>
            <Link
                href={{
                    pathname: `/dashboard/more-items/`,
                    query: { view: "skiza-tune" },
                }}
                className={view == "skiza-tune" ? activeStyles : regularStyles} >
                    My Skiza Tunes
            </Link>
            <Link
                href={{
                    pathname: `/dashboard/more-items/`,
                    query: { view: "music-collection" },
                }}
                className={view == "music-collection" ? activeStyles : regularStyles} >
                    My Albums
            </Link>
        </div>
        <div className='w-full md:w-9/12 landscape:w-9/12'>
            {
                {
                    "smart-links" : <MySmartLinks/>,
                    "lyrics" : <MyLyrics/>,
                    "skiza-tune" : <MySKizaTunes/>,
                    "music-collection" : <MyAlbums/>,
                }[view]
            }
        </div>
    </div>
  )
}

export default MoreItemsWrapper