import React, { useState, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import data from '../data/genres.json'
 

const GenreTabs = () => {
  const genrePanel = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  const activeSyles = 'py-1 px-2 bg-gray-600 text-white rounded-full cursor-pointer tracking-tighter flex flex-nowrap'
  const regularSyles = 'py-1 px-2 bg-gray-200 rounded-full cursor-pointer tracking-tighter flex flex-nowrap'


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
      <div className='flex items-center justify-start pl-2'>Kenya</div>
          <button 
            className='cursor-pointer mx-2'
            onClick={() => {
              sideScroll(genrePanel.current, 25, 100, -10);
            }} 
              >
                <ChevronLeftIcon className='h-5 w-5'/>
          </button>
            <div ref={genrePanel} className='text-gray-800 flex items-center justify-start flex-1 gap-3 pt-3 pb-2 whitespace-nowrap overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent '>
              {data?.genres.map((genre, i) => (
                <div key={i} onClick={() => setActiveTab(i)}  className={activeTab === i ? activeSyles : regularSyles}>{genre}</div>
                ))}
            </div>
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