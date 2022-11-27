import React from 'react'
import { useSelector } from 'react-redux'
import { useFetchEventsQuery } from '../redux/features/videos/videosApiSlice'
import EventCard from './EventCard'

const EventsMapPage = () => {
  const { video } = useSelector((state) => state.videos)

  const queryParams = {
      user_id: video?.details?.user,
      }


  const { data: events } = useFetchEventsQuery(queryParams)

  return (
    <div className='px-5'>
    <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Tour Dates</div>
    <div className='text-sm mb-5 tracking-tighter text-gray-700'>Discover and get details of events that feature {video?.details?.stage_name}</div>
        {[...Array(events?.data?.length).keys()].map((skiza, i) => (
            <EventCard event={events?.data[i]} key={i}/>
        ))}
    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>Terms & Conditions Apply</footer>
    </div>
  )
}

export default EventsMapPage