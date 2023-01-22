import React, { Fragment, useState } from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon as EditInactive, TrashIcon  } from '@heroicons/react/24/outline'
import { useDeleteAlbumMutation } from '../redux/features/videos/videosApiSlice'
import poster from '../public/media/albumcover2.jpg'

const MyAlbumsObject = ({ album }) => {
    const router = useRouter()
    const albumId = album?.id
    let [isOpen, setIsOpen] = useState(false)
    const [deleteAlbumError, setDeleteAlbumError] = useState(null)
    const [ deleteAlbum, { isLoading: deleteAlbumLoading } ] = useDeleteAlbumMutation()


    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

      const deleteAlbumInfo = {
        "album_id": albumId,
      }
  
      const handleDeleteAlbum = async () => {
        try {
            await deleteAlbum(deleteAlbumInfo)
            setIsOpen(false)
        } catch (error) {
          setDeleteAlbumError(error)
            setTimeout(() => {
              setDeleteAlbumError(null)
            }, 5000);
        }
      }



  return (
    <>
        <div className='bg-white shadow hover:bg-blue-50 flex'>
            <div className='w-2/12 bg-gray-100'>
                <div className='relative h-full w-full'>
                    {album?.cover && <Image
                        src={album?.cover}
                        layout="fill"
                        objectFit='fit'
                        />}
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <div className='w-full p-2 flex'>
                    <div className='line-clamp-1 w-10/12 tracking-tight'>{album?.title} {album?.album_type && <span className='text-xs p-1 ml-2 bg-gray-100'>{album?.album_type}</span>}</div>
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
                                                <button onClick={() => router.push(`/dashboard/edit/album/${album?.id}`)}>
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
                <div className='bg-gray-50 text-gray-500 text-sm p-2'>{album?.track_count} {album?.track_count == 1 ? "Track" : "Tracks"}</div>
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
                    Delete Collection?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        You're about to delete <strong>{album?.title}</strong>. This action
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
                      onClick={handleDeleteAlbum}
                    >
                      {deleteAlbumLoading ? "Deleting..." : "Yes, Delete!"}
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

export default MyAlbumsObject