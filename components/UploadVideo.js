import React, { useState } from 'react'
import { useRouter } from 'next/router'
import AlbumInfoInput from './AlbumInfoInput'
import EventInfoInput from './EventInfoInput'
import GenreInfoInput from './GenreInfoInput'
import LyricsInfoInput from './LyricsInfoInput'
import ProductInfoInput from './ProductInfoInput'
import SkizaInfoInput from './SkizaInfoInput'
import StreamingLinksInfoInput from './StreamingLinksInfoInput'
import VideoInfoInput from './VideoInfoInput'
import Link from 'next/link'

const UploadVideo = ({ videoTitle, setVideoTitle, currentInput, setCurrentInput }) => {
    const router = useRouter()
    const { item } = router.query
    const [songTitle, setSongTitle] = useState('')
    const [songGenre, setSongGenre] = useState(1)
    const [youtubeVideoId, setYoutubeVideoId] = useState('')
    const [videoDescription, setVideoDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [videoSmartLinks, setVideoSmartLinks] = useState(1)
    const [videoProduct, setVideoProduct] = useState(1)
    const [videoLyrics, setVideoLyrics] = useState(1)
    const [videoSkizaTune, setVideoSkizaTune] = useState(1)
    const [videoAlbum, setVideoAlbum] = useState(1)
    const activeStyles = 'cursor-pointer bg-gray-200 py-2 border-r-2 border-r-gray-800 w-full flex items-center justify-center'
    const regularStyles = 'hover:bg-gray-100 cursor-pointer py-2 border-r-2 border-r-gray-400 w-full flex items-center justify-center'

  return (
    <div className='flex space-x-4'>
        <div className='w-3/12 flex flex-col items-center justify-start uppercase text-sm font-medium tracking-tighter'>
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
        <div className='w-9/12'>
            {
                {
                    "video" : <VideoInfoInput 
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
                    "smart-links" : <StreamingLinksInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "product" : <ProductInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "lyrics" : <LyricsInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "skiza-tunes" : <SkizaInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "music-collection" : <AlbumInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "event" : <EventInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    "genre" : <GenreInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                }[item]
            }
        </div>
    </div>
  )
}

export default UploadVideo