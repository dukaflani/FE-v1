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
    const linkToUploadPage = () => {
        router.push("/dashboard/upload")
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

    const { data: currentVideo, isLoading } = useFetchVideoToEditQuery(currentVideoQueryParams)
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
        setCurrentVideoId(currentVideo?.data?.id)
        setLinksPlaceholder(currentVideo?.data?.links_title)
        setSkizaPlaceholder(currentVideo?.data?.skiza_title)
        setAlbumPlaceholder(currentVideo?.data?.album_title)
        setProductPlaceholder(currentVideo?.data?.product_title)
        setLyricsPlaceholder(currentVideo?.data?.lyrics_title)
        setSongTitle(currentVideo?.data?.song_title)
        setVideoTitle(currentVideo?.data?.title)
        setGenrePlaceholder(currentVideo?.data?.genre_title)
        setVideoDescription(currentVideo?.data?.description)
        setYoutubeVideoId(currentVideo?.data?.youtube_id)
        setVideoUserId(currentVideo?.data?.user)

        setSongGenre(!currentVideo?.data?.genre ? ' ' : currentVideo?.data?.genre)
        setVideoSmartLinks(!currentVideo?.data?.links ? ' ' : currentVideo?.data?.links)
        setVideoProduct(!currentVideo?.data?.product ? ' ' : currentVideo?.data?.product)
        setVideoLyrics(!currentVideo?.data?.lyrics ? ' ' : currentVideo?.data?.lyrics)
        setVideoSkizaTune(!currentVideo?.data?.skiza ? ' ' : currentVideo?.data?.skiza)
        setVideoAlbum(!currentVideo?.data?.album ? ' ' : currentVideo?.data?.album)
    }, [currentVideo?.data])



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
        <div className='p-1 flex flex-col'>
            <div className='w-full'>
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
            <div className='w-full'>
                <Combobox 
                    placeholderText={genrePlaceholder}
                    setPrimaryState={setSongGenre} 
                    data={allGenres?.data}
                    // mandatory={true}
                    title="Genre"
                    helperText="Didn't find your genre? Create it"
                    helperTextLink="here"
                    onHelperTextLinkClick={linkToUploadPage}
                />
            </div>
        </div>
        <div className='p-1 flex flex-col'>
            <div className='w-full'>
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
            <div className='w-full'>
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
        <div className='mt-5 grid grid-cols-1 gap-y-3'>
            <div className='w-full'>
            <Combobox 
                    placeholderText={linksPlaceholder}
                    setPrimaryState={setVideoSmartLinks} 
                    data={userStreamingLinks?.data}
                    title="Smart Links"
                    helperText="Can't find your smart links? Create new ones"
                    helperTextLink="here"
                    onHelperTextLinkClick={linkToUploadPage}
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
                    onHelperTextLinkClick={linkToUploadPage}
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
                    onHelperTextLinkClick={linkToUploadPage}
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
                    onHelperTextLinkClick={linkToUploadPage}
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
                    onHelperTextLinkClick={linkToUploadPage}
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