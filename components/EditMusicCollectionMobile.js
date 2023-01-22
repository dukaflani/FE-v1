import React, { Fragment, useEffect, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import InputField from './reuseable-components/InputField'
import SelectInputFieldWithKeys from './reuseable-components/SelectInputFieldWithKeys'
import { useSelector } from 'react-redux'
import { useEditAlbumTrackMutation, useFetchUserVideosQuery } from '../redux/features/videos/videosApiSlice'

const EditMusicCollection = ({ albumTrack }) => {
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id

    const queryParams = {
        user: currentUser,
      }

    const { data: myVideos } = useFetchUserVideosQuery(queryParams)
    const [ editAlbumTrack, { isLoading: editAlbumLoading } ] = useEditAlbumTrackMutation()

    let [isOpen, setIsOpen] = useState(false)
    const [albumTrackTitle, setAlbumTrackTitle] = useState('')
    const [albumTrackVideo, setAlbumTrackVideo] = useState('')
    const [albumTrackFeatures, setAlbumTrackFeatures] = useState('')
    const [editedAlbumTrackObject, seteditedAlbumTrackObject] = useState('')
    const [track_albumID, setTrack_albumID] = useState('')
    const [editErrors, setEditErrors] = useState(null)
    const [fieldErrors, setFieldErrors] = useState('')

    useEffect(() => {
      setAlbumTrackTitle(albumTrack?.title)
      setAlbumTrackVideo(albumTrack?.video)
      setAlbumTrackFeatures(albumTrack?.featuring)
      setTrack_albumID(albumTrack?.album)
    }, [albumTrack])
    

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

      const editedAlbumTrack = {
        "albumTrack_id": albumTrack?.id,
        "title": albumTrackTitle,
        "video": albumTrackVideo,
        "featuring": albumTrackFeatures,
        "album": track_albumID,
      }

      const handleEditAlbumTrack = async () => {
        if (albumTrackTitle && albumTrack?.id) {
            try {
              seteditedAlbumTrackObject(await editAlbumTrack(editedAlbumTrack))
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
                <div className='flex-1 flex flex-col pt-2 px-2 pb-1'>
                    <div className='line-clamp-1 border-b mb-1 text-gray-800'>{albumTrack?.title}</div>
                    <div className='line-clamp-1 text-sm text-gray-400'>{!albumTrack?.featuring ? "Solo project" : albumTrack?.featuring}</div>
                </div>
                <div onClick={openModal} className=' flex items-start justify-end px-3 py-2'>
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
                    Edit {albumTrack?.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <InputField
                        primaryState={albumTrackTitle} 
                        setPrimaryState={setAlbumTrackTitle}
                        // mandatory={true}
                        // placeholderText='$0.00'
                        title="Track Title"
                        // helperText="e.g Amazon Music"
                        // helperTextLink="here"
                        // onHelperTextLinkClick={() => setCurrentInput(6)}
                    />
                    <SelectInputFieldWithKeys
                        primaryState={albumTrackVideo}
                        setPrimaryState={setAlbumTrackVideo}
                        // mandatory={true}
                        name='track-video'
                        data={myVideos?.data?.results}
                        selectTitle='Select a video'
                        fieldTitle="Related Video"
                        // helperText="helper"
                        // onHelperTextLinkClick={}
                        // helperTextLink="here"
                    />
                    <InputField
                        primaryState={albumTrackFeatures} 
                        setPrimaryState={setAlbumTrackFeatures}
                        // mandatory={true}
                        // placeholderText='$0.00'
                        title="Featured Artist(s)"
                        // helperText="e.g Amazon Music"
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
                      onClick={handleEditAlbumTrack}
                    >
                      {editAlbumLoading ? "Editing..." : "Edit"}
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

export default EditMusicCollection