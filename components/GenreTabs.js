import React, { useState } from 'react'

const GenreTabs = () => {
  const [activeTab, setActiveTab] = useState(0)
  const activeSyles = 'mx-2 py-1 px-2 bg-gray-600 text-white rounded-full cursor-pointer text-sm tracking-tighter'
  const regularSyles = 'mx-2 py-1 px-2 bg-gray-200 rounded-full cursor-pointer text-sm tracking-tighter'

  const genres = ['All Songs', 'Gengetone', 'Bongo', 'Amapiano', 'Afro Beat', 'Rhumba', 'Mugithi', 'Ohangla', 'Reggae', 'Dancehall', 'Swahili', 'Hip Hop', 'Taarab', 'Trap', 'Rap', 'R&B', 'Folk', 'House', 'Dance', 'Kwaito', 'Country']
 

  return (
    <div className='fixed top-14 z-30 mb-5 text-gray-800 flex items-center justify-center w-screen mx-auto'>
        <div className='w-full shadow-sm bg-white p-3 flex items-center justify-start overflow-x-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-white hover:scrollbar-thumb-gray-500'>
          {genres?.map((genre, i) => (
            <div key={i} onClick={() => setActiveTab(i)}  className={activeTab === i ? activeSyles : regularSyles}>{genre.replace(/ /g, "_")}</div>
          ))}
        </div>
    </div>
  )
}

export default GenreTabs