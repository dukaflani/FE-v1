import React, { useState } from 'react'
import { useRouter } from 'next/router'
import AlbumInfoInputMobile from './AlbumInfoInputMobile'
import EventInfoInputMobile from './EventInfoInputMobile'
import GenreInfoInputMobile from './GenreInfoInputMobile'
import LyricsInfoInputMobile from './LyricsInfoInputMobile'
import ProductInfoInputMobile from './ProductInfoInputMobile'
import SkizaInfoInputMobile from './SkizaInfoInputMobile'
import StreamingLinksInfoInputMobile from './StreamingLinksInfoInputMobile'
import VideoInfoInputMobile from './VideoInfoInputMobile'
import Link from 'next/link'

const UploadVideo = ({ videoTitle, setVideoTitle, currentInput, setCurrentInput }) => {
    const router = useRouter()
    const { item } = router.query
    const [songTitle, setSongTitle] = useState('')
    const [songGenre, setSongGenre] = useState(5)
    const [youtubeVideoId, setYoutubeVideoId] = useState('')
    const [videoDescription, setVideoDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [videoSmartLinks, setVideoSmartLinks] = useState(5)
    const [videoProduct, setVideoProduct] = useState(9)
    const [videoLyrics, setVideoLyrics] = useState(15)
    const [videoSkizaTune, setVideoSkizaTune] = useState(17)
    const [videoAlbum, setVideoAlbum] = useState(15)
    const activeStyles = 'cursor-pointer bg-gray-200 py-2 border-r-2 border-r-gray-800 w-full flex items-center justify-center'
    const regularStyles = 'hover:bg-gray-100 cursor-pointer py-2 border-r-2 border-r-gray-400 w-full flex items-center justify-center'

  return (
    <div className='flex md:space-x-4 landscape:space-x-4 px-2 md:px-0 landscape:px-0'>
        <div className='hidden md:w-3/12 md:flex landscape:w-3/12 landscape:flex flex-col items-center justify-start uppercase text-sm font-medium tracking-tighter'>
            <Link
                href={{
                    pathname: `/dashboard/upload/`,
                    query: { item: "video" },
                }}
                className={item == "video" ? activeStyles : regularStyles} >Video Info</Link>
            <Link
                href={{
                    pathname: `/dashboard/upload/`,
                    query: { item: "smart-links" },
                }}
                className={item == "smart-links" ? activeStyles : regularStyles} >Smart Links</Link>
            <Link
                href={{
                    pathname: `/dashboard/upload/`,
                    query: { item: "product" },
                }}
                className={item == "product" ? activeStyles : regularStyles} >Product</Link>
            <Link
                href={{
                    pathname: `/dashboard/upload/`,
                    query: { item: "lyrics" },
                }}
                className={item == "lyrics" ? activeStyles : regularStyles} >Lyrics</Link>
            <Link
                href={{
                    pathname: `/dashboard/upload/`,
                    query: { item: "skiza-tunes" },
                }}
                className={item == "skiza-tunes" ? activeStyles : regularStyles} >Skiza</Link>
            <Link
                href={{
                    pathname: `/dashboard/upload/`,
                    query: { item: "music-collection" },
                }}
                className={item == "music-collection" ? activeStyles : regularStyles} >Album</Link>
            <Link
                href={{
                    pathname: `/dashboard/upload/`,
                    query: { item: "event" },
                }}
                 className={item == "event" ? activeStyles : regularStyles} >Event</Link>
            <Link
                href={{
                    pathname: `/dashboard/upload/`,
                    query: { item: "genre" },
                }}
                 className={item == "genre" ? activeStyles : regularStyles} >Genre</Link>
        </div>
        <div className='w-full md:w-9/12 landscape:w-9/12'>
            {
                {
                    "video" : <VideoInfoInputMobile 
                            videoTitle={videoTitle} 
                            setVideoTitle={setVideoTitle} 
                            currentInput={currentInput} 
                            setCurrentInput={setCurrentInput}
                            songTitle={songTitle} 
                            setSongTitle={setSongTitle}
                            songGenre={songGenre} 
                            setSongGenre={setSongGenre}
                            youtubeVideoId={youtubeVideoId}
                            setYoutubeVideoId={setYoutubeVideoId}
                            videoDescription={videoDescription}
                            setVideoDescription={setVideoDescription}
                            thumbnail={thumbnail}
                            setThumbnail={setThumbnail}
                            videoSmartLinks={videoSmartLinks}
                            setVideoSmartLinks={setVideoSmartLinks}
                            videoProduct={videoProduct}
                            setVideoProduct={setVideoProduct}
                            videoLyrics={videoLyrics}
                            setVideoLyrics={setVideoLyrics}
                            videoSkizaTune={videoSkizaTune}
                            setVideoSkizaTune={setVideoSkizaTune}
                            videoAlbum={videoAlbum}
                            setVideoAlbum={setVideoAlbum}
                        />,
                    "smart-links" : <StreamingLinksInfoInputMobile currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "product" : <ProductInfoInputMobile currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "lyrics" : <LyricsInfoInputMobile currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "skiza-tunes" : <SkizaInfoInputMobile currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "music-collection" : <AlbumInfoInputMobile currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "event" : <EventInfoInputMobile currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "genre" : <GenreInfoInputMobile currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                }[item]
            }
        </div>
    </div>
  )
}

export default UploadVideo