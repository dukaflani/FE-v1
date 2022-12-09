import React, { Fragment, useEffect, useState } from 'react'
import Image from "next/legacy/image";
import Linkify from 'react-linkify';
import { Menu, Transition, Dialog } from '@headlessui/react'
import { TrashIcon, BookmarkIcon, PencilSquareIcon  } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import ShowMoreText from "react-show-more-text";
import { formatDistanceStrict } from 'date-fns';
import noAvatar from '../public/media/noimage.webp'
import { useEditCommentMutation, useDeleteCommentMutation } from '../redux/features/videos/videosApiSlice';
import TextAreaField from './reuseable-components/TextAreaField'
import { useSelector } from 'react-redux';

const RegularComment = ({ comment }) => {
const [isHidden, setIsHidden] = useState(true) 
const [isOpen, setIsOpen] = useState(false)
const [isOpenForEdit, setIsOpenForEdit] = useState(false)
const [commentBody, setCommentBody] = useState('')
const [isPinned, setIsPinned] = useState(null)
const [commentId, setCommentId] = useState('')
const [commentVideoId, setCommentVideoId] = useState('')
const [editedComment, setEditedComment] = useState(null)
const [editCommentError, setEditCommentError] = useState(null)

const [ editComment ] = useEditCommentMutation()
const [ deleteComment ] = useDeleteCommentMutation()

const { user } = useSelector((state) => state.auth)
const currentUser = user?.info?.id
const commentOwner = comment?.user
const loggedInUser = currentUser


useEffect(() => {
    setCommentBody(comment?.body)
    setIsPinned(comment?.is_pinned)
    setCommentId(comment?.id)
    setCommentVideoId(comment?.video)
}, [])


const newCommentInfo = {
    "body": commentBody,
    "is_pinned": !isPinned,
    "comment_id": commentId,
    "comment_video_id": commentVideoId,
}

const newEditedCommentInfo = {
    "body": commentBody,
    "is_pinned": isPinned,
    "comment_id": commentId,
    "comment_video_id": commentVideoId,
}

const deleteCommentInfo = {
    "comment_id": commentId,
    "comment_video_id": commentVideoId,
}


const handlePinComment = async () => {
        try {
            setEditedComment(await editComment(newCommentInfo))
        } catch (error) {
            setEditCommentError(error)
            setTimeout(() => {
                setEditCommentError(null)
            }, 5000);
        }
}

const handleEditComment = async () => {
        try {
            setEditedComment(await editComment(newEditedCommentInfo))
            setIsOpenForEdit(false)
        } catch (error) {
            setEditCommentError(error)
            setTimeout(() => {
                setEditCommentError(null)
            }, 5000);
        }
}

const handleDeleteComment = async () => {
        try {
            await deleteComment(deleteCommentInfo)
            setIsOpen(false)
        } catch (error) {
            setEditCommentError(error)
            setTimeout(() => {
                setEditCommentError(null)
            }, 5000);
        }
}

function closeModal() {
    setIsOpen(false)
    }

function openModal() {
    setIsOpen(true)
}
    
function closeEditModal() {
    setIsOpenForEdit(false)
}

function openEditModal() {
    setIsOpenForEdit(true)
}


const desc = comment?.body
const hashTags = desc?.split(' ')
const hashTagRegex = /#[a-z0-9_]+/gi 

const videoUploadTime = formatDistanceStrict(
    new Date(comment?.date),
    new Date(),
    {
      addSuffix: true,
    },
  );

  const showOptions = () => {
    setIsHidden(false)
  }

  const hideOptions = () => {
    setIsHidden(true)
  }



  return (
    <>
    <div onMouseEnter={showOptions} onMouseLeave={hideOptions} className={!comment?.is_pinned ? 'flex w-full mb-6 space-x-2 relative' : 'hidden'}>
        <div className='w-1/12 flex items-start justify-end'>
            <div className='relative h-10 w-10'>
                <Image
                    src={comment?.avatar ? comment?.avatar : noAvatar}
                    layout="fill"
                    objectFit='cover'
                    className='rounded-full'
                    />
            </div>
        </div>
        <div className='w-11/12 flex flex-col items-start justify-start pr-10 pt-2'>
            <div className='text-sm tracking-tight font-semibold text-gray-700'>{comment?.name} &bull; <span className='text-sm tracking-tight font-normal'>{videoUploadTime}</span></div>
            <div className='tracking-tight text-sm'>
            <Linkify componentDecorator={(decoratedHref, decoratedText, key) => ( <a target="blank" className='text-blue-600 -mb-1 w-56 inline-block overflow-hidden overflow-ellipsis whitespace-nowrap'  href={decoratedHref} key={key}> {decoratedText} </a> )} >
                <ShowMoreText
                    lines={3}
                    more="Show more"
                    less="Show less"
                    className="content-css text-sm leading-4 tracking-tight text-gray-800 whitespace-pre-wrap"
                    anchorClass="text-xs tracking-tight uppercase text-blue-700 ml-1"
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                {hashTags?.map((hashTag, i) => {
                    return hashTag.match(hashTagRegex) ? (
                        <div key={i}><span className='text-blue-600'>{hashTag}</span> {' '}</div>
                    ) : hashTag + ' '
                })}
                </ShowMoreText>
            </Linkify>
            </div>
        </div>

        <div className={isHidden ? 'hidden' : "absolute top-0 right-0 flex items-start justify-end p-1"}>
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
                                        {commentOwner == loggedInUser ? (<Menu.Item onClick={handlePinComment} className="text-sm cursor-pointer px-2 py-2 flex items-center justify-start w-full hover:bg-gray-50">
                                                <button>
                                                    <BookmarkIcon className='h-5 w-5 mr-2 ml-1' /> Move to Top
                                                </button>
                                        </Menu.Item>) : (
                                            <Menu.Item className="text-sm px-2 py-2 flex items-center cursor-not-allowed text-gray-300 justify-start w-full hover:bg-gray-50">
                                                <button>
                                                    <BookmarkIcon className='h-5 w-5 mr-2 ml-1' /> Move to Top
                                                </button>
                                            </Menu.Item>
                                        )}
                                        {commentOwner == loggedInUser ? (<Menu.Item onClick={openEditModal} className="text-sm cursor-pointer px-2 py-2 flex items-center justify-start w-full hover:bg-gray-50">
                                                <button>
                                                    <PencilSquareIcon className='h-5 w-5 mr-2 ml-1' /> Edit
                                                </button>
                                        </Menu.Item>) : (
                                            <Menu.Item className="text-sm px-2 py-2 flex items-center cursor-not-allowed text-gray-300 justify-start w-full hover:bg-gray-50">
                                                <button>
                                                    <PencilSquareIcon className='h-5 w-5 mr-2 ml-1' /> Edit
                                                </button>
                                            </Menu.Item>
                                        )}
                                        {commentOwner == loggedInUser ? (<Menu.Item onClick={openModal} className="text-sm cursor-pointer px-2 py-2 flex items-center justify-start w-full hover:bg-gray-50">
                                                <button>
                                                    <TrashIcon className='h-5 w-5 mr-2 ml-1' /> Delete
                                                </button>
                                        </Menu.Item>) : (
                                            <Menu.Item className="text-sm px-2 py-2 flex items-center cursor-not-allowed text-gray-300 justify-start w-full hover:bg-gray-50">
                                                <button>
                                                    <TrashIcon className='h-5 w-5 mr-2 ml-1' /> Delete
                                                </button>
                                            </Menu.Item>
                                        )}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
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
                    Delete Comment?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        You're about to delete this comment. This action
                        is irreversible and you won't be able to see this comment again.
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
                      onClick={handleDeleteComment}
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


    <Transition appear show={isOpenForEdit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
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
                    Edit Comment!
                  </Dialog.Title>
                  <div className="mt-2">
                    {/* <p className="text-sm text-gray-500">
                        You're about to delete this comment. This action
                        is irreversible and you won't be able to see this comment again.
                    </p> */}
                    <TextAreaField
                        primaryState={commentBody}
                        setPrimaryState={setCommentBody}
                    />
                  </div>

                  <div className="mt-5 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeEditModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleEditComment}
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

export default RegularComment