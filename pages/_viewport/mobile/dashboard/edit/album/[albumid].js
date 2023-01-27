import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from "next/legacy/image"
import { useRouter } from 'next/router'
import FormData from 'form-data'
import slugify from 'slugify'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Transition, Dialog } from '@headlessui/react'
import { albumActions, albumTypes } from '../../../../../../data/musicCollection'
import cover from '../../../../../../public/media/dukaflani-cover-default.png'
import { useFetchAccessTokenQuery, useFetchAlbumQuery, useFetchAlbumTracksQuery } from '../../../../../../redux/features/videos/videosApiSlice'
import SidebarNavMobile from '../../../../../../components/SidebarNavMobile'
import NavigationMobile from '../../../../../../components/NavigationMobile'
import EditMusicCollectionMobile from '../../../../../../components/EditMusicCollectionMobile'
import InputField from '../../../../../../components/reuseable-components/InputField'
import SelectInputField from '../../../../../../components/reuseable-components/SelectInputField'
import BottomNavigationMobile from '../../../../../../components/BottomNavigationMobile'

const editAlbum = () => {
  const router = useRouter()
  const { albumid } = router.query
  let [isOpen, setIsOpen] = useState(false)
  const [albumTitle, setAlbumTitle] = useState('')
  const [albumCover, setAlbumCover] = useState('')
  const [albumLink, setAlbumLink] = useState('')
  const [albumLinkTitle, setAlbumLinkTitle] = useState('')
  const [albumType, setAlbumType] = useState('')
  const [albumOptionType, setAlbumOptionType] = useState('')
  const [editedAlbum, setEditedAlbum] = useState('')
  const [editedErrors, setEditedErrors] = useState(null)
  const [editingAlbum, setEditingAlbum] = useState(false)
  
  
  function closeModal() {
    setIsOpen(false)
  }
  
  function openModal() {
    setIsOpen(true)
  }
  
  const albumQuery = {
    "album_id": albumid
  }
  
  const albumTrackQuery = {
    "albumTrack_id": albumid
  }
  

  const { data: accessToken } = useFetchAccessTokenQuery()
  const { data: albumObject } = useFetchAlbumQuery(albumQuery)
  const { data: albumTrackObject } = useFetchAlbumTracksQuery(albumTrackQuery)
  const numOfTracks = albumObject?.data?.track_count
  const slugString = !albumTitle ? '' : albumTitle
  const albumSlug = slugify(slugString, {lower: true})

  useEffect(() => {
    setAlbumTitle(albumObject?.data?.title)
    setAlbumOptionType(albumObject?.data?.option_type)
    setAlbumLink(albumObject?.data?.link)
    setAlbumLinkTitle(albumObject?.data?.link_title)
    setAlbumType(albumObject?.data?.album_type)
  }, [albumObject?.data])


  const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

      const editAlbumInfo = new FormData();
      editAlbumInfo.append("title", albumTitle);
      editAlbumInfo.append("cover", albumCover);
      editAlbumInfo.append("link", albumLink);
      editAlbumInfo.append("link_title", albumLinkTitle);
      editAlbumInfo.append("album_type", albumType);
      editAlbumInfo.append("option_type", albumOptionType);
      editAlbumInfo.append("slug", albumSlug);


      const handleEditAlbum = () => {
        setEditingAlbum(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/album/${albumid}/`,
        {
            method: 'PATCH',
            headers: myHeaders,
            body: editAlbumInfo,
        }
        )
        .then((response) => response.json())
        .then((result) => {
          setEditingAlbum(false)
          setIsOpen(false)
          setEditedAlbum(result)
        })
        .catch((error) => {
          setEditingAlbum(false)
          setEditedErrors(error)
        });
    }



  return (
    <SidebarNavMobile>
    <Head>
        <title>Edit Album | Dukaflani — Home of Music Videos</title>
        <meta name="title" content="Edit Album | Dukaflani — Home of Music Videos"/>
        <meta name="description" content=""Entrepreneurs In Music Sell Their Products Here STREAMING LINKS MERCHANDISE LYRICS SKIZA TUNES ALBUMS EVENTS VIDEOS""/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
      <NavigationMobile/>
      <>
      <main className='flex flex-col items-center justify-center py-20'>
        <article className='bg-white border-b shadow-sm max-w-md mx-2 p-5'>
        <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Edit Music Collection</div>
        <div className='flex items-center w-full justify-center mb-5 border-b py-3'>
          <div>
            <div className='relative h-24 w-24'>
                  {albumObject?.data?.cover && <Image
                      src={!albumObject?.data?.cover ? cover : albumObject?.data?.cover}
                      layout="fill"
                      objectFit='fit'
                      />}
              </div>
          </div>
          <div className='flex-1 flex space-x-3 p-2'>
            <div>
              <div className='text-base tracking-tighter text-gray-700 font-medium'>{albumObject?.data?.title}</div>
              <div className='text-sm tracking-tighter text-gray-700 '>{albumObject?.data?.album_type}</div>
              <div className='text-sm tracking-tighter text-gray-700'>{albumObject?.data?.option_type} {albumObject?.data?.link_title}</div>
            </div>
            <div onClick={openModal}>
              {albumObject?.data?.title && <PencilSquareIcon className='h-5 w-5 cursor-pointer text-gray-700'/>}
            </div>
          </div>
        </div>
            {[...Array(numOfTracks).keys()].map((item, i) => (
                <EditMusicCollectionMobile albumTrack={albumTrackObject?.data[i]} key={i}/>
            ))}
        </article>
        <footer className='flex items-center justify-center p-5'>
            <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
        </footer>
      </main>

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
                    Edit {albumObject?.data?.title}
                  </Dialog.Title>
                  <div className="mt-2">
                  <InputField
                      primaryState={albumTitle} 
                      setPrimaryState={setAlbumTitle}
                      // mandatory={true}
                      // placeholderText='$0.00'
                      title="Album Title"
                      // helperText="Country of origin"
                      // helperTextLink="here"
                      // onHelperTextLinkClick={() => setCurrentInput(6)}
                  />
                  <div className='flex space-x-2'>
                    <div className='w-1/2'>
                    <SelectInputField
                    primaryState={albumType} 
                    setPrimaryState={setAlbumType}
                    // mandatory={true}
                    name='album-type'
                    data={albumTypes}
                    selectTitle='Choose one...'
                    fieldTitle="Album Type"
                    // helperText="~"
                    // onHelperTextLinkClick={}
                    // helperTextLink="here"
                />
                    </div>
                    <div className='w-1/2'>
                    <SelectInputField
                    primaryState={albumOptionType}
                    setPrimaryState={setAlbumOptionType} 
                    // mandatory={true}
                    name='album-action'
                    data={albumActions}
                    selectTitle='Choose one...'
                    fieldTitle="Action"
                    // helperText="helper"
                    // onHelperTextLinkClick={}
                    // helperTextLink="here"
                />
                    </div>
                  </div>
                <InputField
                    primaryState={albumLinkTitle} 
                    setPrimaryState={setAlbumLinkTitle}
                    // mandatory={true}
                    // placeholderText='$0.00'
                    title="Album Link Title"
                    helperText="e.g Amazon Music"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
                <InputField
                    primaryState={albumLink} 
                    setPrimaryState={setAlbumLink}
                    // mandatory={true}
                    // placeholderText='$0.00'
                    title="Album Link"
                    helperText="Paste a link to your album here"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
                <div className='flex flex-col space-y-1'>
                <input accept='image/*' type="file" onChange={(e) => setAlbumCover(e.target.files[0])}  className='w-full border-gray-300 focus:outline-none' />
                <div className='px-2 text-xs text-gray-400'>Upload album cover max size 300KB</div>
              </div>
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
                      onClick={handleEditAlbum}
                    >
                      {editingAlbum ? "Editing..." : "Edit"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </>
      <BottomNavigationMobile/>
    </SidebarNavMobile>
  )
}

export default editAlbum