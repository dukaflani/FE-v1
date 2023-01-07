import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { ChevronLeftIcon, ChevronRightIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { genres } from '../data/genres'
 

const GenreTabs = () => {
  const router = useRouter()
  const { genre } = router.query
  const genrePanel = useRef(null)
  const [activeTab, setActiveTab] = useState('')
  const activeSyles = 'py-1 px-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full cursor-pointer tracking-tighter flex flex-nowrap'
  const regularSyles = 'py-1 px-2 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer tracking-tighter flex flex-nowrap'


  const sideScroll = ( element, speed, distance, step ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };


  return (
    <div className='fixed top-14 z-30 mb-5 flex w-full bg-white shadow-sm'>
      <div className='flex items-center justify-start mx-5 border-r pr-5'>
        <div className='bg-gray-300 p-1 text-sm'>
          <AdjustmentsHorizontalIcon className='h-4 w-5' />
        </div>
      </div>
          <button 
            className='cursor-pointer mx-2'
            onClick={() => {
              sideScroll(genrePanel.current, 25, 100, -10);
            }} 
              >
                <ChevronLeftIcon className='h-5 w-5'/>
          </button>
            {!genre && <div ref={genrePanel} className='text-gray-800 flex items-center justify-start flex-1 gap-3 pt-3 pb-2 whitespace-nowrap overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent '>
            <div onClick={() => router.push("/")}  className={activeTab == ''  ? activeSyles : regularSyles}>All Songs</div>
              {genres?.map((genreItem, i) => (
                <Link 
                    key={i}
                    href={{
                      pathname: `/filter`,
                      query: { genre: genreItem?.querySlug, gid: genreItem?.id },
                    }}
                >
                  <div  onClick={() => setActiveTab(genreItem.querySlug)}  className={activeTab == genreItem.querySlug  ? activeSyles : regularSyles}>{genreItem?.title}</div>
                </Link>
                ))}
            </div>}
            {genre && <div ref={genrePanel} className='text-gray-800 flex items-center justify-start flex-1 gap-3 pt-3 pb-2 whitespace-nowrap overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent '>
            <div onClick={() => router.push("/")}  className={genre == ''  ? activeSyles : regularSyles}>All Songs</div>
              {genres?.map((genreItem, i) => (
                <Link 
                  key={i}
                  href={{
                    pathname: `/filter`,
                    query: { genre: genreItem?.querySlug, gid: genreItem?.id },
                  }}
                >
                  <div onClick={() => setActiveTab(genreItem.querySlug)}  className={genre == genreItem.querySlug  ? activeSyles : regularSyles}>{genreItem?.title}</div>
                </Link>
                ))}
            </div>}
          <button 
            className='cursor-pointe mx-2'
            onClick={() => {
              sideScroll(genrePanel.current, 25, 100, 10);
            }} 
            >
              <ChevronRightIcon className='h-5 w-5'/>
          </button>
    </div>
  );
}

export default GenreTabs