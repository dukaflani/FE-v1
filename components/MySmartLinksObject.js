import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon as EditInactive, TrashIcon  } from '@heroicons/react/24/outline'
import { useDeleteStreamingLinkMutation } from '../redux/features/videos/videosApiSlice'

const MySmartLinksObject = ({ streaminglink, numOfStreamingLinks }) => {
    const router = useRouter()
    // const { linksid } = router.query
    const linksid = streaminglink?.id
    let [isOpen, setIsOpen] = useState(false)
    const [deleteStreamingLinkError, setDeleteStreamingLinkError] = useState(null)
    const [ deleteStreamingLink ] = useDeleteStreamingLinkMutation()

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

    const deleteStreamingLinkInfo = {
      "streamingLink_id": linksid,
    }

    const handleDeleteStreamingLink = async () => {
      try {
          await deleteStreamingLink(deleteStreamingLinkInfo)
          setIsOpen(false)
      } catch (error) {
        setDeleteStreamingLinkError(error)
          setTimeout(() => {
            setDeleteStreamingLinkError(null)
          }, 5000);
      }
    }


  return (
    <>
        <div className='bg-white shadow hover:bg-blue-50'>
            <div className='p-2 flex'>
                <div className='line-clamp-1 w-10/12 tracking-tight'>{streaminglink?.title}</div>
                <div className='w-2/12 flex items-center justify-end'>
                    <Menu className="relative inline-block text-left" as="div">
                        <Menu.Button className="inline-flex w-full justify-center focus:outline-none">
                            <EllipsisVerticalIcon className='h-5 w-5 cursor-pointer'/>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            >
                            <Menu.Items className="absolute right-0 mt-2 w-56 bg-white shadow z-10 focus:outline-none">
                                <div>
                                    <Menu.Item className="cursor-pointer px-2 py-2 flex items-center justify-start w-full hover:bg-gray-50">
                                            <button onClick={() => router.push(`/dashboard/edit/links/${linksid}/`)}>
                                                <EditInactive className='h-5 w-5 mr-2 ml-1' /> Edit
                                            </button>
                                    </Menu.Item>
                                    <Menu.Item className="cursor-pointer px-2 py-2 flex items-center justify-start w-full hover:bg-gray-50">
                                            <button onClick={openModal}>
                                                <TrashIcon className='h-5 w-5 mr-2 ml-1' /> Delete
                                            </button>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
            <div className='bg-gray-50 text-gray-500 text-sm p-2'>{numOfStreamingLinks} {numOfStreamingLinks == 1 ? "Link" : "Links"}</div>
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
                    Delete Streaming Links?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        You're about to delete <strong>Kamnyweso streaming links</strong>. This action
                        is irreversible and you won't be able to see them again.
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
                      onClick={handleDeleteStreamingLink}
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
    </>
  )
}

export default MySmartLinksObject