import React, { Fragment, useEffect, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { verseChoices } from '../data/verses'
import InputField from './reuseable-components/InputField'
import SelectInputField from './reuseable-components/SelectInputField'
import TextAreaField from './reuseable-components/TextAreaField'
import { useEditLyricsMutation } from '../redux/features/videos/videosApiSlice'

const EditLyrics = ({ verse }) => {
    let [isOpen, setIsOpen] = useState(false)
    const [verseType, setVerseType] = useState('')
    const [verseVocals, setVerseVocals] = useState('')
    const [lyricsBody, setLyricsBody] = useState('')
    const [editedLyricsObject, setEditedLyricsObject] = useState('')
    const [editErrors, setEditErrors] = useState(null)
    const [ editLyrics, { isLoading: editIsLoading } ] = useEditLyricsMutation()
    const [fieldErrors, setFieldErrors] = useState('')

    useEffect(() => {
      setVerseType(verse?.type)
      setVerseVocals(verse?.artist)
      setLyricsBody(verse?.body)
    }, [verse])
    

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }


      const editedLyrics = {
        "lyricVerse_id": verse?.id,
        "type": verseType,
        "artist": verseVocals,
        "body": lyricsBody,
      }

      const handleEditLyrics = async () => {
        if (verseType && verseVocals && lyricsBody && verse?.id) {
            try {
              setEditedLyricsObject(await editLyrics(editedLyrics))
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
                    <div className='line-clamp-1 border-b mb-1 text-gray-800'>{verse?.type.replace(/_/g, "-")}</div>
                    <div className='line-clamp-1 text-sm text-gray-400'>{verse?.artist}</div>
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
                    Edit {verse?.type}
                  </Dialog.Title>
                  <div className="mt-2">
                    <SelectInputField
                        // primaryState={streamingService}
                        primaryState={verseType}
                        setPrimaryState={setVerseType} 
                        // mandatory={true}
                        name='verse-type'
                        data={verseChoices}
                        selectTitle='Select a type'
                        fieldTitle="Verses"
                        // helperText="helper"
                        // onHelperTextLinkClick={}
                        // helperTextLink="here"
                    />
                    <InputField 
                        primaryState={verseVocals} 
                        setPrimaryState={setVerseVocals} 
                        // mandatory={true}
                        // placeholderText='$0.00'
                        title="Vocals"
                        // helperText="Artist(s) singing the verse"
                        // helperTextLink="here"
                        // onHelperTextLinkClick={() => setCurrentInput(6)}
                    />
                    <TextAreaField
                        primaryState={lyricsBody} 
                        setPrimaryState={setLyricsBody}
                        // mandatory={true}
                        // placeholderText='Write your lyrics here'
                        title="Lyrics"
                        // helperText="helper"
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
                      onClick={handleEditLyrics}
                    >
                      {editIsLoading ? "Editing..." : "Edit"}
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

export default EditLyrics