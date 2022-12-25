import React, { useEffect, useRef } from 'react'
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const MobileSearchInput = ({setMobileSearch, setNavSearchTerm, navSearchTerm, mobileSearch, handleSearchByClick, handleSearch}) => {
    const mobileSearchRef = useRef()

    useEffect(() => {
        if (mobileSearch) {
            mobileSearchRef.current.focus()
        }
      }, [mobileSearch])


  return (
    <div className={mobileSearch ? 'flex p-2 items-center justify-between gap-2' : 'hidden'}>
        <div onClick={() => setMobileSearch(false)}>
          <ArrowLeftIcon className='w-5 h-5'/>
        </div>
        <div className='flex-1'>
          <input 
              ref={mobileSearchRef}
              placeholder="Search..." 
              className="w-full bg-gray-100 rounded-full placeholder-gray-400 focus:ring-transparent focus:border-transparent border-transparent" 
              type="text"
              value={navSearchTerm}
              onChange={(e) => setNavSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
        </div>
        <div onClick={handleSearchByClick}>
          <MagnifyingGlassIcon className='w-5 h-5'/>
        </div>
      </div>
  )
}

export default MobileSearchInput