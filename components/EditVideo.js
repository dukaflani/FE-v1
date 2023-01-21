import { useEffect, useState } from 'react'
import FormData from 'form-data'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import Combobox from './reuseable-components/Combobox'
import InputField from './reuseable-components/InputField'
import TextAreaField from './reuseable-components/TextAreaField'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'
import { useFetchAccessTokenQuery, useFetchAllGenresQuery, 
    useFetchUserAlbumsQuery, useFetchUserLinkHoldersQuery, useFetchUserLyricssQuery, 
    useFetchUserProductsQuery, useFetchUserSkizaTunesQuery, useFetchVideoToEditQuery } from '../redux/features/videos/videosApiSlice'
import { useSelector } from 'react-redux'

const EditVideo = () => {
    const router = useRouter()
    const linkToUploadPageGenre = () => {
        router.push("/dashboard/upload?item=genre")
    }
    const linkToUploadPageProduct = () => {
        router.push("/dashboard/upload?item=product")
    }
    const linkToUploadPageSmartLinks = () => {
        router.push("/dashboard/upload?item=smart-links")
    }
    const linkToUploadPageLyrics = () => {
        router.push("/dashboard/upload?item=lyrics")
    }
    const linkToUploadPageSkizaTunes = () => {
        router.push("/dashboard/upload?item=skiza-tunes")
    }
    const linkToUploadPageAlbum = () => {
        router.push("/dashboard/upload?item=music-collection")
    }

    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id

    const { videoid } = router.query

    const currentVideoQueryParams = {
        video_id: videoid,
    }

    const queryParams = {
        user: currentUser,
      }

    const { data: currentVideoToEdit} = useFetchVideoToEditQuery(currentVideoQueryParams)
    const { data: userStreamingLinks } = useFetchUserLinkHoldersQuery(queryParams)
    const { data: userProducts } = useFetchUserProductsQuery(queryParams)
    const { data: userLyrics } = useFetchUserLyricssQuery(queryParams)
    const { data: userSkizaTunes } = useFetchUserSkizaTunesQuery(queryParams)
    const { data: userAlbums } = useFetchUserAlbumsQuery(queryParams)

    
    const [currentVideoId, setCurrentVideoId] = useState('')
    const [songTitle, setSongTitle] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [songGenre, setSongGenre] = useState('')
    const [youtubeVideoId, setYoutubeVideoId] = useState('')
    const [videoDescription, setVideoDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [videoSmartLinks, setVideoSmartLinks] = useState('')
    const [videoProduct, setVideoProduct] = useState('')
    const [videoLyrics, setVideoLyrics] = useState('')
    const [videoSkizaTune, setVideoSkizaTune] = useState('')
    const [videoAlbum, setVideoAlbum] = useState('')
    const [updatedVideo, setupdatedVideo] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [videoUserId, setVideoUserId] = useState('') 
    
    const [genrePlaceholder, setGenrePlaceholder] = useState('')
    const [linksPlaceholder, setLinksPlaceholder] = useState('')
    const [productPlaceholder, setProductPlaceholder] = useState('')
    const [lyricsPlaceholder, setLyricsPlaceholder] = useState('')
    const [skizaPlaceholder, setSkizaPlaceholder] = useState('')
    const [albumPlaceholder, setAlbumPlaceholder] = useState('')



    const [loading, setLoading] = useState(false)
    const { data: accessToken } = useFetchAccessTokenQuery()
    const { data: allGenres } = useFetchAllGenresQuery()
    const titleToSlugify = !videoTitle ? '' : videoTitle 
    const videoSlug = slugify(titleToSlugify, {lower: true})


    useEffect(() => {
        setCurrentVideoId(currentVideoToEdit?.data?.id)
        setLinksPlaceholder(currentVideoToEdit?.data?.links_title)
        setSkizaPlaceholder(currentVideoToEdit?.data?.skiza_title)
        setAlbumPlaceholder(currentVideoToEdit?.data?.album_title)
        setProductPlaceholder(currentVideoToEdit?.data?.product_title)
        setLyricsPlaceholder(currentVideoToEdit?.data?.lyrics_title)
        setSongTitle(currentVideoToEdit?.data?.song_title)
        setVideoTitle(currentVideoToEdit?.data?.title)
        setGenrePlaceholder(currentVideoToEdit?.data?.genre_title)
        setVideoDescription(currentVideoToEdit?.data?.description)
        setYoutubeVideoId(currentVideoToEdit?.data?.youtube_id)
        setVideoUserId(currentVideoToEdit?.data?.user)

        setSongGenre(!currentVideoToEdit?.data?.genre ? ' ' : currentVideoToEdit?.data?.genre)
        setVideoSmartLinks(!currentVideoToEdit?.data?.links ? ' ' : currentVideoToEdit?.data?.links)
        setVideoProduct(!currentVideoToEdit?.data?.product ? ' ' : currentVideoToEdit?.data?.product)
        setVideoLyrics(!currentVideoToEdit?.data?.lyrics ? ' ' : currentVideoToEdit?.data?.lyrics)
        setVideoSkizaTune(!currentVideoToEdit?.data?.skiza ? ' ' : currentVideoToEdit?.data?.skiza)
        setVideoAlbum(!currentVideoToEdit?.data?.album ? ' ' : currentVideoToEdit?.data?.album)
    }, [currentVideoToEdit?.data])



    const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

    const videoUpdateInfo = new FormData();
    videoUpdateInfo.append("title", videoTitle);
    videoUpdateInfo.append("song_title", songTitle);
    videoUpdateInfo.append("genre", songGenre);
    videoUpdateInfo.append("youtube_id", youtubeVideoId);
    videoUpdateInfo.append("description", videoDescription);
    videoUpdateInfo.append("thumbnail", thumbnail);
    videoUpdateInfo.append("links", videoSmartLinks);
    videoUpdateInfo.append("product", videoProduct);
    videoUpdateInfo.append("lyrics", videoLyrics);
    videoUpdateInfo.append("skiza", videoSkizaTune);
    videoUpdateInfo.append("album", videoAlbum);
    videoUpdateInfo.append("slug", videoSlug);

    const handleUpdateVideo = () => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/videos/${currentVideoId}/`,
    {
        method: 'PATCH',
        headers: myHeaders,
        body: videoUpdateInfo,
    }
    )
    .then((response) => response.json())
    .then((result) => {
        setupdatedVideo(result)
        router.push('/dashboard')
    })
    .catch((error) => {
        setErrorMessage(error)
    });
}
    



  return (
    <div>
        <h1 className='uppercase tracking-tight font-extrabold text-lg text-gray-800'>Edit Video</h1>
        <div className='p-1 flex space-x-3'>
            <div className='w-8/12'>
                <InputField 
                    primaryState={songTitle} 
                    setPrimaryState={setSongTitle}
                    // placeholderText='Song title...'
                    title="Song Title"
                    // helperText="e.g Hold My Hand"
                    // mandatory={true}
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
            <div className='w-4/12'>
                <Combobox 
                    placeholderText={genrePlaceholder}
                    setPrimaryState={setSongGenre} 
                    data={allGenres?.data}
                    // mandatory={true}
                    title="Genre"
                    helperText="Didn't find your genre? Create it"
                    helperTextLink="here"
                    onHelperTextLinkClick={linkToUploadPageGenre}
                />
            </div>
        </div>
        <div className='p-1 flex space-x-3'>
            <div className='w-8/12'>
                <InputField 
                    primaryState={videoTitle} 
                    setPrimaryState={setVideoTitle}
                    // mandatory={true}
                    // // placeholderText='Song title...'
                    title="Video Title"
                    // helperText="e.g Hold My Hand ft. Akon (Official Music Video)"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
             </div>
            <div className='w-4/12'>
                <InputField 
                    primaryState={youtubeVideoId} 
                    setPrimaryState={setYoutubeVideoId}
                    // mandatory={true}
                    // // placeholderText='Song title...'
                    title="YouTube Video ID"
                    // helperText=""
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
        </div>
        <div className='p-1'>
            <TextAreaField
                primaryState={videoDescription} 
                setPrimaryState={setVideoDescription}
                // mandatory={true}
                // placeholderText='Tell us about your video...'
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
        <div className='mt-5 grid grid-cols-2 gap-x-3 gap-y-3'>
            <div className='w-full'>
            <Combobox 
                    placeholderText={linksPlaceholder}
                    setPrimaryState={setVideoSmartLinks} 
                    data={userStreamingLinks?.data}
                    title="Smart Links"
                    helperText="Can't find your smart links? Create new ones"
                    helperTextLink="here"
                    onHelperTextLinkClick={linkToUploadPageSmartLinks}
                />
            </div>
            <div className='w-full'>
            <Combobox 
                    placeholderText={productPlaceholder}
                    setPrimaryState={setVideoProduct} 
                    data={userProducts?.data}
                    title="Product"
                    helperText="Can't find a product? Create one"
                    helperTextLink="here"
                    onHelperTextLinkClick={linkToUploadPageProduct}
                />
            </div>
            <div className='w-full'>
            <Combobox 
                    placeholderText={lyricsPlaceholder}
                    setPrimaryState={setVideoLyrics} 
                    data={userLyrics?.data}
                    title="Lyrics"
                    helperText="Can't find your lyrics? Add them"
                    helperTextLink="here"
                    onHelperTextLinkClick={linkToUploadPageLyrics}
                />
            </div>
            <div className='w-full'>
            <Combobox 
                    placeholderText={skizaPlaceholder}
                    setPrimaryState={setVideoSkizaTune} 
                    data={userSkizaTunes?.data}
                    title="Skiza Tunes"
                    helperText="Can't find your skiza tunes? Add them"
                    helperTextLink="here"
                    onHelperTextLinkClick={linkToUploadPageSkizaTunes}
                />
            </div>
            <div className='w-full'>
            <Combobox 
                    placeholderText={albumPlaceholder}
                    setPrimaryState={setVideoAlbum} 
                    data={userAlbums?.data}
                    title="Album"
                    helperText="Can't find your album? Create one"
                    helperTextLink="here"
                    onHelperTextLinkClick={linkToUploadPageAlbum}
                />
            </div>
        </div>
        <br/>
        <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
                <ApiButtonWithSpinner
                    title='Cancel'
                    bgColor="bg-red-600"
                    hoverColor="hover:bg-red-500"
                    textColor="text-white"
                    onClick={() => router.push("/dashboard")}
                />
                {videoUserId == currentUser && <ApiButtonWithSpinner
                    title='Edit'
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-400"
                    textColor="text-white"
                    loading={loading}
                    onClick={handleUpdateVideo}
                />}
               </div>
            {!true && <div className='text-red-500 font-medium tracking-tighter text-sm flex items-center justify-center'>Please fill in all the (*) mandatory fields or refresh and try again</div>}
        </div>
    </div>
  )
}

export default EditVideo