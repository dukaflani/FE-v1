import React from 'react'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { getYear, getMonth, getDay, getHours, getMinutes } from 'date-fns'
import ShowMoreText from "react-show-more-text";

const EventCard = ({ event }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = event?.date
    const year = getYear(new Date(event?.date))
    const month = getMonth(new Date(event?.date))
    const monthFormatted = months[month - 1]
    const day = getDay(new Date(event?.date))
    const hours = getHours(new Date(event?.date))
    const minutes = getMinutes(new Date(event?.date))


  return (
    <div className='p-2 bg-white shadow-sm border-b mb-5 space-y-2'>
        <div className='flex'>
            <div className='w-2/12 bg-blue-600 flex items-center justify-center'>
                <MapPinIcon className='h-7 w-7 text-white'/>
            </div>
            <div className='w-10/12 p-1'>
                <div className='text-sm tracking-tight font-semibold text-gray-800'>{event?.city}</div>
                <div className='text-sm tracking-tight text-gray-500'>{event?.country}</div>
            </div>
        </div>
        <ShowMoreText
                    lines={3}
                    more="More Details"
                    less="Less Details"
                    className="text-xs text-gray-700 tracking-tight leading-4 whitespace-pre-wrap"
                    anchorClass="text-xs tracking-tight uppercase text-blue-700 ml-1"
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                    {event?.description}
        </ShowMoreText>
        <br/>
        <a href={event?.ticket_link ? event?.ticket_link : '#' } target={event?.ticket_link && "_blank"} rel="noopener">
            <div className='p-1 border flex items-center justify-center cursor-pointer'>
                <div className='w-2/12 flex flex-col items-center justify-center border-r-2 border-gray-700'>
                    <div className='text-sm flex items-center justify-center tracking-tight font-extrabold text-gray-600 uppercase'>{monthFormatted}</div>
                    <div className='text-sm flex items-center justify-center tracking-tight text-gray-800 -mt-1'>{day < 10 ? `0${day}` : day}</div>
                </div>
                <div className='w-8/12 pl-2'>
                    <div className='text-xs tracking-wide line-clamp-1 font-semibold text-blue-600'>{event?.title}</div>
                    <div className='text-xs tracking-tight line-clamp-1 -mt-0.5 text-gray-500'>{day < 10 ? `0${day}` : day} {monthFormatted} {year} &bull; {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}hrs</div>
                    <div className='text-xs tracking-tight line-clamp-1 -mt-0.5 text-blue-600'>{event?.venue}</div>
                </div>
                <div className='w-2/12 flex items-center justify-center uppercase text-blue-600 text-xs tracking-tight cursor-pointer'>{event?.ticket_link && "Tickets"}</div>
            </div>
        </a>
        <div className='text-xs text-blue-500 uppercase tracking-tight'>{event?.event_type}</div>
    </div>
  )
}

export default EventCard