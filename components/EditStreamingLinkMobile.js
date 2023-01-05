import React, { Fragment, useEffect, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { platforms } from '../data/streamingPlatforms'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import SelectInputField from './reuseable-components/SelectInputField'
import InputField from './reuseable-components/InputField'
import { useEditStreamingLinkMutation } from '../redux/features/videos/videosApiSlice'

const EditStreamingLink = ({ link }) => {
    let [isOpen, setIsOpen] = useState(false)
    const [streamingService, setStreamingService] = useState('')
    const [streamingLink, setStreamingLink] = useState('')
    const [editedLink, setEditedLink] = useState('')
    const [editErrors, setEditErrors] = useState(null)
    const [fieldErrors, setFieldErrors] = useState('')
    const [ editStreamingLink ] = useEditStreamingLinkMutation()

    useEffect(() => {
      setStreamingService(link?.streaming_service)
      setStreamingLink(link?.link)
    }, [link])
    

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

      const editedStreamingLink = {
        "streamingLink_id": link?.id,
        "streaming_service": streamingService,
        "link": streamingLink,
      }

    const handleEditStreamingLinks = async () => {
        if (streamingService && streamingLink && link?.id) {
            try {
              setEditedLink(await editStreamingLink(editedStreamingLink))
                setIsOpen(false)
            } catch (error) {
              setEditErrors(error)
                setTimeout(() => {
                  setEditErrors(null)
                }, 5000);
            }
            
        } else {
          setFieldErrors('Please fill in all the fields')
        }
    }
  


  return (
    <>
        <div className='flex flex-col w-full'>
            <div className='shadow mb-5 flex  w-full bg-gray-50'>
                <div className='w-11/12 flex flex-col pt-2 px-2 pb-1'>
                    <div className='line-clamp-1 border-b mb-1 text-gray-800'>{link?.streaming_service.replace(/-/g, " ")}</div>
                    <div className='line-clamp-1 text-xs text-gray-400'>{link?.link}</div>
                </div>
                <div onClick={openModal} className=' w-1/12 flex items-start justify-end px-3 py-2'>
                    <PencilSquareIcon className='h-5 w-5 text-gray-800 cursor-pointer'/>
                </div>
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
                    Edit {link?.streaming_service} Link
                  </Dialog.Title>
                  <div className="mt-2">
                    <SelectInputField
                      primaryState={streamingService}  
                      setPrimaryState={setStreamingService}
                      // mandatory={true}
                      name='streaming-links'
                      data={platforms}
                      dataNumber={platforms?.length}
                      selectTitle='Select a platform'
                      fieldTitle="Streaming Service"
                      // helperText="helper"
                      // onHelperTextLinkClick={}
                      // helperTextLink="here"
                    />
                    <InputField 
                      primaryState={streamingLink} 
                      setPrimaryState={setStreamingLink} 
                      // mandatory={true}
                      // placeholderText='Song title...'
                      title="Streaming Link"
                      // helperText="Paste your streaming/download link here"
                      // helperTextLink="here"
                      // onHelperTextLinkClick={() => setCurrentInput(6)}
                    />
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
                      onClick={handleEditStreamingLinks}
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

export default EditStreamingLink