import React, { Fragment, useState } from 'react'
import Image from "next/legacy/image";
import { months } from '../data/month';
import { useRouter } from 'next/router';
import poster from '../public/media/dukaflani-poster-default.png'
import { Transition, Dialog } from '@headlessui/react'
import Link from 'next/link';
import { useDeleteEventMutation } from '../redux/features/videos/videosApiSlice';
import { useSelector } from 'react-redux';

const MyEvents = ({ event }) => {
    const router = useRouter()
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id
    const eventOwner = event?.user
    const [isOpen, setIsOpen] = useState(false)
    const [deleteEventError, setDeleteEventError] = useState(null)

    const deleteEventInfo = {
      "event_id": event?.id,
  } 


    const [ deleteEvent, { isLoading: deleteEventLoading } ] = useDeleteEventMutation()

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

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }


      const handleDeleteEvent = async () => {
        try {
            await deleteEvent(deleteEventInfo)
            setIsOpen(false)
        } catch (error) {
          setDeleteEventError(error)
            setTimeout(() => {
              setDeleteEventError(null)
            }, 5000);
        }
      }




  return (
    <>
    <div className='bg-white shadow'>
            <div>
                <div className='relative h-[17rem] w-full bg-gray-100'>
                    {event?.poster && <Image
                        src={!event?.poster ? poster : event?.poster}
                        layout="fill"
                        objectFit='cover'
                        />}
                {event?.is_global && <p className='text-uppercase text-sm tracking-tight bg-gray-800 z-10 absolute top-0 left-0 text-white px-1 font-medium'>Global Event</p>}        
                </div>
            </div>
            <div className='text-xs py-1 px-2 uppercase tracking-wide bg-gray-300 text-gray-800 font-semibold'>
                <div className='line-clamp-1'>{event?.event_type}</div>
            </div>
            <div>
                <div className='flex flex-col mt-3'>
                    <div className='flex items-center justify-start px-2 font-semibold text-base leading-4 text-gray-800'>
                        <p>{event?.title}</p>
                    </div>
                    <div className='flex items-start justify-start px-2 tracking-tight text-sm font-medium text-gray-500'>
                        <p className='flex items-start justify-start'>{event?.venue}</p>
                    </div>
                    <div className='flex items-start justify-start px-2 tracking-tight text-xs text-gray-500'>
                        {!event?.ticket_link ?<p className='flex items-start justify-start'>{day} {monthFormatted} {year}</p> :
                        <p className='flex items-start justify-start'>{day} {monthFormatted} {year} &bull; Tickets Available</p>}
                    </div>
                </div>
                <div className='px-2 mt-2'>
                    <div className='text-sm font-semibold tracking-tight text-gray-800'>Description</div>
                    <div className="text-sm leading-4 tracking-tight text-gray-800 whitespace-pre-wrap line-clamp-1">{event?.description}</div>
                </div>
            </div>
            <div className='grid grid-cols-2 border-t bg-gray-100 items-center justify-center cursor-pointer mt-3 uppercase text-xs tracking-wider font-semibold'>
              {currentUser == eventOwner ? <Link href={`/dashboard/edit/event/${event?.id}`}>
                  <div className='flex items-center justify-center text-blue-500 p-2 hover:bg-gray-50 border-r border-r-gray-300'>Edit</div>
              </Link>
              :
              <div className='flex items-center justify-center text-blue-500 p-2 hover:bg-gray-50 border-r border-r-gray-300'>---</div>}
              <div onClick={openModal} className='flex items-center justify-center text-red-500 p-2 hover:bg-gray-50'>Delete</div>
            </div>
        </div>


        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Event?
                  </Dialog.Title>
                  <div className="mt-2">
                    {currentUser == eventOwner ? <p className="text-sm text-gray-500">
                        You're about to delete <strong>{event?.title}</strong>. This action
                        is irreversible and you won't be able to see this event again.
                    </p>
                    :
                    <p className="text-sm text-gray-500">
                        You're not authorized to delete this event
                    </p>}
                  </div>

                  <div className="mt-5 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    {currentUser == eventOwner && <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDeleteEvent}
                    >
                     {deleteEventLoading ? "Deleting..." : "Yes, Delete!"}
                    </button>}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MyEvents