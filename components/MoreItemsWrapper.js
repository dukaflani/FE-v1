import React, { useState } from 'react'
import MyAlbums from './MyAlbums'
import MyLyrics from './MyLyrics'
import MySKizaTunes from './MySKizaTunes'
import MySmartLinks from './MySmartLinks'

const MoreItemsWrapper = () => {
    const [currentInput, setCurrentInput] = useState(0)
    const activeStyles = 'cursor-pointer bg-gray-200 py-2 border-r-2 border-r-gray-800 w-full flex items-center justify-center'
    const regularStyles = 'hover:bg-gray-100 cursor-pointer py-2 border-r-2 border-r-gray-400 w-full flex items-center justify-center'

  return (
    <div className='flex space-x-4'>
        <div className='w-3/12 flex flex-col items-center justify-start uppercase text-sm font-medium tracking-tighter'>
            <div className={currentInput == 0 ? activeStyles : regularStyles} onClick={() => setCurrentInput(0)}>My Smart Links</div>
            <div className={currentInput == 1 ? activeStyles : regularStyles} onClick={() => setCurrentInput(1)}>My Lyrics</div>
            <div className={currentInput == 2 ? activeStyles : regularStyles} onClick={() => setCurrentInput(2)}>My Skiza Tunes</div>
            <div className={currentInput == 3 ? activeStyles : regularStyles} onClick={() => setCurrentInput(3)}>My Albums</div>
        </div>
        <div className='w-9/12'>
            {
                {
                    0: <MySmartLinks/>,
                    1: <MyLyrics/>,
                    2: <MySKizaTunes/>,
                    3: <MyAlbums/>,
                }[currentInput]
            }
        </div>
    </div>
  )
}

export default MoreItemsWrapper