import React from 'react'
import Image from "next/legacy/image";
import { months } from '../data/month';
import poster from '../public/media/dukaflani-poster-default.png'
import { FlagIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import noAvatar from '../public/media/noimage.webp'

const EventModalContent = ({ setModalOpen, event }) => {
    const date = event?.date
    const time = event?.time
    const dateArray = date?.split("-").map(Number);
    const timeArray = time?.split(":").map(Number);
    const year = event?.date ? dateArray[0] : null
    const month = event?.date ? dateArray[1] : null
    const monthWithoutLeadingZero = parseInt(month,10)
    const monthFormatted =  months[monthWithoutLeadingZero - 1]
    const day = event?.date ? dateArray[2] : null
    const hours = event?.time ? timeArray[0] : null
    const minutes = event?.time ? timeArray[1] : null
    const country = event?.nationality


    const splitCountryArray = country?.split(",")



  return (
    <div className='w-full h-full'>
        <div className='flex h-full'>
            <div className='w-1/2 h-full relative bg-gray-100'>
                <Image 
                    src={!event?.poster ? poster : event?.poster}
                    layout="fill"
                    objectFit='fill'
                />
            </div>
            <div className='w-1/2 flex flex-col pt-5'>
                <div className='flex w-full px-5'>
                <div className='flex py-2 border-b px-1 bg-white w-full space-x-2'>
                    <div className='w-2/12 flex items-center justify-center'>
                        <div className='relative h-12 w-full'>
                            <Image
                                src={!event?.profile_avatar ? noAvatar : event?.profile_avatar}
                                layout="fill"
                                objectFit='cover'
                                className='rounded-full'
                                />
                        </div>
                    </div>
                <div className='w-10/12 flex flex-col items-start justify-center'>
                    <div className='flex space-x-1'>
                    <div className='text-base tracking-tighter font-medium text-gray-900 line-clamp-2'>{event?.stage_name ? event?.stage_name : 'Event Organizer'}</div>
                    {event?.verified && 
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                    </span>
                    }
                </div>
                <div className='mx-1 text-sm tracking-tight'>{country ? splitCountryArray[1] : ''}</div>
            </div>
            </div>
            </div>
                <h1 className=' px-5 text-lg font-bold text-gray-800 tracking-tight mt-2'>{event?.title}</h1>
                <div className=' px-5 text-sm text-gray-500 tracking-tight mt-1 flex items-center justify-start'> <FlagIcon className='mr-2 h-4 w-4'/> {event?.country} &bull; {event?.city} &bull; {event?.location}</div>
                <div className=' px-5 text-sm text-gray-600 tracking-tight flex items-center justify-start'> <MapPinIcon className='mr-2 h-4 w-4' />  <strong>{event?.venue}</strong></div>
                <div className=' px-5 text-xs text-gray-500 tracking-tight flex items-center justify-start'><CalendarIcon className='mr-2 h-4 w-4'/> {day < 10 ? `0${day}` : day} {monthFormatted} {year} &bull; {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}hrs</div>
                <div className=' px-5 uppercase font-extrabold tracking-tighter text-gray-800 text-sm mt-5'>{event?.event_type}:</div>
                <div className=' px-5 flex-1 -mt-0.5 text-sm tracking-tight leading-tight text-gray-800 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-800'>
                    <p>{event?.description}</p>
                    </div>
                <div className='p-2 flex items-center justify-center bg-gray-100'>
                    {event?.ticket_link ? (
                        <a className='cursor-pointer' href={event?.ticket_link ? event?.ticket_link : '#' } target={event?.ticket_link && "_blank"} rel="noopener">
                            <button className='border-r border-r-gray-500 py-1 flex items-center justify-end pr-3 uppercase text-sm tracking-tight font-bold text-gray-800'>Get Tickets</button>
                        </a>
                    ) : (
                        <button disabled className='border-r border-r-gray-500 py-1 flex items-center justify-end pr-3 uppercase text-sm tracking-tight font-bold text-gray-300 cursor-not-allowed'>No Tickets</button>
                    )}
                    <button onClick={() => setModalOpen(false)} className='py-1 flex items-center justify-start pl-3 uppercase text-sm tracking-tight font-bold'>go back </button>
                </div>
            </div>
        </div>
        {/* <p onClick={() => setModalOpen(false)}>close modal</p> */}
    </div>
  )
}

export default EventModalContent