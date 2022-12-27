import React, { Fragment, useState } from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import numeral from 'numeral';
import { Menu, Transition, Dialog } from '@headlessui/react'
import thumbnail from '../public/media/dukaflani-thumbnail-default.png'
import { HandThumbUpIcon, HandThumbDownIcon, EyeIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon as EditInactive, TrashIcon, PlayIcon, EllipsisVerticalIcon, } from '@heroicons/react/24/outline'
import { useAddViewMutation, useDeleteVideoMutation } from '../redux/features/videos/videosApiSlice';
import { useSelector } from 'react-redux';

const MyVideosMobile = ({ video }) => {
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)
    const [deleteErrors, setDeleteErrors] = useState(null)

    const [ addView ] = useAddViewMutation();
    
    const videoUploadTime = new Date(video?.date).toDateString()
    const view2 = video?.views_count
    let view3 = numeral(view2).format('0,0')

    const likeCountRaw = video?.like_count
    let likeCount = numeral(likeCountRaw).format('0,0')

    const unlikeCountRaw = video?.unlike_count
    let unlikeCount = numeral(unlikeCountRaw).format('0,0')
    const videoId = video?.id


    function closeModal() {
        setIsOpen(false)
      }
    
    function openModal() {
      setIsOpen(true)
    }

    const [ deleteVideo ] = useDeleteVideoMutation()


    const deleteVideoInfo = {
      "video_id": videoId,
  }


  const handleDeleteVideo = async () => {
    try {
        await deleteVideo(deleteVideoInfo)
        setIsOpen(false)
    } catch (error) {
      setDeleteErrors(error)
        setTimeout(() => {
          setDeleteErrors(null)
        }, 5000);
    }
}

const video_id = video?.id
const user_id = currentUser ? currentUser : 1


const newView = {
  "video": video_id,
  "user": user_id
}


