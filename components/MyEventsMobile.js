import { Fragment, useState } from 'react'
import Image from "next/legacy/image";
import { months } from '../data/month';
import { useRouter } from 'next/router';
import poster from '../public/media/dukaflani-poster-default.png'
import { Transition, Dialog } from '@headlessui/react'
import { useDeleteEventMutation } from '../redux/features/videos/videosApiSlice';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/solid';

const MyEvents = ({ event }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [optionsModalOpen, setOptionsModalOpen] = useState(false)
    const [deleteEventError, setDeleteEventError] = useState(null)

    const deleteEventInfo = {
      "event_id": event?.id,
  } 


    const [ deleteEvent ] = useDeleteEventMutation()

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


    function closeOptionsModal() {
      setOptionsModalOpen(false)
      }

    function closeOptionsModalOpenDelete() {
      setOptionsModalOpen(false)
      openModal() 
      }
    
      function openOptionsModal() {
        setOptionsModalOpen(true)
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
    <article  className='h-64 md:h-28 landscape:h-28 cursor-pointer md:flex landscape:flex md:w-10/12 landscape:w-10/12 md:mx-auto landscape:mx-auto md:mb-4 landscape:mb-4'>
      <div className='h-4/6 md:h-full landscape:h-full md:w-4/12 landscape:w-4/12 relative md:rounded-md landscape:rounded-md bg-gray-200'>
        {event?.poster && <Image
            src={!event?.poster ? poster : event?.poster}
            layout="fill"
            objectFit='fit'
            className='md:rounded-md landscape:rounded-md'
            />}
            {event?.is_global && <p className='text-uppercase text-sm tracking-tight bg-gray-800 z-10 absolute top-0 left-0 text-white px-1 font-medium'>Global Event</p>}
      </div>
      <div className='text-xs py-1 px-2 uppercase tracking-wide bg-gray-300 text-gray-800 font-semibold md:hidden landscape:hidden'>
          <div className='line-clamp-1'>{event?.event_type}</div>
      </div>
      <div className='h-2/6 flex space-x-1 pt-2 px-2 md:w-8/12 landscape:w-8/12 md:flex-col landscape:flex-col'>
          <div className='flex-1 pl-2'>
              <div className='flex items-center justify-between px-2 font-semibold text-base leading-4 text-gray-800'>
                <p className='line-clamp-1'>{event?.title}</p>
                <div onClick={openOptionsModal}>
                  <EllipsisVerticalIcon className='h-5 w-5'/>
                </div>
            </div>
            <div className='flex items-start justify-start px-2 tracking-tight text-xs text-gray-500'>
                {!event?.ticket_link ?<p className='flex items-start justify-start'>{day} {monthFormatted} {year}</p> :
                <p className='flex items-start justify-start'>{day} {monthFormatted} {year} &bull; Tickets Available</p>}
            </div>
            <div className='text-xs py-1 px-2 uppercase tracking-wide bg-gray-300 text-gray-800 font-semibold hidden md:block landscape:block'>
                <div className='line-clamp-1'>{event?.event_type}</div>
            </div>
          </div>
      </div>
    </article>

        {/* Delete Modal */}
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
                    <p className="text-sm text-gray-500">
                        You're about to delete <strong>{event?.title}</strong>. This action
                        is irreversible and you won't be able to see this event again.
                    </p>
                  </div>

                  <div className="mt-5 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDeleteEvent}
                    >
                      Yes, Delete!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Options Modal */}
        <Transition appear show={optionsModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeOptionsModal}>
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
                  <div className='flex items-center justify-between'>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Event Options
                    </Dialog.Title>
                    <div onClick={closeOptionsModal}>
                      <XMarkIcon className='h-4 w-4'/>
                    </div>
                  </div>
                  <div className="mt-5 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeOptionsModalOpenDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => router.push({pathname: `/dashboard/edit/event/${event?.id}`})} 
                    >
                     Edit
                    </button>
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