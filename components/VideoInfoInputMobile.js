import FormData from 'form-data'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import { useFetchAccessTokenQuery, useFetchAllGenresQuery, useFetchUserAlbumsQuery, useFetchUserLinkHoldersQuery, useFetchUserLyricssQuery, 
    useFetchUserProductsQuery, useFetchUserSkizaTunesQuery } from '../redux/features/videos/videosApiSlice'
import Combobox from './reuseable-components/Combobox'
import InputField from './reuseable-components/InputField'
import TextAreaField from './reuseable-components/TextAreaField'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'

const VideoInfoInput = ({ currentInput, setCurrentInput, videoTitle, setVideoTitle, songTitle, setSongTitle,
    songGenre, setSongGenre, youtubeVideoId, setYoutubeVideoId, videoDescription, setVideoDescription, thumbnail, setThumbnail,
    videoSmartLinks, setVideoSmartLinks, videoProduct, setVideoProduct, videoLyrics, setVideoLyrics, videoSkizaTune, setVideoSkizaTune,
    videoAlbum, setVideoAlbum
 }) => {
    const router = useRouter()
   
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id

    const { userProfile } = useSelector((state) => state.auth)
    const userProfileId = userProfile?.info ? userProfile?.info[0]?.id : 0


    const videoSlug = slugify(songTitle, {lower: true})

    const queryParams = {
        user: currentUser,
      }

    const { data: userStreamingLinks } = useFetchUserLinkHoldersQuery(queryParams)
    const { data: userProducts } = useFetchUserProductsQuery(queryParams)
    const { data: userLyrics } = useFetchUserLyricssQuery(queryParams)
    const { data: userSkizaTunes } = useFetchUserSkizaTunesQuery(queryParams)
    const { data: userAlbums } = useFetchUserAlbumsQuery(queryParams)
    const { data: allGenres } = useFetchAllGenresQuery()
    const { data: accessToken } = useFetchAccessTokenQuery()
    const [createdVideo, setCreatedVideo] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [emptyFields, setEmptyFields] = useState(false)
    const [uploadingVideo, setUploadingVideo] = useState(false)
    const [nanoId, setNanoId] = useState('')
    const [renderComponent, setRenderComponent] = useState(null)

    useEffect(() => {
        setNanoId(nanoid(16))
    }, [])
    


    const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

    const videoInfo = new FormData();
    videoInfo.append("title", videoTitle);
    videoInfo.append("song_title", songTitle);
    videoInfo.append("youtube_id", youtubeVideoId.trim());
    videoInfo.append("description", videoDescription);
    videoInfo.append("slug", videoSlug);
    videoInfo.append("thumbnail", thumbnail);
    videoInfo.append("links", videoSmartLinks);
    videoInfo.append("product", videoProduct);
    videoInfo.append("album", videoAlbum);
    videoInfo.append("lyrics", videoLyrics);
    videoInfo.append("skiza", videoSkizaTune);
    videoInfo.append("genre", songGenre);
    videoInfo.append("customuserprofile", userProfileId);
    videoInfo.append("url_id", nanoId);

    const handleVideoUpload = () => {
        setUploadingVideo(true)
        if (videoTitle && songTitle && youtubeVideoId && videoDescription && thumbnail && songGenre && userProfileId != 0) {
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/videos/`,
            {
                method: 'POST',
                headers: myHeaders,
                body: videoInfo,
            }
            )
            .then((response) => response.json())
            .then((result) => {
                setCreatedVideo(result)
                window.location.reload();
            })
            .catch((error) => {
                setUploadingVideo(false)
                setErrorMessage(error)
            });
            
        } else {
            setEmptyFields(true)
            setUploadingVideo(false)
            setTimeout(() => {
                setEmptyFields(false)
            }, 5000);
        }
    }



  return (
    <div className='p-2 bg-white shadow-md border-b mb-10'>
        <div className='p-1 flex flex-col'>
            <div className='w-full'>
                <InputField 
                    primaryState={songTitle} 
                    setPrimaryState={setSongTitle}
                    // placeholderText='Song title...'
                    title="Song Title"
                    helperText="e.g Hold My Hand"
                    mandatory={true}
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
            <div className='w-full'>
                <Combobox 
                    placeholderText='Search...'
                    setPrimaryState={setSongGenre} 
                    data={allGenres?.data}
                    mandatory={true}
                    title="Genre"
                    helperText="Didn't find your genre? Create it"
                    helperTextLink="here"
                    onHelperTextLinkClick={() => router.push("/dashboard/upload?item=genre")}
                />
            </div>
        </div>
        <div className='p-1 flex flex-col'>
            <div className='w-full'>
                <InputField 
                    primaryState={videoTitle} 
                    setPrimaryState={setVideoTitle}
                    mandatory={true}
                    // placeholderText='Song title...'
                    title="Video Title"
                    helperText="e.g Hold My Hand ft. Akon (Official Music Video)"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
             </div>
            <div className='w-full'>
                <InputField 
                    primaryState={youtubeVideoId} 
                    setPrimaryState={setYoutubeVideoId}
                    mandatory={true}
                    // placeholderText='Song title...'
                    title="YouTube Video ID"
                    helperText="Important: Remove any space infront of the ID after copy/paste"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
        </div>
        <div className='p-1'>
            <TextAreaField
                primaryState={videoDescription} 
                setPrimaryState={setVideoDescription}
                mandatory={true}
                placeholderText='Tell us about your video...'
                title="Video Description"
                // helperText="helper"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1'>
            <input onChange={(e) => setThumbnail(e.target.files[0])} type="file"  className='w-full border-gray-300 focus:outline-none' />
            <div className='py-1 text-xs text-gray-400'>Upload video thumbnail max size 300KB</div>
        </div>
        <div className='mt-5 grid grid-cols-1 gap-y-3'>
            <div className='w-full'>
            <Combobox 
                    placeholderText='Search...'
                    setPrimaryState={setVideoSmartLinks} 
                    data={userStreamingLinks?.data}
                    title="Smart Links"
                    helperText="Can't find your smart links? Create new ones"
                    helperTextLink="here"
                    // onHelperTextLinkClick={() => router.push("/dashboard/upload?item=smart-links")}
                    onHelperTextLinkClick={() => router.push({pathname: '/dashboard/upload', query: {item: 'smart-links'}})}
                />
            </div>
            <div className='w-full'>
            <Combobox 
                    placeholderText='Search...'
                    setPrimaryState={setVideoProduct} 
                    data={userProducts?.data}
                    title="Product"
                    helperText="Can't find a product? Create one"
                    helperTextLink="here"
                    // onHelperTextLinkClick={() => router.push("/dashboard/upload?item=product")}
                    onHelperTextLinkClick={() => router.push({pathname: '/dashboard/upload', query: {item: 'product'}})}
                />
            </div>
            <div className='w-full'>
            <Combobox 
                    placeholderText='Search...'
                    setPrimaryState={setVideoLyrics} 
                    data={userLyrics?.data}
                    title="Lyrics"
                    helperText="Can't find your lyrics? Add them"
                    helperTextLink="here"
                    // onHelperTextLinkClick={() => router.push("/dashboard/upload?item=lyrics")}
                    onHelperTextLinkClick={() => router.push({pathname: '/dashboard/upload', query: {item: 'lyrics'}})}
                />
            </div>
            <div className='w-full'>
            <Combobox 
                    placeholderText='Search...'
                    setPrimaryState={setVideoSkizaTune} 
                    data={userSkizaTunes?.data}
                    title="Skiza Tunes"
                    helperText="Can't find your skiza tunes? Add them"
                    helperTextLink="here"
                    // onHelperTextLinkClick={() => router.push("/dashboard/upload?item=skiza-tunes")}
                    onHelperTextLinkClick={() => router.push({pathname: '/dashboard/upload', query: {item: 'skiza-tunes'}})}
                />
            </div>
            <div className='w-full'>
            <Combobox 
                    placeholderText='Search...'
                    setPrimaryState={setVideoAlbum} 
                    data={userAlbums?.data}
                    title="Album"
                    helperText="Can't find your album? Create one"
                    helperTextLink="here"
                    // onHelperTextLinkClick={() => router.push("/dashboard/upload?item=music-collection")}
                    onHelperTextLinkClick={() => router.push({pathname: '/dashboard/upload', query: {item: 'music-collection'}})}
                />
            </div>
        </div>
        <br/>
        <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
                <ApiButtonWithSpinner
                    title="Cancel"
                    bgColor="bg-red-600"
                    hoverColor="hover:bg-red-400"
                    textColor="text-white"
                    onClick={() => router.push({pathname: '/dashboard'})}
                />
                <ApiButtonWithSpinner
                    loading={uploadingVideo}
                    title="Upload"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-400"
                    textColor="text-white"
                    onClick={handleVideoUpload}
                />
            </div>
            {emptyFields && <div className='text-red-500 font-medium tracking-tighter text-sm flex items-center justify-center'>Please fill in all the (*) mandatory fields or refresh and try again</div>}
        </div>
    </div>
  )
}

export default VideoInfoInput