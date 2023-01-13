import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import slugify from 'slugify'
import { nanoid } from 'nanoid'
import { albumActions, albumTypes } from '../data/musicCollection'
import { useFetchAccessTokenQuery, useFetchCreatedAlbumTracksListMutation, useFetchUserVideosQuery } from '../redux/features/videos/videosApiSlice'
import InputField from './reuseable-components/InputField'
import SelectInputField from './reuseable-components/SelectInputField'
import SelectInputFieldWithKeys from './reuseable-components/SelectInputFieldWithKeys'

const AlbumInfoInput = ({ setCurrentInput, currentInput }) => {

    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id

    const queryParams = {
        user: currentUser,
      }

    const { data: myVideos } = useFetchUserVideosQuery(queryParams)



    const [albumTitle, setAlbumTitle] = useState("")
    const [albumActionType, setAlbumActionType] = useState('')
    const [albumLink, setAlbumLink] = useState('')
    const [albumTypeChoice, setAlbumTypeChoice] = useState('')
    const [albumLinkTitle, setAlbumLinkTitle] = useState('')
    const [albumCoverImage, setAlbumCoverImage] = useState(null)
    const [createdAlbum, setCreatedAlbum] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [missingValuesError, setMissingValuesError] = useState(false)
    const [nanoId, setNanoId] = useState('')

    const [albumTrackTitle, setAlbumTrackTitle] = useState('')
    const [albumTrackVideo, setAlbumTrackVideo] = useState('')
    const [albumTrackFeatures, setAlbumTrackFeatures] = useState('')
    const [createdAlbumTrack, setCreatedAlbumTrack] = useState(null)
    const [createdTracksList, setCreatedTracksList] = useState([])
    const [missingAlbumTrackTitle, setMissingAlbumTrackTitle] = useState(false)
    const [albumTrackCatchError, setAlbumTrackCatchError] = useState('')

    useEffect(() => {
        setNanoId(nanoid(16))
    }, [])

    const [ fetchCreatedAlbumTracksList ] = useFetchCreatedAlbumTracksListMutation()

    const albumTitleSlug = slugify(albumTitle, {lower: true})
    const { data: accessToken } = useFetchAccessTokenQuery()
    const refreshToken = `JWT ${accessToken?.access}`
    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

    const albumInfo = new FormData();
    albumInfo.append("title", albumTitle);
    albumInfo.append("cover", albumCoverImage);
    albumInfo.append("link", albumLink);
    albumInfo.append("link_title", albumLinkTitle);
    albumInfo.append("album_type", albumTypeChoice);
    albumInfo.append("option_type", albumActionType);
    albumInfo.append("slug", albumTitleSlug);
    albumInfo.append("url_id", nanoId);

    const albumTrackInfo = new FormData();
    albumTrackInfo.append("title", albumTrackTitle);
    albumTrackInfo.append("album", createdAlbum?.id);
    albumTrackInfo.append("video", albumTrackVideo);
    albumTrackInfo.append("featuring", albumTrackFeatures);

    const createdAlbumId = {
        "createdalbum_id": createdAlbum?.id,
    }
    
    const handleAddAlbum = () => {
        if (albumTitle) {
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/album/`,
            {
                method: 'POST',
                headers: myHeaders,
                body: albumInfo,
            }
            )
            .then((response) => response.json())
            .then((result) => {
                setCreatedAlbum(result)
                setAlbumLink(" ")
                setAlbumLinkTitle(" ")
                setAlbumCoverImage(null)
            })
            .catch((error) => {
                setErrorMessage(error)
                setTimeout(() => {
                    setErrorMessage('')
                }, 5000);
            });
        } else {
            setMissingValuesError(true)
            setTimeout(() => {
                setMissingValuesError(false)
            }, 5000);
        }
    }

    const handleAddAlbumTrack = async () => {
        if (albumTrackTitle) {
            try {
                const resAlbumTrack = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/album-track/`, {method: 'POST', headers: myHeaders, body: albumTrackInfo})
                const dataAlbumTrack = await resAlbumTrack.json();
                setCreatedAlbumTrack(dataAlbumTrack)
                setCreatedTracksList(await fetchCreatedAlbumTracksList(createdAlbumId))
                setAlbumTrackTitle(" ")
                setAlbumTrackVideo(" ")
                setAlbumTrackFeatures("")  
            } catch (error) {
                if (error) {
                    setAlbumTrackCatchError('Something went wrong! Please try again')
                    setTimeout(() => {
                        setAlbumTrackCatchError('')
                    }, 5000);
                }
                setErrorMessage(error?.message);
                setErrorMessage(error);
            }
        } else {
            setMissingAlbumTrackTitle(true)
            setTimeout(() => {
                setMissingAlbumTrackTitle(false)
            }, 5000);
        }
    }

  return (
    <div className='p-2 bg-white shadow-md border-b mb-10'>
        {errorMessage && <div className='text-red-500 font-medium tracking-tighter text-sm'>Album not created. Please upload an album cover to continue</div>}
        {createdAlbum?.id && <div className='text-gray-700 font-medium tracking-tighter text-basse'>{`Add tracks to " ${albumTitle} the ${albumTypeChoice} " below`}</div>}
        {!createdAlbum?.id &&
        <>
        <div className='p-1 mb-4'>
            <InputField
                primaryState={albumTitle} 
                setPrimaryState={setAlbumTitle}
                mandatory={true}
                // placeholderText='$0.00'
                title="Album Title"
                // helperText="Country of origin"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1 flex flex-col'>
            <div className='w-full'>
                <SelectInputField
                    primaryState={albumActionType}
                    setPrimaryState={setAlbumActionType}
                    mandatory={true}
                    name='album-action'
                    data={albumActions}
                    selectTitle='Choose one...'
                    fieldTitle="Action"
                    // helperText="helper"
                    // onHelperTextLinkClick={}
                    // helperTextLink="here"
                />
            </div>
            <div className='w-full'>
                <InputField
                    primaryState={albumLink} 
                    setPrimaryState={setAlbumLink}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="Album Link"
                    helperText="Paste a link to your album here"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
        </div>
        <div className='p-1 flex flex-col'>
            <div className='w-full'>
                <SelectInputField
                    primaryState={albumTypeChoice}
                    setPrimaryState={setAlbumTypeChoice}
                    mandatory={true}
                    name='album-type'
                    data={albumTypes}
                    selectTitle='Choose one...'
                    fieldTitle="Album Type"
                    helperText="~"
                    // onHelperTextLinkClick={}
                    // helperTextLink="here"
                />
            </div>
            <div className='w-full'>
                <InputField
                    primaryState={albumLinkTitle} 
                    setPrimaryState={setAlbumLinkTitle}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="Album Link Title"
                    helperText="e.g Amazon Music"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
            <div className='w-full flex flex-col space-y-1'>
                <input accept='image/*' type="file" onChange={(e) => setAlbumCoverImage(e.target.files[0])}  className='w-full border-gray-300 focus:outline-none' />
                <div className='px-2 text-xs text-gray-400'>Upload album cover max size 300KB</div>
              </div>
        </div>
        <div className='px-1 my-2 flex items-center justify-start space-x-3'>
            <button className='bg-red-600 hover:bg-red-400 text-white cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Cancel</button>
            <button onClick={handleAddAlbum} className='border border-gray-500 text-gray-500 hover:bg-gray-300 hover:border-gray-300 cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Create</button>
            {missingValuesError && <div className='text-red-500 font-medium tracking-tighter text-sm'>Please add title!</div>}
        </div>
        </>
        }
        {createdAlbum?.id &&
        <>
        <div className='my-5'>
            <div className='flex flex-col'>
                <div className='w-full'>
                    <InputField
                        primaryState={albumTrackTitle} 
                        setPrimaryState={setAlbumTrackTitle}
                        mandatory={true}
                        // placeholderText='$0.00'
                        title="Track Title"
                        // helperText="e.g Amazon Music"
                        // helperTextLink="here"
                        // onHelperTextLinkClick={() => setCurrentInput(6)}
                    />
                </div>
                <div className='w-full'>
                    <SelectInputFieldWithKeys
                        primaryState={albumTrackVideo}
                        setPrimaryState={setAlbumTrackVideo}
                        mandatory={true}
                        name='track-video'
                        data={myVideos?.data}
                        selectTitle='Select a video'
                        fieldTitle="Related Video"
                        // helperText="helper"
                        // onHelperTextLinkClick={}
                        // helperTextLink="here"
                    />
               </div>
            </div>
        </div>
        <div className='my-5 space-y-2'>
            <div>
                <InputField
                        primaryState={albumTrackFeatures} 
                        setPrimaryState={setAlbumTrackFeatures}
                        mandatory={true}
                        // placeholderText='$0.00'
                        title="Featured Artist(s)"
                        // helperText="e.g Amazon Music"
                        // helperTextLink="here"
                        // onHelperTextLinkClick={() => setCurrentInput(6)}
                    />
            </div>
        </div>
        <div className='px-1 mt-2'>
            <button onClick={handleAddAlbumTrack} className='bg-sky-300 text-blue-700 hover:bg-sky-200 flex items-center justify-center uppercase p-1 text-sm font-semibold tracking-tight'>Add Track</button>
            {missingAlbumTrackTitle && <div className='text-red-500 font-medium tracking-tighter text-sm'>Please fill in the track title</div>}
        </div>
        </>
        }
        <br/>
        <div className='px-2 mb-5'>
            {[...Array(createdTracksList?.data?.data?.length).keys()].map((service, i) => (
                <div key={i} className='flex items-center justify-start hover:bg-gray-50 w-1/2 px-2 py-1 cursor-pointer'>
                    <div className='w-10/12'>
                        <div className='text-base font-semibold tracking-tight text-gray-800'>{createdTracksList?.data?.data[i]?.title}</div>
                        <div className='text-xs font-medium tracking-tight text-gray-800'>{createdTracksList?.data?.data[i]?.featuring}</div>
                    </div>
                </div>
            ))}
        </div>
        <div className='px-2'>
            <div className='text-red-500 font-medium tracking-tighter text-sm'>{albumTrackCatchError}</div>
        </div>
        {/* <div className='flex items-center justify-between'>
            <div onClick={() => setCurrentInput(0)} className=' bg-gray-700 hover:bg-gray-500 text-white cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Video Info</div>
            <div onClick={() => setCurrentInput(2)} className=' border border-gray-500 text-gray-500 hover:bg-gray-300 hover:border-gray-300 cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Product</div>
        </div> */}
    </div>
  )
}

export default AlbumInfoInput