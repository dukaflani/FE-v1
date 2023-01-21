import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import numeral from 'numeral';
import { Transition, Dialog } from '@headlessui/react'
import thumbnail from '../public/media/dukaflani-thumbnail-default.png'
import noAvatar from '../public/media/noimage.webp'
import { HandThumbUpIcon, HandThumbDownIcon, EyeIcon } from '@heroicons/react/24/solid'
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAddViewMutation, useDeleteVideoMutation } from '../redux/features/videos/videosApiSlice';

const MyVideosMobile = ({ video }) => {
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id
    const videoOwner = video?.user
    const loggedInUser = currentUser
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)
    const [deleteErrors, setDeleteErrors] = useState(null)

    const [ addView ] = useAddViewMutation();
    
    const videoUploadTime = new Date(video?.date).toDateString()

    const viewCountRaw = video?.views_count
    let viewCount = ''
    viewCountRaw < 1000 || viewCountRaw % 10 === 0 ? viewCount = numeral(viewCountRaw).format('0a') :  viewCount = numeral(viewCountRaw).format('0.0a')

    const likeCountRaw = video?.like_count
    let likeCount = ''
    likeCountRaw < 1000 || likeCountRaw % 10 === 0 ? likeCount = numeral(likeCountRaw).format('0a') :  likeCount = numeral(likeCountRaw).format('0.0a')

    const unlikeCountRaw = video?.unlike_count
    let unlikeCount = ''
    unlikeCountRaw < 1000 || unlikeCountRaw % 10 === 0 ? unlikeCount = numeral(unlikeCountRaw).format('0a') :  unlikeCount = numeral(unlikeCountRaw).format('0.0a')
    const videoId = video?.id


    function closeModal() {
        setIsOpen(false)
      }
    
    function openModal() {
      setIsOpen(true)
    }

    function closeOptionsModal() {
      setOpenOptions(false)
      }

    function closeOptionsModalOpenDeleteModal() {
      setOpenOptions(false)
      openModal()
      }
    
    function openOptionsModal() {
      setOpenOptions(true)
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
      <div onClick={() => handlePlayVideo(video?.youtube_id)} className='h-4/6 md:h-full landscape:h-full md:w-4/12 landscape:w-4/12 relative md:rounded-md landscape:rounded-md bg-gray-200'>
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
            <span onClick={openOptionsModal}>
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
                <EyeIcon className='h-4 w-4 cursor-pointer text-gray-600'/> <span>{viewCount}</span>
              </span>
            &bull; 
              <span className='flex item-start justify-center space-x-1 px-2 text-sm'>
                <HandThumbUpIcon className='h-4 w-4 cursor-pointer text-gray-600'/> <span>{likeCount}</span>
              </span>
             &bull; 
              <span className='flex item-start justify-center space-x-1 pl-2 text-sm'>
                <HandThumbDownIcon className='h-4 w-4 cursor-pointer text-gray-600'/> <span>{unlikeCount}</span>
              </span>
          </div>
          <div className='text-gray-600 text-sm -mt-1 tracking-tighter'>Uploaded {videoUploadTime}</div>
          </div>
        </div>
      </div>
      </div>
    </article>


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
                    {videoOwner == loggedInUser ? <p className="text-sm text-gray-500">
                        You're about to delete <strong>{video?.title}</strong>. This action
                        is irreversible and you won't be able to see this video again.
                    </p>
                    :
                    <p className="text-sm text-gray-500">
                        You're not authorized to delete this video
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
                    {videoOwner == loggedInUser && <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDeleteVideo}
                    >
                      Yes, Delete!
                    </button>}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> 


      <Transition appear show={openOptions} as={Fragment}>
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
                      className="text-md font-medium leading-6 text-gray-900"
                    >
                      More Info
                    </Dialog.Title>
                    <span onClick={closeOptionsModal}><XMarkIcon className='h-5 w-5'/></span>
                  </div>
                  <div className="mt-1">
                    <strong className="text-sm text-gray-500">Product</strong>
                    <p className="text-sm text-gray-500">{video?.product_title}</p>
                    <strong className="text-sm text-gray-500">Album</strong>
                    <p className="text-sm text-gray-500">{video?.album_title}</p>
                    <p className='text-blue-700 text-xs font-normal uppercase '>{video?.genre_title}</p>
                  </div>

                  <div className="mt-5 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeOptionsModalOpenDeleteModal}
                    >
                      Delete
                    </button>
                    {videoOwner == loggedInUser && <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => router.push(`/dashboard/edit/video/${video?.id}`)}
                    >
                      Edit
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

export default MyVideosMobile