const handlePlayVideo = async (id) => {
  await addView(newView);
  router.push({
      pathname: `/watch/`,
      query: { v: id, tab: "links" },
    });
}





  return (
    <>
    <article  className='h-64 md:h-28 landscape:h-28 cursor-pointer md:flex landscape:flex md:w-10/12 landscape:w-10/12 md:mx-auto landscape:mx-auto md:mb-4 landscape:mb-4'>
      <div className='h-4/6 md:h-full landscape:h-full md:w-4/12 landscape:w-4/12 relative md:rounded-md landscape:rounded-md bg-gray-200'>
        {video?.thumbnail && <Image 
            src={!video?.thumbnail ? thumbnail : video?.thumbnail}
            layout="fill"
            objectFit='fit'
            className='md:rounded-md landscape:rounded-md'
          />}
      </div>
      <div className='h-2/6 flex space-x-1 pt-2 px-2 md:w-8/12 landscape:w-8/12 md:flex-col landscape:flex-col'>
      <div className='md:hidden landscape:hidden'>
        <div className='relative h-11 w-11 bg-gray-200 rounded-full'>
            <Image
                src={video?.profile_avatar ? video?.profile_avatar : noAvatar}
                layout="fill"
                objectFit='cover'
                className='rounded-full'
                />
        </div>
      </div>
      <div className='flex-1 pl-2'>
        <div className='font-semibold leading-4 text-gray-700 tracking-tight cursor-pointer text-base line-clamp-2'>
          <div className='flex items-center justify-between pr-2'>
            <span>{video?.title}</span>
            <span>
              <EllipsisVerticalIcon className='h-5 w-5 cursor-pointer'/>
            </span>
          </div>
        </div>
        <div className='md:flex landscape:flex items-center justify-start md:pt-1 landscape:pt-1'>
          <div className='hidden md:block landscape:block'>
            <div className='relative h-8 w-8 bg-gray-200 rounded-full'>
              <Image
                  src={video?.profile_avatar ? video?.profile_avatar : noAvatar}
                  layout="fill"
                  objectFit='cover'
                  className='rounded-full'
                  />
          </div>
        </div>
        <div className='md:flex-1 landscape:flex-1 md:pl-2 landscape:pl-2 '>
          <div className='flex item-center justify-start'>
              <span className='flex item-start justify-center space-x-1 pr-2 text-sm'>
                <EyeIcon className='h-4 w-4 cursor-pointer text-gray-600'/> <span>2.1k</span>
              </span>
            &bull; 
              <span className='flex item-start justify-center space-x-1 px-2 text-sm'>
                <HandThumbUpIcon className='h-4 w-4 cursor-pointer text-gray-600'/> <span>2.1k</span>
              </span>
             &bull; 
              <span className='flex item-start justify-center space-x-1 pl-2 text-sm'>
                <HandThumbDownIcon className='h-4 w-4 cursor-pointer text-gray-600'/> <span>6.1k</span>
              </span>
          </div>
          <div className='text-gray-600 text-sm -mt-1 tracking-tighter'>Uploaded {videoUploadTime}</div>
          </div>
        </div>
      </div>
      </div>
    </article>
    {/* <div  className='flex flex-col mb-4 h-72'>
        <div className='space-x-2 flex flex-col w-full h-5/6 items-center justify-start'>
            <div className='w-full h-64 relative bg-gray-100'>
                 {video?.thumbnail && <Image 
                    src={!video?.thumbnail ? thumbnail : video?.thumbnail}
                    layout="fill"
                    objectFit='cover'
                  />}
            </div>
            <div className='w-8/12 flex flex-col items-start justify-center'>
                <div className='text-base tracking-tighter line-clamp-2 font-medium'>{video?.title}</div>
                <div className='text-xs text-gray-800 font-semibold tracking-tighter flex items-center justify-start space-x-2'>
                    <div className='uppercase'>product:</div>
                    <div className='text-gray-700 text-sm font-normal'>{!video?.product_title ? "Not found" : video?.product_title}</div>
                </div>
                <div className='text-xs text-gray-800 font-semibold tracking-tighter flex items-center justify-start space-x-2'>
                    <div className='uppercase'>Album:</div>
                    <div className='text-gray-700 text-sm font-normal'>{!video?.album_title ? "Not found" : video?.album_title}</div>
                </div>
                <div className='text-xs text-gray-800 font-semibold tracking-tighter flex items-center justify-start space-x-2'>
                    <div className='uppercase'>Genre:</div>
                    <div className='text-blue-700 text-xs font-normal uppercase '>{video?.genre_title}</div>
                </div>
            </div>
            <div className='w-1/12 flex flex-col items-end justify-start h-full space-y-2 uppercase text-xs font-medium tracking-tighter text-gray-600'>
                <div className='cursor-pointer mt-2'>
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
                                                <button onClick={() => handlePlayVideo(video?.url_id)}>
                                                    <PlayIcon className='h-5 w-5 mr-2 ml-1' /> Play
                                                </button>
                                        </Menu.Item>
                                        <Menu.Item className="cursor-pointer px-2 py-2 flex items-center justify-start w-full hover:bg-gray-50">
                                                <button onClick={() => router.push(`/dashboard/edit/video/${video?.id}`)}>
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
        </div>
        <div className='px-2 flex flex-col items-start justify-center w-2/12'>
            <div className='text-xs text-gray-800'>Added {videoUploadTime}</div>
            <div className='text-xs text-gray-800'>{view3} {view3 == 1 ? 'view' : 'views'}</div>
            <div className='text-xs text-gray-800'>{likeCount} {likeCount == 1 ? 'like' : 'likes'}</div>
            <div className='text-xs text-gray-800'>{unlikeCount} {unlikeCount == 1 ? 'dislike' : 'dislikes'}</div>
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
                    Delete Video?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        You're about to delete <strong>{video?.title}</strong>. This action
                        is irreversible and you won't be able to see this video again.
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
                      onClick={handleDeleteVideo}
                    >
                      Yes, Delete!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </>
  )
}

export default MyVideosMobile