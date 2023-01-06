import React, { useState } from 'react'
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline'
import ShowMoreText from "react-show-more-text";
import Modal from 'react-modal'
import { months } from '../data/month';
import EventModalContentMobile from './EventModalContentMobile';

Modal.setAppElement("#__next")


const EventCardMobile = ({ event, isFirst }) => {
    const [modalOpen, setModalOpen] = useState(false)


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



  return (
    <>
    { isFirst == 0 && <div className='flex justify-end' >
        <div className='px-2 bg-gray-500 text-white flex items-center justify-end uppercase space-x-2'>
            <p className='text-xs'>Latest Event</p>
            <CalendarIcon className='h-5 w-5'/>
        </div>
    </div>}
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
            <div className='p-1 border flex items-center justify-center'>
                <div className='w-2/12 flex flex-col items-center justify-center border-r-2 border-gray-700'>
                    <div className='text-sm flex items-center justify-center tracking-tight font-extrabold text-gray-600 uppercase'>{monthFormatted}</div>
                    <div className='text-sm flex items-center justify-center tracking-tight text-gray-800 -mt-1'>{day < 10 ? `0${day}` : day}</div>
                </div>
                <div className='w-8/12 pl-2'>
                    <div className='text-xs tracking-wide line-clamp-1 font-semibold text-blue-600'>{event?.title}</div>
                    <div className='text-xs tracking-tight line-clamp-1 -mt-0.5 text-gray-500'>{day < 10 ? `0${day}` : day} {monthFormatted} {year} &bull; {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}hrs</div>
                    <div className='text-xs tracking-tight line-clamp-1 -mt-0.5 text-blue-600'>{event?.venue}</div>
                </div>
                <a href={event?.ticket_link} rel="noopener" target="_blank">
                    <div className='w-2/12 flex items-center justify-center uppercase text-blue-600 text-xs tracking-tight cursor-pointer'>{event?.ticket_link ? "Tickets" : " "}</div>
                </a>
            </div>
        <div className='text-xs text-blue-500 uppercase tracking-tight'>{event?.event_type}</div>
    </div>


    {/* <Modal 
          isOpen={modalOpen}
          style={{content:{backgroundColor:'transparent', border:'none', display:'flex', alignItems:'center', justifyContent:'center'}, 
                  overlay:{backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex:'99999'}}}
          >
          <div className='bg-white shadow w-full md:max-w-sm landscape:max-w-sm h-5/6'>
            <EventModalContentMobile setModalOpen={setModalOpen} event={event} />
          </div>
        </Modal> */}
    </>
  )
}

export default EventCardMobile